import Layout from "../components/layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

const NEW_ACCOUNT = gql`
    mutation newUser($input: UserInput) {
        newUser(input: $input) {
            id
            name
            surname
            email
        }
    }
`;

// Mutation new User

const Register = () => {
    const [msg, setMsg] = useState(null);
    // Hook to register new user. Hooks can only be called inside function
    const [newUser] = useMutation(NEW_ACCOUNT);
    // Create router object for redirecting. Similar to useHistory() in react-router
    const router = useRouter();

    // Form validation
    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Name is required"),
            surname: yup.string().required("Surname is required"),
            email: yup.string().email("Email not valid"),
            password: yup
                .string()
                .required("Password is required")
                .min(6, "Password must contains at least 6 charachters"),
        }),
        onSubmit: async (values) => {
            console.log("Sending...", values);

            const { name, surname, email, password } = values;

            try {
                const { data } = await newUser({
                    variables: {
                        input: {
                            name: name,
                            surname: surname,
                            email: email,
                            password: password,
                        },
                    },
                });
                // User created succesfully
                setMsg(`User created succesfully: ${data.newUser.name}`);
                setTimeout(() => {
                    setMsg(null);
                    router.push('/login')
                }, 3000);
            } catch (error) {
                console.log(error);
                setMsg(error.message.replace("GraphQL Error ", ""));
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
        <>
            <Layout>
                {msg && showMessage()}
                <h1 className="text-center text-2xl text-white font-light">
                    Register
                </h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
                                    id="name"
                                    type="text"
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
                                    id="surname"
                                    type="text"
                                    placeholder="Surname User"
                                    value={formik.values.surname}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {formik.touched.surname && formik.errors.surname && (
                                <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.surname}</p>
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
                                    id="email"
                                    type="email"
                                    placeholder="Email User"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
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
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password User"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {formik.touched.password && formik.errors.password && (
                                <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            )}

                            <input
                                type="submit"
                                value="SIGN UP"
                                className="bg-gray-800 w-full mt-5 py-2 cursor-pointer text-white uppercase hover:bg-gray-600 rounded"
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Register;
