import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import OrderContext from "../../context/orders/orderContext";

const GET_CLIENTS_SELLER = gql`
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

const AssignClient = () => {
    const [client, setClient] = useState();

    // Take orders context
    const orderContext = useContext(OrderContext);
    const { addClient } = orderContext;

    useEffect(() => {
        addClient(client)
    }, [client]);

    const { loading, data, error } = useQuery(GET_CLIENTS_SELLER);

    if (loading) return null;

    const { getClientsSeller } = data;

    const chooseClient = (client) => {
        setClient(client);
    };

    return (
        <>
            <h2 className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 text-sm font-bold p-2 rounded">
                1. Assign a client to the Order
            </h2>
            <Select
                options={getClientsSeller}
                onChange={(client) => chooseClient(client)}
                getOptionValue={(client) => client.id}
                getOptionLabel={(client) => client.name}
                placeholder="Choose client"
                noOptionsMessage={() => "No clients found"}
            />
        </>
    );
};

export default AssignClient;
