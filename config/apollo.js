import {
    ApolloClient,
    createHttpLink,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import fetch from "node-fetch";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/",
    fetch,
});

const authLink = setContext((_, { headers }) => {

    // We take now the token from localStorage
    const token = localStorage.getItem("token");

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        },
    };
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

export default client;
