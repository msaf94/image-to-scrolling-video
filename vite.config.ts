import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig(({ command }) => {
  const config = {
    base: "/",

    plugins: [solid()],
    build: {
      target: "esnext",
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  };

  if (command !== "serve") {
    config.base = "/image-to-scrolling-video/";
  }

  return config;
});
