import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import { connectionDB } from "./config/index.js";

// Routers
import authRouter from "./features/auth/auth.routes.js";
import userRouter from "./features/users/user.routes.js";
import roomRouter from "./features/rooms/room.route.js";
import guestRouter from "./features/guest/guest.route.js";
import bookingRouter from "./features/bookings/booking.route.js";
import receptionistRouter from "./features/receptionist/receptionist.route.js";
import paymentRouter from "./features/payment/payment.route.js";
import feedbackRouter from "./features/feedback/feedback.route.js";
import adminRouter from "./features/admin/admin.route.js";
import housekeepingRouter from "./features/housekeeping/housekeeping.route.js";
import managerRouter from "./features/manager/manager.route.js";

const app = express();

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// Connect DB
await connectionDB();

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/guests", guestRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/receptionists", receptionistRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/admin", adminRouter);
app.use("/api/housekeeping", housekeepingRouter);
app.use("/api/manager", managerRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Hotel Management System API is running ✅");
});

app.listen(3900, () => {
  console.log("Server is running on port 3900");
});

export default app;
