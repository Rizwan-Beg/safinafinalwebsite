"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { getCurrentCustomer } from "../../lib/medusa-auth";

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

const hdrs = {
  "Content-Type": "application/json",
  "x-publishable-api-key": PUB_KEY,
};

export default function Chatbot() {
  const [isOpen, setIsOpen]           = useState(false);
  const [activeTab, setActiveTab]     = useState("bot");

  // Auth
  const [customer, setCustomer]       = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Messages
  const [botMessages, setBotMessages]     = useState([]);
  const [agentMessages, setAgentMessages] = useState([]);

  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [handoffDone, setHandoffDone] = useState(false);
  const [agentStatus, setAgentStatus] = useState("idle");
  const [unreadAgent, setUnreadAgent] = useState(0);

  const [sessionId] = useState(
    () => "user-" + Math.random().toString(36).substring(7)
  );

  const botEndRef   = useRef(null);
  const agentEndRef = useRef(null);
  const inputRef    = useRef(null);
  const botScrollRef   = useRef(null);
  const agentScrollRef = useRef(null);

  // ─── Fetch Customer ─────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen && authLoading) {
      getCurrentCustomer()
        .then((c) => { setCustomer(c); setAuthLoading(false); })
        .catch(() => setAuthLoading(false));
    }
  }, [isOpen, authLoading]);

  // ─── Auto-scroll helper ─────────────────────────────────────────────
  const scrollToBottom = useCallback((tab) => {
    requestAnimationFrame(() => {
      if (tab === "bot" && botScrollRef.current) {
        botScrollRef.current.scrollTop = botScrollRef.current.scrollHeight;
      } else if (tab === "agent" && agentScrollRef.current) {
        agentScrollRef.current.scrollTop = agentScrollRef.current.scrollHeight;
      }
    });
  }, []);

  useEffect(() => { if (isOpen) scrollToBottom(activeTab); }, [botMessages, agentMessages, activeTab, isOpen, scrollToBottom]);
  useEffect(() => { if (isOpen && customer) setTimeout(() => inputRef.current?.focus(), 100); }, [activeTab, isOpen, customer]);

  // ─── Polling ────────────────────────────────────────────────────────
  const syncMessages = useCallback(async () => {
    if (!isOpen || !customer) return;
    try {
      const res = await fetch(
        `${MEDUSA_URL}/store/chat?session_id=${sessionId}`,
        { headers: { "x-publishable-api-key": PUB_KEY } }
      );
      if (!res.ok) return;
      const { messages } = await res.json();
      if (!messages?.length) return;

      const dbBotReplies = messages.filter(m => m.sender_type === "bot").map(m => ({ role: "assistant", content: m.content }));
      const dbAgentReplies = messages.filter(m => m.sender_type === "human_agent").map(m => ({ role: "assistant", content: m.content, isAgent: true }));

      setBotMessages(prev => {
        const localBotReplies = prev.filter(m => m.role === "assistant");
        if (dbBotReplies.length > localBotReplies.length) {
          const newReplies = dbBotReplies.slice(localBotReplies.length);
          return [...prev, ...newReplies];
        }
        return prev;
      });

      setAgentMessages(prev => {
        const localAgentReplies = prev.filter(m => m.role === "assistant" && m.isAgent);
        if (dbAgentReplies.length > localAgentReplies.length) {
          if (activeTab === "bot") setUnreadAgent(u => u + (dbAgentReplies.length - localAgentReplies.length));
          if (agentStatus !== "connected") setAgentStatus("connected");
          const newReplies = dbAgentReplies.slice(localAgentReplies.length);
          return [...prev, ...newReplies];
        }
        return prev;
      });
    } catch (_) {}
  }, [isOpen, sessionId, activeTab, agentStatus, customer]);

  useEffect(() => {
    if (!isOpen || !customer) return;
    const id = setInterval(syncMessages, 2500);
    return () => clearInterval(id);
  }, [isOpen, syncMessages, customer]);

  // ─── Handoff ────────────────────────────────────────────────────────
  const triggerHandoff = useCallback(async () => {
    if (handoffDone || !customer) return;
    setHandoffDone(true);
    setAgentStatus("connecting");
    setAgentMessages(prev => [...prev, { role: "system", content: "Connecting you to a live agent..." }]);
    try {
      await fetch(`${MEDUSA_URL}/store/chat/handoff`, {
        method: "POST",
        headers: hdrs,
        body: JSON.stringify({
          session_id: sessionId,
          customer_id: customer.id,
          customer_name: `${customer.first_name || ""} ${customer.last_name || ""}`.trim()
        }),
      });
      setAgentMessages(prev => [
        ...prev.filter(m => m.role !== "system"),
        { role: "system", content: "Connected! A support agent will respond shortly." },
      ]);
      setAgentStatus("connected");
    } catch {
      setAgentStatus("idle");
      setHandoffDone(false);
      setAgentMessages(prev => prev.filter(m => m.role !== "system"));
    }
  }, [handoffDone, sessionId, customer]);

  // ─── Tab Switch ─────────────────────────────────────────────────────
  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === "agent") {
      setUnreadAgent(0);
      if (!handoffDone && customer) triggerHandoff();
    }
    if (customer) setTimeout(() => inputRef.current?.focus(), 50);
  };

  // ─── Send Message ───────────────────────────────────────────────────
  const sendMessage = async () => {
    if (!input.trim() || loading || !customer) return;
    const text = input.trim();
    setInput("");
    setLoading(true);

    const payload = {
      session_id: sessionId,
      message: text,
      history: activeTab === "bot" ? botMessages : [],
      customer_id: customer.id,
      customer_name: `${customer.first_name || ""} ${customer.last_name || ""}`.trim(),
    };

    if (activeTab === "bot") {
      setBotMessages(prev => [...prev, { role: "user", content: text }]);
      try {
        const res = await fetch(`${MEDUSA_URL}/store/chat`, {
          method: "POST",
          headers: hdrs,
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("API request failed");
        const data = await res.json();

        if (data.status !== "agent_active") {
          setBotMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
        }
      } catch (err) {
        setBotMessages(prev => [...prev, { role: "system", content: "Error connecting to AI Assistant." }]);
      }
    } else {
      setAgentMessages(prev => [...prev, { role: "user", content: text }]);
      try {
        await fetch(`${MEDUSA_URL}/store/chat`, {
          method: "POST",
          headers: hdrs,
          body: JSON.stringify({ ...payload, is_agent: true }),
        });
      } catch (err) {
        setAgentMessages(prev => [...prev, { role: "system", content: "Error sending message." }]);
      }
    }

    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isBot = activeTab === "bot";

  // ─── Render ─────────────────────────────────────────────────────────
  return (
    <>
      {/* Floating button */}
      <div style={S.fabWrap}>
        <button onClick={() => setIsOpen(!isOpen)} style={{...S.fab, transform: isOpen ? "scale(0.9)" : "scale(1)"}}>
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          )}
        </button>
        {!isOpen && unreadAgent > 0 && <div style={S.badge}>{unreadAgent}</div>}
      </div>

      {isOpen && (
        <div style={S.window}>
          {/* Header */}
          <div style={S.header}>
            <div style={S.headerTop}>
              <div style={S.headerTitle}>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Safina Carpets Assistant</h3>
                <div style={S.statusLine}>
                  <div style={S.statusDot}/>
                  <span>{isBot ? "AI Assistant" : agentStatus === "connected" ? "Live Agent" : "Connecting..."}</span>
                </div>
              </div>
            </div>
            <div style={S.tabRow}>
              <button onClick={() => switchTab("bot")} style={{ ...S.tabBtn, ...(isBot ? S.activeTab : S.inactiveTab) }}>AI Bot</button>
              <button onClick={() => switchTab("agent")} style={{ ...S.tabBtn, ...(!isBot ? S.activeTab : S.inactiveTab), position: "relative" }}>
                Agent Support
                {unreadAgent > 0 && <span style={S.tabBadge}>{unreadAgent}</span>}
              </button>
            </div>
          </div>

          {/* Body */}
          {!authLoading && !customer ? (
            <div style={S.loginPrompt}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>🔒</div>
              <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>Members Only</h4>
              <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
                Please log in to your account to chat with our luxury concierge and support team.
              </p>
              <a href="/login" style={{...S.sendBtn, display: "inline-block", textDecoration: "none", textAlign: "center"}}>Log In to Chat</a>
            </div>
          ) : (
            <>
              {/* Two separate scroll panels — only one visible at a time */}
              <div style={S.panelsWrap}>
                {/* Bot panel */}
                <div ref={botScrollRef} data-lenis-prevent style={{ ...S.panel, display: isBot ? "flex" : "none" }} onWheel={(e) => e.stopPropagation()}>
                  {botMessages.length === 0 ? (
                    <div style={S.welcome}>
                      <div style={S.welcomeIcon}>✨</div>
                      <div style={S.welcomeText}>
                        Hi {customer?.first_name || ""}! I&apos;m the Safina Carpets AI Assistant.<br/>How can I help you today?
                      </div>
                    </div>
                  ) : (
                    botMessages.map((msg, i) => <Bubble key={`b-${i}`} msg={msg} />)
                  )}
                  {isBot && loading && <Typing />}
                  <div ref={botEndRef} />
                </div>

                {/* Agent panel */}
                <div ref={agentScrollRef} data-lenis-prevent style={{ ...S.panel, display: !isBot ? "flex" : "none" }} onWheel={(e) => e.stopPropagation()}>
                  {agentMessages.length === 0 ? (
                    <div style={S.welcome}>
                      <div style={S.welcomeIcon}>👨‍💼</div>
                      <div style={S.welcomeText}>
                        Need human assistance?<br/>A support agent will be with you shortly.
                      </div>
                    </div>
                  ) : (
                    agentMessages.map((msg, i) => <Bubble key={`a-${i}`} msg={msg} />)
                  )}
                  {!isBot && loading && <Typing />}
                  <div ref={agentEndRef} />
                </div>
              </div>

              {/* Input */}
              <div style={S.inputBox}>
                <input
                  ref={inputRef}
                  style={S.input}
                  placeholder={isBot ? "Ask the AI Assistant..." : "Message agent..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  disabled={loading}
                />
                <button
                  style={{...S.sendBtn, opacity: loading || !input.trim() ? 0.6 : 1}}
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
        /* Force scrollbar to work inside chatbot panels */
        .safina-chat-scroll {
          overflow-y: auto !important;
          scrollbar-width: thin !important;
          -ms-overflow-style: auto !important;
        }
        .safina-chat-scroll::-webkit-scrollbar {
          display: block !important;
          width: 4px !important;
        }
        .safina-chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.15);
          border-radius: 4px;
        }
        .safina-chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function Bubble({ msg }) {
  if (msg.role === "system") {
    return <div style={{ textAlign: "center", fontSize: "12px", color: "#888", margin: "8px 0" }}>{msg.content}</div>;
  }
  const isUser = msg.role === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: "12px" }}>
      <div style={{
        padding: "12px 16px",
        maxWidth: "80%",
        whiteSpace: "pre-wrap",
        fontSize: "14px",
        lineHeight: "1.4",
        wordWrap: "break-word",
        borderRadius: "18px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        backgroundColor: isUser ? "#860A0C" : "white",
        color: isUser ? "white" : "#333",
        border: isUser ? "none" : "1px solid #e0e0e0",
        borderBottomRightRadius: isUser ? "4px" : "18px",
        borderBottomLeftRadius: isUser ? "18px" : "4px",
      }}>
        {msg.isAgent && <div style={{fontSize:"10px", color:"#6a1b9a", marginBottom:"4px", fontWeight:"bold"}}>LIVE AGENT</div>}
        {msg.content}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "12px 16px" }}>
      <div style={{ display: "flex", gap: "4px" }}>
        <div style={{ ...dotStyle, animationDelay: "0ms" }} />
        <div style={{ ...dotStyle, animationDelay: "150ms" }} />
        <div style={{ ...dotStyle, animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

const dotStyle = {
  width: "6px", height: "6px", backgroundColor: "#860A0C", borderRadius: "50%",
  animation: "bounce 1.4s infinite ease-in-out both",
};

/* ─── Styles ─────────────────────────────────────────────────────────── */
const S = {
  fabWrap: {
    position: "fixed", bottom: "24px", right: "24px", zIndex: 1000,
  },
  fab: {
    width: "60px", height: "60px", borderRadius: "50%",
    backgroundColor: "#860A0C", color: "white", border: "none", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 6px 20px rgba(134, 10, 12, 0.4)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  badge: {
    position: "absolute", top: "-4px", right: "-4px",
    backgroundColor: "#FF3B30", color: "white", borderRadius: "50%",
    padding: "4px 8px", fontSize: "12px", fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  window: {
    position: "fixed", bottom: "90px", right: "20px",
    width: "380px", height: "600px",
    backgroundColor: "white", borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.15)", border: "1px solid #eaeaea",
    display: "flex", flexDirection: "column", overflow: "hidden",
    zIndex: 1000,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  header: {
    background: "linear-gradient(135deg, #860A0C 0%, #6a1b9a 100%)",
    color: "white", padding: "0", flexShrink: 0,
  },
  headerTop: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "20px 20px 10px 20px",
  },
  headerTitle: { display: "flex", flexDirection: "column" },
  statusLine: {
    display: "flex", alignItems: "center", gap: "6px",
    fontSize: "12px", marginTop: "4px", opacity: 0.9,
  },
  statusDot: {
    width: "8px", height: "8px", borderRadius: "50%",
    backgroundColor: "#4caf50", animation: "pulse 2s infinite",
  },
  tabRow: {
    display: "flex", borderTop: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  tabBtn: {
    flex: 1, padding: "12px 0", border: "none", background: "transparent",
    color: "white", fontSize: "13px", fontWeight: "500", cursor: "pointer",
    transition: "background 0.2s",
  },
  activeTab: { backgroundColor: "rgba(255,255,255,0.15)", borderBottom: "3px solid white" },
  inactiveTab: { opacity: 0.7, borderBottom: "3px solid transparent" },
  tabBadge: {
    position: "absolute", top: "8px", right: "12px",
    backgroundColor: "#FF3B30", color: "white", borderRadius: "10px",
    padding: "2px 6px", fontSize: "10px", fontWeight: "bold",
  },

  /* ── KEY FIX: panelsWrap fills remaining space, panels scroll independently ── */
  panelsWrap: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#F3F5F6",
  },
  panel: {
    position: "absolute",
    inset: 0,              /* fill entire panelsWrap */
    overflowY: "auto",
    overscrollBehavior: "contain",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    /* Re-enable scrollbar that globals.css kills */
    scrollbarWidth: "thin",
    msOverflowStyle: "auto",
    WebkitOverflowScrolling: "touch",
  },

  welcome: {
    display: "flex", flexDirection: "column", alignItems: "center",
    textAlign: "center", padding: "20px", color: "#666", marginTop: "20px",
  },
  welcomeIcon: { fontSize: "32px", marginBottom: "12px" },
  welcomeText: { fontSize: "14px", lineHeight: "1.4" },

  loginPrompt: {
    flex: 1, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "30px", textAlign: "center", backgroundColor: "#F3F5F6",
  },

  inputBox: {
    display: "flex", borderTop: "1px solid #e0e0e0",
    padding: "12px", backgroundColor: "white", flexShrink: 0,
  },
  input: {
    flex: 1, padding: "12px 16px", border: "1px solid #e0e0e0",
    borderRadius: "20px", outline: "none", fontSize: "14px",
    backgroundColor: "#E8EBF0", transition: "border 0.2s",
  },
  sendBtn: {
    background: "linear-gradient(135deg, #860A0C 0%, #6a1b9a 100%)",
    color: "white", border: "none", padding: "12px 20px",
    borderRadius: "20px", marginLeft: "8px", fontSize: "14px",
    fontWeight: "500", cursor: "pointer", transition: "all 0.2s ease",
  },
};
