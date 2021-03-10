import { gql, useMutation, useQuery } from "@apollo/client";
import { Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Swal from "sweetalert2"

const GET_CLIENT = gql`
    query getClientById($id: ID!) {
        getClientById(id: $id) {
            name
            surname
            email
            company
            phone
        }
    }
`;

const UPDATE_CLIENT = gql`
    mutation updateClient($id: ID!, $input: ClientInput) {
        updateClient(id: $id, input: $input) {
            name
            surname
            email
            company
            phone
        }
    }
`;

const EditClient = () => {
    // Get actual ID
    const router = useRouter();
    // Mutation to fetch data from client
    const {
        query: { id, pid },
    } = router;

    // Get data from client
    const { loading, data, error } = useQuery(GET_CLIENT, {
        variables: {
            id: pid,
        },
    });

    // Get our mutation from GraphQL
    const [updateClient] = useMutation(UPDATE_CLIENT);

    // Schema Validation
    const schemaValidation = yup.object({
        name: yup.string().required("Name is required"),
        surname: yup.string().required("Surname is required"),
        email: yup
            .string()
            .email("Email not valid")
            .required("Email is required"),
        company: yup.string().required("Password is required"),
    });

    if (loading) return "Loading...";

    const { getClientById } = data;

    // Modify client on DB
    const updateInfoClient = async (values) => {
        const { name, surname, company, email, phone } = values;
        try {
            const { data } = await updateClient({
                variables: {
                    id: pid,
                    input: {
                        name,
                        surname,
                        phone,
                        company,
                        email,
                    },
                },
            });
            // console.log("Data after updating Database", data);
            // Alert Dialog
            Swal.fire(
                'Updated',
                'Client updated',
                'success'
            )
            // redirect user
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <h1 className="text-center text-2xl text font-light uppercase">
                Edit Client {getClientById.name} {getClientById.surname}
            </h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <Formik
                        validationSchema={schemaValidation}
                        enableReinitialize
                        initialValues={getClientById}
                        onSubmit={(values) => {
                            updateInfoClient(values);
                        }}
                    >
                        {(props) => {
                            // console.log(props);
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
                                            htmlFor="surname"
                                        >
                                            Surname
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="surname"
                                            type="text"
                                            placeholder="Surname User"
                                            defaultValue={props.values.surname}
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
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            placeholder="Email User"
                                            defaultValue={props.values.email}
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

                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="company"
                                        >
                                            Company
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="company"
                                            type="company"
                                            placeholder="Company User"
                                            defaultValue={props.values.company}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    {props.touched.company &&
                                        props.errors.company && (
                                            <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                                <p className="font-bold">
                                                    Error
                                                </p>
                                                <p>{props.errors.company}</p>
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
                                            id="phone"
                                            type="tel"
                                            placeholder="Phone User"
                                            defaultValue={props.values.phone}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    {props.touched.phone && props.errors.phone && (
                                        <div className="bg-red-100 my-2 p-4 rounded text-md text-red-700 border-l-4 border-red-500">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.phone}</p>
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

export default EditClient;
