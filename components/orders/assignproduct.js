import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import OrderContext from "../../context/orders/orderContext";

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

const AssigProduct = () => {
    const [products, setProducts] = useState([]);

    // Import the context so we can use the functions stored in the state
    const orderContext = useContext(OrderContext);
    const { addProducts } = orderContext;
    
    // We set the values on Select in the state products
    const chooseProduct = (product) => {
        setProducts(product);
    };
    // Data from DB
    const { data, loading, error } = useQuery(GET_PRODUCTS);
    
    useEffect(() => {
        // From here we have to pass to OrderState
        addProducts(products);
    }, [products]);
        
    if (loading) return null;  
    const { getProducts } = data;
        
    return (
        <>
            <h2 className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 text-sm font-bold p-2 rounded">
                2. Choose or search for products
            </h2>
            <Select
                className="mt-3"
                options={getProducts}
                isMulti={true}
                onChange={(option) => chooseProduct(option)}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) =>
                    `${option.name} - ${option.stock} available`
                }
                placeholder="Choose product"
                noOptionsMessage={() => "No products found"}
            />
        </>
    );
};

export default AssigProduct;
