// import Head from "next/head";
// import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Client from "../components/client";

const GET_CLIENTS = gql`
    query getClientsSeller {
        getClientsSeller {
            id
            name
            surname
            company
            email
        }
    }
`;

const Index = () => {
    // Apollo to GraphQL query
    const { loading, data, error } = useQuery(GET_CLIENTS);

    if (loading) return "Loading";

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
            <Link href="/newclient">
                <a className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-white hover:bg-gray-800 mb-3 uppercase">
                    New Client
                </a>
            </Link>
            <div className="overflow-x-scroll">
                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                            <th className="w-1/5 py-2">Name</th>
                            <th className="w-1/5 py-2">Company</th>
                            <th className="w-1/5 py-2">Email</th>
                            <th className="w-1/5 py-2">Delete</th>
                            <th className="w-1/5 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getClientsSeller.map((client, idx) => (
                            <Client key={idx} client={client} />
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Index;
