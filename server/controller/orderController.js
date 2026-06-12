const razorpayInstance = require("../Config/razorPay");
const Order = require("../Model/orderModel");
const crypto = require("crypto");
const Cart = require("../Model/cartModel");

exports.createOrder = async (req, res) => {
  try {
    const { products, amount, tax, shipping, currency } = req.body;
    const options = {
      amount: Math.round(Number(amount) * 100), //convert to paisa
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const razorpayOrder = await razorpayInstance.orders.create(options);

    //save order in db
    const newOrder = new Order({
      user: req.user._id,
      products,
      amount,
      tax,
      shipping,
      currency,
      status: "Pending",
      razorpayOrderId: razorpayOrder.id,
    });

    await newOrder.save();

    res.json({ success: true, order: razorpayOrder, dbOrder: newOrder });
  } catch (error) {
    console.error("Error in create order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentFailed,
    } = req.body;

    const userId = req.user._id;
    if (paymentFailed) {
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "Failed" },
        { new: true },
      );
      return res
        .status(400)
        .json({ success: false, message: "Payment failed", order });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "Paid",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
        { new: true },
      );

      await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [], totalPrice: 0 } },
      );
      return res.json({ success: true, message: "Payment successful", order });
    } else {
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "Failed" },
        { new: true },
      );
      return res
        .status(400)
        .json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error("error in verify Payment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyOrder = async (req, res) => {
  try {
    const userId = req.id;
    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImg",
      })
      .populate("user", "firstname lastname email");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: error.message });
  }
};

//admin only
exports.getUserOrder = async (req, res) => {
  try {
    
    const { userId } = req.params;
    console.log("userId:", userId);
    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImg",
      }) //fetch product details
      .populate("user", "firstname lastname email"); ///fetch user details
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.log("Error fetching user order: ", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrderAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email") //populate user info
      .populate("products.productId", "productName productPrice"); //populate product info

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch all orders",
        error: error.message,
      });
  }
};

// exports.getSalesData=async(req,res)=>{
//   try {
    
//   } catch (error) {
    
//   }
// }
