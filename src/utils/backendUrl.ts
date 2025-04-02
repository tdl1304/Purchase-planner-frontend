const isDevelopment = import.meta.env.DEV;

export const backendUrl = isDevelopment
  ? "http://localhost:3000"
  : "https://purchase-planner-backend.vercel.app";
