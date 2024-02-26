// const express = require("express");
import express from "express";
import AppRoutes from "../src/routes/index.js";
const app = express();
const PORT = 8000;
app.use(express.json());
app.use("/", AppRoutes);

app.listen(PORT, () => console.log(`app is listening ${PORT}`));
