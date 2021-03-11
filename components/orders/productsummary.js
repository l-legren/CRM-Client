import { useContext, useEffect, useState } from "react";
import OrderContext from "../../context/orders/orderContext";

const ProductSummary = ({ product }) => {
    // Order Context
    const orderContext = useContext(OrderContext);
    const { quantityProducts } = orderContext;

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        updateQuantity()
    }, [quantity]);

    const updateQuantity = () => {
        const newProduct = { ...product, quantity: Number(quantity) };
        quantityProducts(newProduct);
        console.log("New Product", newProduct);
    };

    const { name, price } = product;

    return (
        <div className="md:flex md:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm">{name}</p>
                <p className="text-sm">{price} €</p>
            </div>
            <input
                type="number"
                placeholder="Quantity"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
            />
        </div>
    );
};

export default ProductSummary;
