import express from "express";
import helmet from "helmet";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const ANGULAR_DEV_SERVER = "http://localhost:4200";

app.use(
  helmet({
     crossOriginOpenerPolicy: {
      policy: "same-origin-allow-popups", // anders gaat het login met Github niet werken, omdat die een popup opent
    },
    contentSecurityPolicy: {
      reportOnly: true, // 🔥 belangrijk voor dev
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://apis.google.com",
          "https://www.gstatic.com"
        ],
        styleSrc: ["'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com"],
        connectSrc: [
          "'self'",
          ANGULAR_DEV_SERVER,
          "https://*.firebaseio.com",
          "https://*.googleapis.com",
          "ws://localhost:4200", // HMR / live reload
        ],
        imgSrc: ["'self'", "data:"],
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
        frameSrc: ["'self'", "https://*.firebaseapp.com", "https://*.googleapis.com", 
        ],
        workerSrc: ["'self'", "blob:"]
      },
    },
  })
);

// proxy alles door naar Angular dev server
app.use(
  "/",
  createProxyMiddleware({
    target: ANGULAR_DEV_SERVER,
    changeOrigin: false,
    ws: true, // belangrijk voor hot reload
  })
);

app.listen(3001, () => {
  console.log("CSP proxy running on http://localhost:3001");
});