const TOKEN_KEY = "medusa_auth_token";

export function getMedusaConfig() {
  return {
    baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
    publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
  };
}

export function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

async function medusaRequest(path, { method = "GET", body, token, skipAuth = false } = {}) {
  const { baseUrl, publishableKey } = getMedusaConfig();

  if (!publishableKey) {
    throw new Error(
      "Store API key is missing. Set NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY in .env.local."
    );
  }

  const headers = {
    "Content-Type": "application/json",
    "x-publishable-api-key": publishableKey,
  };

  const authToken = skipAuth ? null : token ?? getStoredToken();
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  let response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(
      "Cannot reach the store server. Make sure the Medusa backend is running on port 9000."
    );
  }

  let data;
  const text = await response.text();
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text || response.statusText };
  }

  if (!response.ok) {
    const error = new Error(data.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function registerCustomer({ email, password, firstName, lastName }) {
  const { token: registrationToken } = await medusaRequest(
    "/auth/customer/emailpass/register",
    {
      method: "POST",
      body: { email, password },
      skipAuth: true,
    }
  );

  if (!registrationToken) {
    throw new Error("Registration failed. Please try again.");
  }

  await medusaRequest("/store/customers", {
    method: "POST",
    body: {
      email,
      first_name: firstName,
      last_name: lastName,
    },
    token: registrationToken,
  });

  return loginCustomer({ email, password });
}

export async function loginCustomer({ email, password }) {
  const { token } = await medusaRequest("/auth/customer/emailpass", {
    method: "POST",
    body: { email, password },
    skipAuth: true,
  });

  if (!token) {
    throw new Error("Invalid email or password");
  }

  setStoredToken(token);
  return token;
}

export async function getCurrentCustomer() {
  if (!getStoredToken()) return null;

  try {
    const { customer } = await medusaRequest("/store/customers/me");
    return customer;
  } catch (err) {
    if (err.status === 401) {
      clearStoredToken();
    }
    return null;
  }
}

export function logoutCustomer() {
  clearStoredToken();
}

export async function updateCustomer(data) {
  const { customer } = await medusaRequest("/store/customers/me", {
    method: "POST",
    body: data,
  });
  return customer;
}

export async function getCustomerOrders() {
  try {
    const data = await medusaRequest("/store/orders");
    return data.orders || [];
  } catch (err) {
    console.error("Order fetch failed, trying fallback...", err);
    try {
      const data = await medusaRequest("/store/customers/me/orders");
      return data.orders || [];
    } catch (inner) {
      return [];
    }
  }
}

export async function getCustomerAddresses() {
  const data = await medusaRequest("/store/customers/me/addresses");
  return data.addresses || [];
}

export async function createCustomerAddress(address) {
  const { customer } = await medusaRequest("/store/customers/me/addresses", {
    method: "POST",
    body: address,
  });
  return customer?.addresses || [];
}

export async function updateCustomerAddress(addressId, address) {
  const { customer } = await medusaRequest(
    `/store/customers/me/addresses/${addressId}`,
    { method: "POST", body: address }
  );
  return customer;
}

export async function deleteCustomerAddress(addressId) {
  await medusaRequest(`/store/customers/me/addresses/${addressId}`, {
    method: "DELETE",
  });
}
