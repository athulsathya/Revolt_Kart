import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowUserOrders() {
  const params = useParams();


  console.log("params:", params);
  console.log("userId:", params.userId);

  const [userOrder, setUserOrder] = useState([]);

  const getUserOrder = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/orders/user-order/${params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log("Response:", res.data);

    if (res.data.success) {
      setUserOrder(res.data.orders);
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  return (
    <div>
      <OrderCard userOrder={userOrder} />
    </div>
  );
}

export default ShowUserOrders;
