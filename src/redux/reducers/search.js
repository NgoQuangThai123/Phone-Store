import * as types from '../actionType';


const initialState = ''

const searchReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_PRODUCTS:
            return action.keyword

        default:
            return state;
    }

}

export default searchReducers