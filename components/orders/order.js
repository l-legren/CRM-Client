import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const UPDATE_ORDER = gql`
    mutation updateOrder($id: ID!, $input: OrderInput) {
        updateOrder(id: $id, input: $input) {
            status
        }
    }
`;

const DELETE_ORDER = gql`
mutation deleteOrder ($id: ID!) {
    deleteOrder(id: $id)
}
`

const GET_ORDERS = gql`
    query getOrderBySeller {
        getOrderBySeller {
            id
        }
    }
`;

const Order = ({ order }) => {
    const {
        id,
        total,
        client: { name, surname, email, phone },
        status,
    } = order;
    const [orderStatus, setOrderStatus] = useState(status);
    const [color, setColor] = useState("");


    // Mutation for changing status and deleting
    const [updateOrder] = useMutation(UPDATE_ORDER)
    const [deleteOrder] = useMutation(DELETE_ORDER, {
        update(cache) {
            const { getOrderBySeller } = cache.readQuery({ query: GET_ORDERS })
            cache.evict({ broadcast: false })
            cache.writeQuery({
                query: GET_ORDERS,
                data: {
                    getOrderBySeller: getOrderBySeller.filter(order => {
                    return order.id !== id
                })}
            })
        }
    })

    useEffect(() => {
        if (orderStatus) {
            setOrderStatus(orderStatus);
        }
        orderColor();
    }, [orderStatus]);

    // Modify order color according to state

    const orderColor = () => {
        orderStatus == "PENDING"
            ? setColor("border-yellow-500")
            : orderStatus == "COMPLETED"
            ? setColor("border-green-500")
            : setColor("border-red-800");
    };

    const updateOrderStatus = async (e) => {
        // console.log(e.target.value, order.client.id)
        try {
            const { data } = await updateOrder({
                variables: {
                    id,
                    input: {
                        client: order.client.id,
                        status: e.target.value
                    }
                }
            })
            // console.log("Status updated", data)
            setOrderStatus(data.updateOrder.status)
        } catch (error) {
            console.log(error)
        }
    }

    const confirmDeleteOrder = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Delete by ID
                    const { data } = await deleteOrder({
                        variables: {
                            id,
                        },
                    });
                    Swal.fire("Deleted!", data.deleteOrder, "success");
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    return (
        <div
            className={` ${color} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}
        >
            <div className="font-bold text-gray-800">
                <p>
                    Client: {name} {surname}
                </p>
                {email && (
                    <p className="flex items-center my-2">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 mr-2"
                        >
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        {email}
                    </p>
                )}

                {phone && (
                    <p className="flex items-center my-2">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 mr-2"
                        >
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        {phone}
                    </p>
                )}
                <h2>Order status:</h2>
                <select
                    defaultValue={orderStatus}
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                    onChange={e => updateOrderStatus(e)}
                >
                    <option defaultValue="completed">COMPLETED</option>
                    <option defaultValue="pending">PENDING</option>
                    <option defaultValue="cancelled">CANCELLED</option>
                </select>
            </div>
            <div>
                <h2 className="text-gray-800 font-bold mt-2">Order Summary</h2>
                {order.order.map((article) => (
                    <div key={article.id} className="mt-4">
                        <p className="text-sm text-gray-600">
                            Article: {article.name}
                        </p>
                        <p className="text-sm text-gray-600">
                            Quantity: {article.quantity} pieces
                        </p>
                    </div>
                ))}
                <p className="font-light">Total to pay: {total} €</p>
                <button onClick={confirmDeleteOrder} className="flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded uppercase text-sm font-bold">
                    Delete Order
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 ml-2"
                    >
                        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Order;
