const isProd = process.env.NODE_ENV === "production";

export const baseUrl = isProd
  ? "http://localhost:5000"
  : "http://localhost:5120";
