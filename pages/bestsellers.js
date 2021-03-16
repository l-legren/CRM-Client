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

const BEST_SELLERS = gql`
    query bestSellers {
        bestSellers {
            seller {
                name
                surname
            }
            total
        }
    }
`;

const BestSellers = () => {
    const { loading, data, error, startPolling, stopPolling } = useQuery(
        BEST_SELLERS
    );

    
        useEffect(() => {
            startPolling(1000);
            return () => {
                stopPolling();
            };
        }, [startPolling, stopPolling]);
    
    if (loading) return null;

    const { bestSellers } = data;
    // console.log(bestSellers);
    const sellerGraphic = [];

    bestSellers.map((sellerObject, idx) => {
        sellerGraphic[idx] = {
            ...sellerObject.seller[0],
            total: sellerObject.total,
        };
    });

    // console.log(sellerGraphic)

    return (
        <Layout>
            <BarChart
                className="mt-10"
                width={600}
                height={500}
                data={sellerGraphic}
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
        </Layout>
    );
};

export default BestSellers;
