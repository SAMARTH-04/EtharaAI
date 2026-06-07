import api from "../api/axios";

export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const createOrder = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};