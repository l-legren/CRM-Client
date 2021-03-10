import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import Router from "next/router";

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id)
    }
`;

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

const Client = ({ client }) => {
    const { id, name, surname, company, email, phone } = client;

    // Mutation delete client
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        update(cache) {
            const { getClientsSeller } = cache.readQuery({
                query: GET_CLIENTS,
            });
            cache.evict({ broadcast: false });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    getClientsSeller: getClientsSeller.filter(
                        (deletedClient) => deletedClient.id !== id
                    ),
                },
            });
        },
    });

    const confirmDeleteClient = () => {
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
                    const { data } = await deleteClient({
                        variables: {
                            id,
                        },
                    });
                    Swal.fire("Deleted!", data.deleteClient, "success");
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    const editClient = () => {
        Router.push({
            pathname: "/editclient/[id]",
            query: { id },
        });
    };

    return (
        <tr>
            <td className="border px-4 py-2">
                {client.name} {client.surname}
            </td>
            <td className="border px-4 py-2">{client.company}</td>
            <td className="border px-4 py-2">{client.email}</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center item-center bg-red-800 text-white font-bold uppercase px-3 py-2 rounded w-full"
                    onClick={() => confirmDeleteClient()}
                >
                    Delete
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 ml-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center item-center bg-green-600 text-white font-bold uppercase px-3 py-2 rounded w-full"
                    onClick={() => editClient()}
                >
                    Edit
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 ml-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                </button>
            </td>
        </tr>
    );
};

export default Client;
