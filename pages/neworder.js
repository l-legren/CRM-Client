import { useContext } from "react";
import Layout from "../components/layout";
import AssignClient from "../components/orders/assignclient";
import AssignProduct from "../components/orders/assignproduct";
import OrderSummary from "../components/orders/ordersummary";
// Order context
import OrderContext from "../context/orders/orderContext";

const NewOrder = () => {
    // Get the context to extract its values and funcitons
    const orderContext = useContext(OrderContext);
    // console.log(orderContext)

    return (
        <Layout>
            <h1>New Order</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AssignClient />
                    <AssignProduct />
                    <OrderSummary />
                </div>
            </div>
        </Layout>
    );
};

export default NewOrder;
