import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Layout from "../components/layout";
import Order from "../components/orders/order";
import { useEffect, useReducer, useState } from "react";

const GET_ORDERS = gql`
query getOrderBySeller {
    getOrderBySeller {
        id
        order {
            id
            quantity
            name
        }
        client {
            id
            name
            surname
            email
            phone
        }
        seller
        total
        status
    }
}
`

const Orders = () => {

    const {loading, data, error} = useQuery(GET_ORDERS)

    console.log(data)

    if (loading) return "Loading..."
    
    const {getOrderBySeller} = data

    return (
        <Layout>
            <h1 className="text-2xl font-light text-gray-800">Orders</h1>
            <Link href="/neworder">
                <a className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-white hover:bg-gray-800 mb-3 uppercase">
                    NEW ORDER
                </a>
            </Link>
            
            { getOrderBySeller.length == 0 ? (<p className="text-center text-2xl mt-5">No orders yet</p>) : (
                getOrderBySeller.map((order,idx) => <Order key={idx} order={order} />)
            )}

        </Layout>
    );
};

export default Orders;
