const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDb = require("./Config/db");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRoute");
const cartRouter = require("./router/cartRoute");
const orderRoute = require("./router/orderRoute");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://revoltkartfrontend.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
connectDb();

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Welcome To MutliVendor dataBase");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on : http://localhost:${process.env.PORT}`);
});
