import { INFO_USER_KEY } from '../../constants/constants';
import * as types from '../actionType';

const initialState = {
    profile: {},
    isLoggIn: false,
    isAuthenticated: false,
    isLoading: false,
    notif: '',
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS: {
            const { profile, navigate } = action.payload;
            state = {
                profile: profile,
                isLoggIn: true,
                isLoading: false,
                notif: 'loginSucess',
                isAuthenticated: profile?.role
            };
            localStorage.setItem(INFO_USER_KEY, JSON.stringify(profile))
            if (profile?.role) {
                !!navigate && navigate('/admin/dashboard')
            } else !!navigate && navigate('/')
            return { ...state };
        }
        case types.LOGOUT: {
            localStorage.removeItem(INFO_USER_KEY)
            return { ...initialState };
        }

        default:
            return state;
    }
};
