import { combineReducers } from 'redux';
import productsReducers from './reducers/productReducer';
import usersReducers from './reducers/userReducer';
import searchReducers from './reducers/search';
import { authReducer } from './reducers/authReducer';
import ordersReducers from './reducers/orderReducer';
import commentsReducers from './reducers/commentReducer';

const rootReducer = combineReducers({
    data: productsReducers,
    data2: usersReducers,
    search: searchReducers,
    auth: authReducer,
    order: ordersReducers,
    comment: commentsReducers
})

export default rootReducer;

