"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import { CurrencyContext } from "../../context/CurrencyContext";
import {
  Bell,
  Globe,
  Shield,
  LogOut,
  ChevronRight,
  Mail,
} from "lucide-react";

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const { currency, setCurrency } = useContext(CurrencyContext);

  return (
    <div>


      <section className="mb-10">
        <h3 className="profile-label mb-4">Regional</h3>
        <div className="profile-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-[#7A0C13]" strokeWidth={1.25} />
            <div>
              <p className="text-sm text-black font-medium">Display currency</p>
              <p className="text-xs text-black/45 mt-0.5">
                Prices across the boutique reflect this preference
              </p>
            </div>
          </div>
          <div className="flex border border-black/10">
            {["INR", "USD"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  currency === c
                    ? "bg-black text-white"
                    : "bg-white text-black/55 hover:text-black"
                }`}
              >
                {c === "INR" ? "₹ INR" : "$ USD"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="profile-label mb-4">Communications</h3>
        <div className="profile-card flex items-start gap-3">
          <Bell size={18} className="text-[#7A0C13] mt-0.5" strokeWidth={1.25} />
          <div>
            <p className="text-sm text-black font-medium">Order updates</p>
            <p className="text-xs text-black/45 mt-1 leading-relaxed">
              We send confirmations and shipping notices to{" "}
              <span className="text-black">{user?.email}</span>. Manage marketing
              preferences via our contact team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 mt-3 text-[10px] uppercase tracking-widest text-[#7A0C13] hover:underline"
            >
              Contact concierge
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="profile-label mb-4">Security</h3>
        <div className="space-y-3">
          <div className="profile-card flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-[#7A0C13]" strokeWidth={1.25} />
              <div>
                <p className="text-sm text-black font-medium">Password</p>
                <p className="text-xs text-black/45">Update via email reset</p>
              </div>
            </div>
            <Link href="/login" className="profile-btn-outline py-2 px-4 text-[9px]">
              Reset
            </Link>
          </div>
          <div className="profile-card flex items-center gap-3">
            <Mail size={18} className="text-[#7A0C13]" strokeWidth={1.25} />
            <div>
              <p className="text-sm text-black font-medium">Signed in as</p>
              <p className="text-xs text-black/70 mt-0.5">{user?.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-6 border-t border-black/5">
        <button
          type="button"
          onClick={logout}
          className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#7A0C13] text-[#7A0C13] px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[#7A0C13] hover:text-white transition-colors"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </section>
    </div>
  );
};

export default Settings;
