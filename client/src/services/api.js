const localApi = 'http://localhost:5001/api';
const productionApi = 'https://server-xi-ashy-46.vercel.app/api';
const base = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? localApi : productionApi);

export async function api(path, { method = 'GET', body, token } = {}) {
  const response = await fetch(base + path, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}
