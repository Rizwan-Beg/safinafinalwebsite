import { useState, useEffect } from "react"
import { Container, Text, Button, Input } from "@medusajs/ui"
import { defineRouteConfig } from "@medusajs/admin-sdk"

const ChatbotAdminPage = () => {
  const [conversations, setConversations] = useState<any[]>([])
  const [activeChat, setActiveChat] = useState<any>(null)
  const [reply, setReply] = useState("")

  const fetchConversations = async () => {
    try {
      // In Medusa Admin, requests to /admin are automatically authenticated
      const res = await fetch("/admin/chat")
      if (res.ok) {
        const data = await res.json()
        setConversations(data.conversations || [])
        
        // Update active chat if it exists
        if (activeChat) {
          const updated = data.conversations.find((c: any) => c.id === activeChat.id)
          if (updated) setActiveChat(updated)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchConversations()
    // Poll every 5 seconds for new messages
    const interval = setInterval(fetchConversations, 5000)
    return () => clearInterval(interval)
  }, [activeChat?.id])

  const handleReply = async () => {
    if (!reply.trim() || !activeChat) return

    try {
      const res = await fetch(`/admin/chat/${activeChat.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: reply })
      })

      if (res.ok) {
        setReply("")
        fetchConversations()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Container className="flex h-[80vh] flex-col overflow-hidden p-0">
      <div className="flex h-full">
        {/* Left Sidebar - Chat List */}
        <div className="w-1/3 border-r border-ui-border-base bg-ui-bg-subtle overflow-y-auto">
          <div className="p-4 border-b border-ui-border-base">
            <h2 className="text-xl font-bold mb-1">Customer Chats</h2>
            <Text className="text-ui-fg-subtle text-sm">Manage live conversations</Text>
          </div>
          
          <div className="flex flex-col">
            {conversations.map((c) => (
              <div 
                key={c.id} 
                onClick={() => setActiveChat(c)}
                className={`p-4 border-b border-ui-border-base cursor-pointer hover:bg-ui-bg-base transition-colors ${activeChat?.id === c.id ? 'bg-ui-bg-base border-l-4 border-l-blue-500' : ''}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <Text className="font-semibold text-sm truncate">{c.customer_name ? c.customer_name : `Session: ${c.session_id.slice(0, 8)}...`}</Text>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    c.status === 'agent_active' ? 'bg-orange-100 text-orange-800' : 
                    c.status === 'bot_active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {c.status === 'agent_active' ? 'Needs Human' : 'Bot'}
                  </span>
                </div>
                <Text className="text-xs text-ui-fg-subtle truncate">
                  {c.messages && c.messages.length > 0 ? c.messages[c.messages.length - 1].content : 'No messages'}
                </Text>
              </div>
            ))}
            {conversations.length === 0 && (
              <div className="p-8 text-center text-ui-fg-subtle">
                No active conversations
              </div>
            )}
          </div>
        </div>

        {/* Right Area - Active Chat */}
        <div className="w-2/3 flex flex-col bg-white">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-ui-border-base bg-white shadow-sm z-10 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold mb-1">Chat: {activeChat.customer_name || activeChat.session_id}</h2>
                  <Text className="text-ui-fg-subtle text-sm">
                    {activeChat.status === 'agent_active' ? 'You are currently handling this.' : 'The AI Bot is currently handling this.'}
                  </Text>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-ui-bg-subtle">
                {activeChat.messages?.map((msg: any) => {
                  const isAdmin = msg.sender_type === "human_agent"
                  const isBot = msg.sender_type === "bot"
                  return (
                    <div key={msg.id} className={`flex flex-col max-w-[70%] ${isAdmin || isBot ? 'self-start' : 'self-end items-end'}`}>
                      <div className="text-xs text-ui-fg-subtle mb-1 ml-1 flex items-center gap-1">
                        {isAdmin ? '🛡️ You (Support)' : isBot ? '🤖 AI Bot' : `👤 Customer (${activeChat.customer_name || 'Guest'})`}
                      </div>
                      <div className={`p-3 rounded-2xl ${
                        isAdmin ? 'bg-blue-600 text-white rounded-tl-sm' : 
                        isBot ? 'bg-gray-700 text-white rounded-tl-sm' : 
                        'bg-gray-200 text-gray-900 rounded-tr-sm'
                      }`}>
                        <Text className="whitespace-pre-wrap text-sm" style={{ color: "inherit" }}>
                          {msg.content}
                        </Text>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-ui-border-base bg-white flex gap-2">
                <Input 
                  placeholder="Type a message to the customer..." 
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                  className="flex-1"
                />
                <Button variant="primary" onClick={handleReply}>
                  Send Reply
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-ui-fg-subtle flex-col gap-2">
              <span className="text-4xl">💬</span>
              <h2 className="text-xl font-bold mb-1">Select a conversation</h2>
              <Text>Choose a chat from the left to view or reply.</Text>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Live Chat",
})

export default ChatbotAdminPage
