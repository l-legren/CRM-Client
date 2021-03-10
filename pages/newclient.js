import Layout from "../components/layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

const NEW_CLIENT = gql`
    mutation newClient($input: ClientInput) {
        newClient(input: $input) {
            id
            name
            surname
            company
            email
            phone
        }
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

const NewClient = () => {

    // Hooks always on top!
    const [msg, setMsg] = useState(null);
    const router = useRouter();
    // Take mutation from GraphQL
    const [newClient] = useMutation(NEW_CLIENT, {
        update(cache, { data: { newClient } }) {
            // Obtain cache object we want to update
            const { getClientsSeller } = cache.readQuery({
                query: GET_CLIENTS,
            });
            // Never modify cache
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    getClientsSeller: [...getClientsSeller, newClient],
                },
            });
        },
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            company: "",
            phone: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Name is required"),
            surname: yup.string().required("Surname is required"),
            email: yup
                .string()
                .email("Email not valid")
                .required("Mail is required"),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const { name, surname, email, company, phone } = values;

            try {
                const { data } = await newClient({
                    variables: {
                        input: {
                            name,
                            surname,
                            email,
                            company,
                            phone,
                        },
                    },
                });

                router.push("/");
            } catch (error) {
                console.log(error);
                setMsg(error.message.replace("GraphQL error ", ""));
                setTimeout(() => {
                    setMsg(null);
                }, 2000);
            }
        },
    });

    const showMessage = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto rounded">
                <p>{msg}</p>
            </div>
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
                                placeholder="name User"
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
                                htmlFor="surname"
                            >
                                Surname
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="surname"
                                id="surname"
                                type="surname"
                                placeholder="Surname User"
                                value={formik.values.surname}
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
                                htmlFor="company"
                            >
                                Company
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="company"
                                id="company"
                                type="company"
                                placeholder="Company"
                                value={formik.values.company}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.company && formik.errors.company && (
                            <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.company}</p>
                            </div>
                        )}

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.email && formik.errors.email && (
                            <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        )}

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="phone"
                            >
                                Phone
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="phone"
                                id="phone"
                                type="tel"
                                placeholder="Phone number"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 py-2 cursor-pointer text-white uppercase hover:bg-gray-900 rounded"
                            value="REGISTER CLIENT"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default NewClient;
