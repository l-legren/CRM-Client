import Layout from "../components/layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

const AUTH_USER = gql`
    mutation authUser($input: AuthInput) {
        authUser(input: $input) {
            token
        }
    }
`;

const Login = () => {
    // Set a message in case of error
    const [msg, setMsg] = useState(null);
    // Auth User in GraphQL
    const [authUser] = useMutation(AUTH_USER);

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("Email not valid").required(),
            password: yup
                .string()
                .required()
                .min(6, "Password must contains at least 6 characters"),
        }),
        onSubmit: async (values) => {
            console.log("Sending values", values);
            const { email, password } = values;

            try {
                const { data } = await authUser({
                    variables: {
                        input: {
                            email,
                            password,
                        },
                    },
                });
                setMsg("Validating...");
                // saving token in local storage
                const { token } = data.authUser;
                localStorage.setItem("token", token);

                // Redirecting to clients
                setTimeout(() => {
                    setMsg(null);
                    router.push("/");
                }, 3000);
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
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto rounded">
                <p>{msg}</p>
            </div>
        );
    };

    return (
        <Layout>
            {msg && showMessage()}
            <h1 className="text-center text-2xl text-white font-light">
                Login
            </h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        method="post"
                        onSubmit={formik.handleSubmit}
                    >
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
                                placeholder="Email User"
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
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Password User"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                            className="bg-gray-800 w-full mt-5 py-2 cursor-pointer text-white uppercase hover:bg-gray-600 rounded"
                            value="LOG IN"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
