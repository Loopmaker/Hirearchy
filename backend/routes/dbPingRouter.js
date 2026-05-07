import express from "express";
import mongoose from "mongoose";

const dbPingRouter = express.Router();

dbPingRouter.get("/ping-db", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "MongoDB not connected",
      });
    }

    await mongoose.connection.db.admin().ping();

    return res.json({
      success: true,
      message: "MongoDB active",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default dbPingRouter;