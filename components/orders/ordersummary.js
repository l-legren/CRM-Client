import { useContext } from "react";
import OrderContext from "../../context/orders/orderContext";
import ProductSummary from "./productsummary";

const OrderSummary = () => {
    // Import the context so we can use the functions stored in the state
    const orderContext = useContext(OrderContext);
    const { products } = orderContext;

    return (
        <>
            <h2 className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 text-sm font-bold p-2 rounded">
                3. How many items?
            </h2>

            {products.length > 0 ? (
                <>
                    {products.map((product) => (
                        <ProductSummary key={product.id} product={product} />
                    ))}
                </>
            ) : (
                <p className="mt-5">"There are no products yet</p>
            )}
        </>
    );
};

export default OrderSummary;
