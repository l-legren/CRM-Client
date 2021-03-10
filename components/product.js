import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;

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

const Product = ({ product }) => {
    const { id } = product;
    const router = useRouter()

    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        update(cache) {
            const { getProducts } = cache.readQuery({ query: GET_PRODUCTS });
            cache.evict({ broadcast: false });
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: getProducts.filter((prod) => prod.id !== id),
            });
        },
    });

    const confirmDeleteProduct = () => {
        console.log("Sending...", id);
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
                console.log("Confirmed!");
                try {
                    const { data } = await deleteProduct({
                        variables: {
                            id,
                        },
                    });
                    Swal.fire("Deleted!", data.deleteProduct, "success");
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    const editProduct = () => {
        router.push({
            pathname: '/editproduct/[id]',
            query: {id}
        })
    };

    return (
        <tr>
            <td className="border px-4 py-2">{product.name}</td>
            <td className="border px-4 py-2 text-center">{product.price}€</td>
            <td className="border px-4 py-2 text-center">
                {product.stock} uds.
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center item-center bg-red-800 text-white font-bold uppercase px-3 py-2 rounded w-full"
                    onClick={() => confirmDeleteProduct()}
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
                    className="flex justify-center item-center bg-green-800 text-white font-bold uppercase px-3 py-2 rounded w-full"
                    onClick={() => editProduct()}
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

export default Product;
