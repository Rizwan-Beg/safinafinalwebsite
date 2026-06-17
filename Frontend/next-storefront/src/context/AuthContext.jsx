"use client";
import React, { createContext, useState, useMemo, useEffect } from "react";
import {
  getCurrentCustomer,
  loginCustomer,
  logoutCustomer,
  registerCustomer,
} from "../lib/medusa-auth";

export const AuthContext = createContext(null);

function mapCustomerToUser(customer) {
  if (!customer) return null;
  return {
    name:
      `${customer.first_name || ""} ${customer.last_name || ""}`.trim() ||
      "Customer",
    email: customer.email,
    id: customer.id,
    phone: customer.phone,
    firstName: customer.first_name,
    lastName: customer.last_name,
    isAdmin: false,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = async () => {
    try {
      const current = await getCurrentCustomer();
      if (!current) {
        setUser(null);
        setCustomer(null);
        return;
      }
      setCustomer(current);
      setUser(mapCustomerToUser(current));
    } catch {
      setUser(null);
      setCustomer(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await loginCustomer({ email, password });
      await checkSession();
      window.location.href = "/";
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "-";

      await registerCustomer({
        email,
        password,
        firstName,
        lastName,
      });

      await checkSession();
      return true;
    } catch (err) {
      if (err.status === 401) {
        throw new Error("Could not create account. Check your details and try again.");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationEmail = async () => {
    console.warn(
      "sendVerificationEmail is not natively supported by Medusa without a plugin."
    );
  };

  const logout = async () => {
    logoutCustomer();
    setUser(null);
    window.location.href = "/login";
  };

  const value = useMemo(
    () => ({
      user,
      customer,
      isLoading,
      login,
      signup,
      sendVerificationEmail,
      logout,
      refreshUser: checkSession,
    }),
    [user, customer, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
