import createHeaders from "./createHeaders.js";

const BASE_URL = "https://api.koleo.pl/v2";

const formRequest = async (endpoint, body = null, accessToken = null) => {
  const method = body ? "POST" : "GET";

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: createHeaders(true, accessToken),
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const text = await res.text();
    let json = {};
    try {
        json = JSON.parse(text);
    } catch (e) {
        // ignore JSON parse error
    }

    if (res.status === 404) {
      return {
        error: "discoveryError",
        respBody: {
            text,
            json
        },
        method,
        reqPath: `${BASE_URL}${endpoint}`,
      };
    }
    return {
      error: `HTTP ${res.status}`,
      respBody: {
          text,
          json
      },
      method,
      reqPath: `${BASE_URL}${endpoint}`,
    };
  }

  return res.json();
};

export default formRequest;
