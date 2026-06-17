"use client";
import React, { useEffect, useState } from "react";
import {
  getCustomerAddresses,
  createCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
} from "../../lib/medusa-auth";
import { MapPin, Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

const emptyForm = {
  first_name: "",
  last_name: "",
  address_1: "",
  address_2: "",
  city: "",
  province: "",
  postal_code: "",
  country_code: "in",
  phone: "",
  company: "",
  is_default_shipping: false,
  is_default_billing: false,
};

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

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const list = await getCustomerAddresses();
      setAddresses(list);
    } catch (e) {
      toast.error(e.message || "Could not load addresses", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (addr) => {
    setEditingId(addr.id);
    setForm({
      first_name: addr.first_name || "",
      last_name: addr.last_name || "",
      address_1: addr.address_1 || "",
      address_2: addr.address_2 || "",
      city: addr.city || "",
      province: addr.province || "",
      postal_code: addr.postal_code || "",
      country_code: addr.country_code || "in",
      phone: addr.phone || "",
      company: addr.company || "",
      is_default_shipping: !!addr.is_default_shipping,
      is_default_billing: !!addr.is_default_billing,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateCustomerAddress(editingId, form);
        toast.success("Address updated", toastOptions);
      } else {
        await createCustomerAddress(form);
        toast.success("Address saved", toastOptions);
      }
      setModalOpen(false);
      await loadAddresses();
    } catch (err) {
      toast.error(err.message || "Could not save address", toastOptions);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this address from your account?")) return;
    try {
      await deleteCustomerAddress(id);
      toast.success("Address removed", toastOptions);
      await loadAddresses();
    } catch (err) {
      toast.error(err.message || "Could not delete address", toastOptions);
    }
  };

  return (
    <div>


      <div className="flex justify-end mb-6">
        <button type="button" className="profile-btn-primary" onClick={openAdd}>
          <Plus size={14} />
          Add address
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-[#7A0C13]" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="profile-empty">
          <MapPin className="profile-empty-icon" strokeWidth={1} />
          <h2 className="font-display text-2xl font-light mb-2">No addresses yet</h2>
          <p className="text-sm text-black/50 mb-6">
            Add a delivery address for seamless checkout.
          </p>
          <button type="button" className="profile-btn-primary" onClick={openAdd}>
            <Plus size={14} />
            Add your first address
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div key={addr.id} className="profile-address-card">
              {(addr.is_default_shipping || addr.is_default_billing) && (
                <span className="profile-address-default">Default</span>
              )}
              <p className="font-medium text-black">
                {addr.first_name} {addr.last_name}
              </p>
              {addr.company && (
                <p className="text-sm text-black/50 mt-1">{addr.company}</p>
              )}
              <p className="text-sm text-black/70 mt-3 leading-relaxed">
                {addr.address_1}
                {addr.address_2 && <>, {addr.address_2}</>}
                <br />
                {addr.city}
                {addr.province && `, ${addr.province}`} {addr.postal_code}
                <br />
                {addr.country_code?.toUpperCase()}
              </p>
              {addr.phone && (
                <p className="text-xs text-black/45 mt-2 tracking-wide">
                  {addr.phone}
                </p>
              )}
              <div className="flex gap-2 mt-5 pt-4 border-t border-black/5">
                <button
                  type="button"
                  className="profile-btn-outline py-2 px-3 text-[9px]"
                  onClick={() => openEdit(addr)}
                >
                  <Pencil size={12} />
                  Edit
                </button>
                <button
                  type="button"
                  className="profile-btn-outline py-2 px-3 text-[9px] text-[#7A0C13] border-[#7A0C13]/30"
                  onClick={() => handleDelete(addr.id)}
                >
                  <Trash2 size={12} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div
          className="profile-modal-overlay"
          onClick={() => !saving && setModalOpen(false)}
          role="presentation"
        >
          <div
            className="profile-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="profile-eyebrow mb-2">
                  {editingId ? "Edit" : "New"} address
                </p>
                <h3 className="font-display text-2xl font-light">
                  Delivery details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-black/40 hover:text-black p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="profile-field mb-0">
                  <label className="profile-label">First name</label>
                  <input
                    className="profile-input"
                    required
                    value={form.first_name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, first_name: e.target.value }))
                    }
                  />
                </div>
                <div className="profile-field mb-0">
                  <label className="profile-label">Last name</label>
                  <input
                    className="profile-input"
                    required
                    value={form.last_name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, last_name: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="profile-field mb-0">
                <label className="profile-label">Address line 1</label>
                <input
                  className="profile-input"
                  required
                  value={form.address_1}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address_1: e.target.value }))
                  }
                />
              </div>
              <div className="profile-field mb-0">
                <label className="profile-label">Address line 2</label>
                <input
                  className="profile-input"
                  value={form.address_2}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address_2: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="profile-field mb-0">
                  <label className="profile-label">City</label>
                  <input
                    className="profile-input"
                    required
                    value={form.city}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, city: e.target.value }))
                    }
                  />
                </div>
                <div className="profile-field mb-0">
                  <label className="profile-label">Postal code</label>
                  <input
                    className="profile-input"
                    required
                    value={form.postal_code}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, postal_code: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="profile-field mb-0">
                  <label className="profile-label">Country code</label>
                  <input
                    className="profile-input"
                    required
                    maxLength={2}
                    placeholder="in"
                    value={form.country_code}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        country_code: e.target.value.toLowerCase(),
                      }))
                    }
                  />
                </div>
                <div className="profile-field mb-0">
                  <label className="profile-label">Phone</label>
                  <input
                    className="profile-input"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-black/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_default_shipping}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      is_default_shipping: e.target.checked,
                    }))
                  }
                  className="accent-[#7A0C13]"
                />
                Default shipping
              </label>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="profile-btn-primary"
                  disabled={saving}
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {editingId ? "Update address" : "Save address"}
                </button>
                <button
                  type="button"
                  className="profile-btn-outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;
