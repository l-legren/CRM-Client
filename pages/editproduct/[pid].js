import Layout from "../../components/layout";
import { Formik } from "formik";
import * as yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const GET_PRODUCT = gql`
    query getProductById($id: ID!) {
        getProductById(id: $id) {
            name
            stock
            price
        }
    }
`;

const UPDATE_PRODUCT = gql`
    mutation updateProducts($id: ID!, $input: ProductInput) {
        updateProduct(id: $id, input: $input) {
            name
            price
            stock
        }
    }
`;

const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    price: yup
        .number()
        .required("Price is required")
        .positive("Negative prices are not valid"),
    stock: yup
        .number()
        .required("Stock is required")
        .positive("Negative stocks are not valid")
        .integer("Field must be an integer"),
});

const EditProduct = () => {
    // Need to extract the id from router object
    const router = useRouter();
    const {
        query: { pid },
    } = router;

    console.log(pid);

    const { loading, data, error } = useQuery(GET_PRODUCT, {
        variables: {
            id: pid,
        },
    });

    const [updateProduct] = useMutation(UPDATE_PRODUCT);

    if (loading) return "Loading...";

    const { getProductById } = data;

    const updateInfoProduct = async (values) => {
        const {name, price, stock } = values
        try {
            const { data } = await updateProduct({
                variables: {
                    id: pid,
                    input: {
                        name,
                        price,
                        stock,
                    },
                },
            });
            console.log("Data after updating Database", data);
            // Alert Dialog
            Swal.fire("Updated", "Product updated", "success");
            // redirect user
            router.push("/products");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <h1 className="text-center text-2xl text font-light uppercase">
                Edit Product
            </h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={getProductById}
                        onSubmit={(values) => {
                        updateInfoProduct(values);
                        }}
                    >
                        {(props) => {
                            return (
                                <form
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        props.handleSubmit(e);
                                    }}
                                >
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="name"
                                        >
                                            Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="text"
                                            placeholder="name User"
                                            defaultValue={props.values.name}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    {props.touched.name && props.errors.name && (
                                        <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.name}</p>
                                        </div>
                                    )}

                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="price"
                                        >
                                            Price
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="price"
                                            type="text"
                                            placeholder="Price"
                                            defaultValue={props.values.price}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    {props.touched.surname &&
                                        props.errors.surname && (
                                            <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                                <p className="font-bold">
                                                    Error
                                                </p>
                                                <p>{props.errors.surname}</p>
                                            </div>
                                        )}

                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="stock"
                                        >
                                            Stock
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="stock"
                                            type="stock"
                                            placeholder="Stock"
                                            defaultValue={props.values.stock}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    {props.touched.email && props.errors.email && (
                                        <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.email}</p>
                                        </div>
                                    )}

                                    <input
                                        type="submit"
                                        value="CONFIRM CHANGES"
                                        className="bg-gray-800 w-full mt-5 py-2 cursor-pointer text-white uppercase hover:bg-gray-600 rounded"
                                    />
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
};

export default EditProduct;
