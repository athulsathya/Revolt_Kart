import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Myorder() {
  const [userOrder, setUserOrder] = useState([]);

  const getUserOrder = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/orders/myorder`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        setUserOrder(res.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  return (
    <>
      <OrderCard userOrder={userOrder} />
    </>
  );
}

export default Myorder;
