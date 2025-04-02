const fetcher = async (url: string, method: string = "GET") => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      secrettoken: localStorage.getItem("token") || "",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log("Fetched data:", data);
  return data;
};

async function customFetch<T>(
  url: string,
  options: RequestInit,
  method = "GET"
): Promise<T> {
  const response = await fetch(url, {
    method: method,
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      secrettoken: localStorage.getItem("token") || "",
    },
  });

  if (!response.ok) {
    throw new Error("Fetch failed for url: " + url);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = (await response.json()) as T;
    return data;
  } else {
    return response.text() as unknown as T;
  }
}

export { fetcher, customFetch };
