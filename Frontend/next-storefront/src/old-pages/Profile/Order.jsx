"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import { getCustomerOrders } from "../../lib/medusa-auth";
import { ShoppingBag, ChevronDown, ArrowRight } from "lucide-react";

function formatMoney(amount, currencyCode = "inr") {
  const value = typeof amount === "number" ? amount / 100 : 0;
  const code = (currencyCode || "inr").toUpperCase();
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: code === "EUR" ? "EUR" : code === "USD" ? "USD" : "INR",
    }).format(value);
  } catch {
    return `₹${value.toLocaleString("en-IN")}`;
  }
}

function statusClass(status, fulfillmentStatus) {
  const s = (status || "").toLowerCase();
  const f = (fulfillmentStatus || "").toLowerCase();
  
  if (f === "shipped") return "completed";
  if (f === "fulfilled") return "processing";
  if (["completed", "delivered", "fulfilled"].some((x) => s.includes(x)))
    return "completed";
  if (["pending", "awaiting"].some((x) => s.includes(x))) return "pending";
  return "processing";
}

function statusLabel(status, fulfillmentStatus) {
  const f = (fulfillmentStatus || "").toLowerCase();
  if (f === "shipped") return "Dispatched & In Transit";
  if (f === "fulfilled") return "Order Dispatched";
  if (f === "partially_shipped") return "Partially Dispatched";
  
  if (!status) return "Processing";
  return status.replace(/_/g, " ");
}

const OrderSkeleton = () => (
  <div className="profile-card animate-pulse space-y-4">
    <div className="h-3 bg-black/5 w-1/4" />
    <div className="h-3 bg-black/5 w-1/2" />
    <div className="h-8 bg-black/5 w-1/3 ml-auto" />
  </div>
);

const MyOrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await getCustomerOrders();
        const sorted = [...data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setOrders(sorted);
      } catch (e) {
        console.error("Failed to fetch orders", e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [user]);

  if (isLoading) {
    return (
      <div>

        <div className="space-y-4">
          <OrderSkeleton />
          <OrderSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>


      {orders.length === 0 ? (
        <div className="profile-empty">
          <ShoppingBag className="profile-empty-icon" strokeWidth={1} />
          <h2 className="font-display text-2xl font-light text-black mb-2">
            No orders yet
          </h2>
          <p className="text-sm text-black/50 mb-6 max-w-sm mx-auto">
            When you complete a purchase, your order details will appear here.
          </p>
          <Link href="/catalog" className="profile-btn-primary inline-flex">
            Explore collection
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const open = expandedId === order.id;
            const items = order.items || [];
            return (
              <article key={order.id} className="profile-card">
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => setExpandedId(open ? null : order.id)}
                >
                  <div className="flex flex-wrap justify-between gap-4 items-start">
                    <div>
                      <p className="profile-label mb-1">Order</p>
                      <p className="font-mono text-sm text-black">
                        #{order.display_id ?? order.id?.slice(-8)}
                      </p>
                      <p className="text-xs text-black/45 mt-2">
                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span
                        className={`profile-order-status ${statusClass(order.status, order.fulfillment_status)}`}
                      >
                        {statusLabel(order.status, order.fulfillment_status)}
                      </span>
                      <p className="font-display text-2xl text-[#7A0C13]">
                        {formatMoney(order.total, order.currency_code)}
                      </p>
                      <ChevronDown
                        size={16}
                        className={`text-black/40 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                </button>

                {open && (
                  <div className="mt-6 pt-6 border-t border-black/5 space-y-4">
                    {items.length > 0 ? (
                      items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 items-center"
                        >
                          {item.thumbnail && (
                            <img
                              src={item.thumbnail}
                              alt=""
                              className="w-16 h-16 object-cover bg-[#f5f0ec]"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-black truncate">
                              {item.title || item.product_title}
                            </p>
                            <p className="text-xs text-black/45 mt-1">
                              Qty {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm text-black/70">
                            {formatMoney(
                              item.unit_price * item.quantity,
                              order.currency_code
                            )}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-black/50">No line items</p>
                    )}
                    {order.shipping_address && (
                      <div className="pt-4 border-t border-black/5">
                        <p className="profile-label">Shipped to</p>
                        <p className="text-sm text-black/70 mt-1 leading-relaxed">
                          {[
                            order.shipping_address.address_1,
                            order.shipping_address.city,
                            order.shipping_address.postal_code,
                            order.shipping_address.country_code?.toUpperCase(),
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
