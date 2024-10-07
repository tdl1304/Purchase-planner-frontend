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

export default fetcher;
