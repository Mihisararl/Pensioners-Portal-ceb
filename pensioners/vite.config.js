import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./", // Important for Nginx static build
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Pension login API
      "/api": {
        target: "http://10.128.1.126",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },

      // OTP Service API
      "/otpapi": {
        target: "http://10.128.1.227:8080/SharedService",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/otpapi/, ""),
      },
    },
  },
});
