import axios from 'axios';
import * as types from '../actionType';

export const actLogin = (payload) => {
    return async (dispatch) => {
        const { data: users } = await axios.get(`${process.env.REACT_APP_BE_URL}/users`)
        const existedUserIndex = users.findIndex(todo => (todo.email === payload.email && todo.password === payload.password))
        if (existedUserIndex === -1) {
            dispatch({
                type: types.LOGOUT
            })
            return
        }

        dispatch(actLoginSuccess({
            profile: users[existedUserIndex],
            navigate: payload?.navigate
        }))
    }
};

export const actLoginFail = () => {
    return {
        type: types.LOGIN_FAIL,
    };
};

export const actSetLoadingSuccess = () => {
    return {
        type: types.SET_IS_LOADING,
    };
};

export const actLoginSuccess = (payload) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: payload,
    };
};

export const actGetProfile = (payload) => {
    return {
        type: types.GET_PROFILE,
        payload: payload,
    };
};

export const actGetProfileSuccess = (payload) => {
    return {
        type: types.GET_PROFILE_SUCCESS,
        payload: payload,
    };
};

export const actGetProfileFail = () => {
    return {
        type: types.GET_PROFILE_FAIL,
    };
};

export const actLogout = () => {
    return {
        type: types.LOGOUT,
    };
};
