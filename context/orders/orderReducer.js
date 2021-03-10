import {
    CHOOSE_CLIENT,
    CHOOSE_PRODUCT,
    QUANTITY_PRODUCTS
} from "../../types";

const OrderReducer = (state, action) => {
    switch(action.type) {

        case CHOOSE_CLIENT:
            return {
                ...state,
                client: action.payload
            }

        case CHOOSE_PRODUCT:
            return {
                ...state,
                products: action.payload
            }

        default: 
            return state
    }
}

export default OrderReducer