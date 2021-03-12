import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/layout";
import AssignClient from "../components/orders/assignclient";
import AssignProduct from "../components/orders/assignproduct";
import OrderSummary from "../components/orders/ordersummary";
import Total from "../components/orders/total";
import OrderContext from "../context/orders/orderContext";
import Swal from "sweetalert2";

const NEW_ORDER = gql`
    mutation newOrder($input: OrderInput) {
        newOrder(input: $input) {
            id
        }
    }
`;

const NewOrder = () => {
    // Context
    const orderContext = useContext(OrderContext);
    const { products, total, client } = orderContext;

    // Mutation newOrder
    const [newOrder] = useMutation(NEW_ORDER);

    const [message, setMessage] = useState(null);
    // console.log("Products in OrderSummary", products);

    const router = useRouter();

    const validateOrder = () => {
        return !products.every((product) => product.quantity > 0) ||
            !products ||
            total === 0 ||
            !client
            ? " opacity-50 cursor-not-allowed "
            : " ";
    };

    const createNewOrder = async () => {
        // Filter what we dont need from product
        const { id } = client;
        const order = products.map(
            ({ stock, __typename, ...product }) => product
        );
        try {
            const { data } = await newOrder({
                variables: {
                    input: {
                        order,
                        client: id,
                        total: total,
                    },
                },
            });
            console.log("Data after inserting new order", data);
            router.push('/orders');
            Swal.fire(
                'Success',
                "Order was registered succesfully",
                'success'
            )
        } catch (error) {
            console.log(error);
            setMessage(error.message.replace("GraphQL error", ""));
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    };

    const showMessage = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        );
    };

    return (
        <Layout>
            <h1>New Order</h1>

            {message && showMessage()}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AssignClient />
                    <AssignProduct />
                    <OrderSummary />
                    <Total />

                    <button
                        type="button"
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
                        onClick={() => createNewOrder()}
                    >
                        Register Order
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default NewOrder;
