"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateCustomer } from "../../lib/medusa-auth";
import { Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";

const toastOptions = {
  style: {
    borderRadius: "0",
    background: "#000",
    color: "#fff",
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
};

const ProfileDetail = () => {
  const { user, customer, refreshUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  useEffect(() => {
    if (customer) {
      setForm({
        first_name: customer.first_name || "",
        last_name: customer.last_name || "",
        phone: customer.phone || "",
      });
    } else if (user) {
      const parts = (user.name || "").split(" ");
      setForm({
        first_name: user.firstName || parts[0] || "",
        last_name: user.lastName || parts.slice(1).join(" ") || "",
        phone: user.phone || "",
      });
    }
  }, [customer, user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateCustomer({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        phone: form.phone.trim() || null,
      });
      await refreshUser();
      setEditing(false);
      toast.success("Profile updated", toastOptions);
    } catch (err) {
      toast.error(err.message || "Could not save profile", toastOptions);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>

      <form onSubmit={handleSave} className="max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <div className="profile-field">
            <label className="profile-label" htmlFor="first_name">
              First name
            </label>
            <input
              id="first_name"
              className="profile-input"
              value={form.first_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, first_name: e.target.value }))
              }
              disabled={!editing}
              required
            />
          </div>
          <div className="profile-field">
            <label className="profile-label" htmlFor="last_name">
              Last name
            </label>
            <input
              id="last_name"
              className="profile-input"
              value={form.last_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, last_name: e.target.value }))
              }
              disabled={!editing}
              required
            />
          </div>
        </div>

        <div className="profile-field">
          <label className="profile-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="profile-input"
            value={user?.email || ""}
            disabled
          />
        </div>

        <div className="profile-field">
          <label className="profile-label" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className="profile-input"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            disabled={!editing}
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-black/5 mt-6">
          {!editing ? (
            <button
              type="button"
              className="profile-btn-primary"
              onClick={() => setEditing(true)}
            >
              Edit profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="profile-btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                Save changes
              </button>
              <button
                type="button"
                className="profile-btn-outline"
                onClick={() => {
                  setEditing(false);
                  if (customer) {
                    setForm({
                      first_name: customer.first_name || "",
                      last_name: customer.last_name || "",
                      phone: customer.phone || "",
                    });
                  }
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileDetail;
