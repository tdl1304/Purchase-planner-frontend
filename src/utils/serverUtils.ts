const fetcher = async (url: string, method: string = "GET") => {
  const response = await fetch(url, {
    method,
    headers: {
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
async function customFetch(url: string, options: RequestInit) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      mode: "no-cors",
      secrettoken: localStorage.getItem("token") || "",
    },
  });
}

export { fetcher, customFetch };
