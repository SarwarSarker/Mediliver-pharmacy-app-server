const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");

const Order = require("../models/orderModel");

//@desc     Get Orders
//@route    GET /api/orders
//access    Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  res.status(200).json(orders);
});

//@desc     Get Single Orders
//@route    GET /api/orders/id
//access    Private
const getMyOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });

  if (!order) {
    res.status(400);
    throw new Error("Order not Found");
  }

  res.status(200).json(order);
});

//@desc     Set Order
//@route    POST /api/orders
//access    Private
const setOrder = asyncHandler(async (req, res) => {
  const order = await Order.create({
    shippingInfo : req.body.shippingInfo,
    orderItems : req.body.orderItems,
    itemsPrice : req.body.itemsPrice,
    taxPrice : req.body.taxPrice,
    shippingPrice : req.body.shippingPrice,
    totalPrice : req.body.totalPrice,
    user: req.user._id,
  });
  res.status(200).json(order);
});

//@desc     Update Orders
//@route    PUT /api/orders/id
//access    Private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(400);
    throw new Error("Order not Found");
  }

  if (order.orderStatus === "Delivered") {
    res.status(400);
    throw new Error("You have already delivered this order");
  }

  const data = {
    shippingInfo : req.body.shippingInfo|| order.shippingInfo,
    orderItems : req.body.orderItems|| order.orderItems,
    itemsPrice : req.body.itemsPrice|| order.itemsPrice,
    taxPrice : req.body.taxPrice|| order.taxPrice,
    shippingPrice : req.body.shippingPrice|| order.shippingPrice,
    totalPrice : req.body.totalPrice|| order.totalPrice,
  };

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });

  res.status(200).json(updatedOrder);
});

//@desc     Delete Orders
//@route    DELETE /api/orders/id
//access    Private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(400);
    throw new Error("Order not Found");
  }

  await order.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getOrders,
  getMyOrder,
  setOrder,
  updateOrder,
  deleteOrder,
};
