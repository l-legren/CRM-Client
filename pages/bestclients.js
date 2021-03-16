import Layout from "../components/layout";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { gql, useQuery } from "@apollo/client";
import { argumentsObjectFromField } from "@apollo/client/utilities";
import { useEffect } from "react";

const BEST_CLIENTS = gql`
    query bestClients {
        bestClients {
            client {
                name
                company
            }
            total
        }
    }
`;

const BestClients = () => {
    const { loading, data, error, startPolling, stopPolling } = useQuery(
        BEST_CLIENTS
    );

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        };
    }, [startPolling, stopPolling]);

    if (loading) return null;

    const { bestClients } = data;
    // console.log(bestClients);
    const clientGraphic = [];

    // Flat the object so it will be accepted on the BarChart component
    bestClients.map((clientObject, idx) => {
        clientGraphic[idx] = {
            ...clientObject.client[0],
            total: clientObject.total,
        };
    });

    // console.log(clientGraphic)

    return (
        <Layout>
            <ResponsiveContainer width={"99%"} height={550}>
                <BarChart
                    className="mt-10"
                    // width={600}
                    // height={500}
                    data={clientGraphic}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" />
                </BarChart>
            </ResponsiveContainer>
        </Layout>
    );
};

export default BestClients;
