import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const GET_USER = gql`
    query getUser {
        getUser {
            id
            name
            surname
        }
    }
`;

const Header = () => {
    const router = useRouter();
    const { data, loading, error } = useQuery(GET_USER);

    // Important not to fetch data before we get the results
    if (loading) return "Loading...";

    // Check if we come back without token
    if (!data.getUser) {
        return router.push("/login");
    }


    const { name } = data.getUser;

    const handleLogOut = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <>
            <div className="flex justify-between">
                <p className="mr-2 py-1 text-xl">Hi {name}!</p>
                <button
                    onClick={handleLogOut}
                    type="button"
                    className="shadow-xl transition duration-300 font-bold uppercase bg-blue-800 text-white rounded py-1 px-2 w-full sm:w-auto hover:bg-blue-800"
                >
                    Log Out
                </button>
            </div>
            <div className="bg-blue-800 h-1 w-full my-2"></div>
        </>
    );
};

export default Header;
