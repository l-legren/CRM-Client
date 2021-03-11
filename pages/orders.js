import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import Order from "../components/orders/order";
import Select from "react-select";
import { useEffect, useReducer, useState } from "react";
import AssignClient from '../components/orders/assignclient'


const Orders = () => {

    return (
        <Layout>
            <h1 className="text-2xl font-light text-gray-800">Orders</h1>
            <Link href="/neworder">
                <a className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-white hover:bg-gray-800 mb-3 uppercase">
                    NEW ORDER
                </a>
            </Link>
            
            <AssignClient />
        </Layout>
    );
};

export default Orders;
