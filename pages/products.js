import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import Product from "../components/product";

const GET_PRODUCTS = gql`
    query getProducts {
        getProducts {
            id
            name
            price
            stock
        }
    }
`;

const Products = () => {
    const { loading, data, error } = useQuery(GET_PRODUCTS);

    if (loading) return "Loading...";

    console.log(data);

    const { getProducts } = data;

    return (
        <Layout>
            <h1 className="text-2xl font-light text-gray-800">Products</h1>
            <Link href="/newproduct">
                <a className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-white hover:bg-gray-800 mb-3 uppercase">
                    NEW PRODUCT
                </a>
            </Link>
            <table className="w-full table-auto shadow-md mt-10 w-full w-lg">
                <thead>
                    <tr>
                        <th className="bg-blue-800 text-white w-1/5 text-center px-3 py-2">
                            NAME
                        </th>
                        <th className="bg-blue-800 text-white w-1/5 text-center px-3 py-2">
                            PRICE
                        </th>
                        <th className="bg-blue-800 text-white w-1/5 text-center px-3 py-2">
                            STOCK
                        </th>
                        <th className="bg-blue-800 text-white w-1/5 text-center px-3 py-2">
                            DELETE
                        </th>
                        <th className="bg-blue-800 text-white w-1/5 text-center px-3 py-2">
                            EDIT
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {getProducts.map((product, idx) => {
                        return <Product product={product} key={idx} />
                    })}
                </tbody>
            </table>
        </Layout>
    );
};

export default Products;
