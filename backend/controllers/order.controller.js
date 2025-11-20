import Order from "../models/order.modal.js";
import User from "../models/user.model.js";

// import razorpay from "razorpay"; 

// var instance = new Razorpay({
//   key_id: 'YOUR_KEY_ID',
//   key_secret: 'YOUR_KEY_SECRET',
// });

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });
    return res.status(201).json({ message: "Order Place" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order Place Error" });
  }
};

export const userOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId });
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "userOrders error" });
  }
};

export const AllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Admin All Orders error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(201).json({ message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Update Status error" });
  }
};

export const placeOrderRazorpay = async(req,res)=>{
  try {
    const {items,amount,address} = req.body;
    const userId = req.userId;
    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    }
    const newOrder = new Order(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt:newOrder._id.toString(),
    }
    const order = await instance.orders.create(options);
    return res.status(201).json({message:"Order Placed"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Order Place Error"});
  }
}



