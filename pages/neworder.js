import { useContext } from "react";
import Layout from "../components/layout";
import AssignClient from "../components/orders/assignclient";
import AssignProduct from "../components/orders/assignproduct";
import OrderSummary from "../components/orders/ordersummary";
// Order context
import OrderContext from "../context/orders/orderContext";
import Total from '../components/orders/total'

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
                    <Total />

                    <button type="button" className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900`} >
                        Register Order
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default NewOrder;
