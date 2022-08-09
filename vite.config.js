import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// http://192.168.0.253:8091/sys/user/login

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       //目标地址
  //       target: "http://127.0.0.1:5173/",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
