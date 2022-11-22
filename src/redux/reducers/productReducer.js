import * as types from '../actionType';


const initialState = {
    products: [],
    product: {},
    loading: true
}

const productsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            }
        case types.DELETE_PRODUCTS:
            return {
                ...state,
                loading: false,
            }
        case types.ADD_PRODUCTS:
            return {
                ...state,
                loading: false
            }
        case types.GET_SINGLE_PRODUCTS:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case types.UPDATE_PRODUCTS:
            return {
                ...state,
                loading: false
            }


        default:
            return state;
    }

}

export default productsReducers