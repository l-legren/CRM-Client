import Layout from "../components/layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from 'sweetalert2'

const NEW_PRODUCT = gql`
    mutation newProduct($input: ProductInput) {
        newProduct(input: $input) {
            id
            name
            price
            stock
        }
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


const NewProduct = () => {
    const [msg, setMsg] = useState(null);

    const [newProduct] = useMutation(NEW_PRODUCT, {
        update(cache, {data: { newProduct } }) {
            const { getProducts } = cache.readQuery({query: GET_PRODUCTS})
            cache.evict({ broadcast: false });
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getProducts: {...getProducts, newProduct}
                }
            })
        }
    });

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            stock: "",
        },
        validationSchema: yup.object({
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
        }),
        onSubmit: async (values) => {
            console.log(values);
            const { name, price, stock } = values;

            try {
                const { data } = await newProduct({
                    variables: {
                        input: {
                            name,
                            price: Number(price),
                            stock: Number(stock),
                        },
                    },
                });
                Swal.fire({
                    icon: "success",
                    title: "Done!",
                    text: "Product added to Database"
                }).then(result => {
                    if(result.isConfirmed) {
                        router.push('/products')
                    }
                }) 
                
                console.log("data after inserting to mongo", data);
            } catch (error) {
                console.log(error);
                setMsg(error.message);
                setTimeout(() => {
                    setMsg(null);
                }, 2000);
            }
        },
    });

    const showMessage = () => {
        return (
            <p className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto rounded">
                {msg}
            </p>
        );
    };

    return (
        <Layout>
            <h2 className="text-2xl text-gray-800 font-light">New Client</h2>

            {msg && showMessage()}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow px-8 pt-6 pb-8"
                        onSubmit={formik.handleSubmit}
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
                                name="name"
                                id="name"
                                type="name"
                                placeholder="Name Product"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.name && formik.errors.name && (
                            <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.name}</p>
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
                                name="price"
                                id="price"
                                type="price"
                                placeholder="Price Product"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.price && formik.errors.price && (
                            <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.price}</p>
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
                                name="stock"
                                id="stock"
                                type="stock"
                                placeholder="Stock"
                                value={formik.values.stock}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.stock && formik.errors.stock && (
                            <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.stock}</p>
                            </div>
                        )}

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 py-2 cursor-pointer text-white uppercase hover:bg-gray-900 rounded"
                            value="REGISTER PRODUCT"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default NewProduct;
