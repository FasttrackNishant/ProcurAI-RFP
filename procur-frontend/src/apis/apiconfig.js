// src/utils/api.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL


function buildUrl(path, query = null) {
  let url = `${BASE_URL}${path}`;
  if (query && typeof query === "object") {
    const params = new URLSearchParams(query);
    url += `?${params.toString()}`;
  }
  return url;
}

/**
 * Universal API caller
 */
export async function request(path, { method = "GET", body, headers = {}, query } = {}) {
  const url = buildUrl(path, query);

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    }
  };

  // Body serializer
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, config);

    // Attempt to parse JSON; fallback safely
    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      throw {
        status: res.status,
        message: data?.error || `HTTP ${res.status}`,
        data,
      };
    }

    return data;
  } catch (err) {

    // Normalize network errors
    if (err instanceof TypeError) {
      throw {
        status: 0,
        message: "Network error: Cannot connect to backend.",
        data: null,
      };
    }

    throw err; // Already normalized error
  }
}