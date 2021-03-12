import { useContext, useEffect, useState } from "react";
import OrderContext from "../../context/orders/orderContext";

const Total = () => {
    const orderContext = useContext(OrderContext);
    const { total } = orderContext;

    return (
        <div className="flex items-center mt-5 bg-white p-3 justify-between">
            <h2 className="text-gray-800 mt-0 text-lg">Total to pay</h2>
            <p className="text-gray-800 mt-0">{parseFloat(total).toFixed(2)} €</p>
        </div>
    );
};

export default Total;
