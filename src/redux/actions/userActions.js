import * as types from '../actionType';
import axios from 'axios';

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
});

const userDelete = () => ({
    type: types.DELETE_USERS
})
const userAdd = () => ({
    type: types.ADD_USERS
})
const getUser = (user) => ({
    type: types.GET_SINGLE_USERS,
    payload: user,
})
const userUpdate = (user) => ({
    type: types.UPDATE_USERS,
    payload: user
})


export const loadUsers = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_BE_URL}/users`).then((resp) => {
            dispatch(getUsers(resp.data));
        }).catch(error => console.log(error))
    };

};

export const deleteUser = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_BE_URL}/users/${id}`).then((resp) => {
            dispatch(userDelete());
            dispatch(loadUsers());
        }).catch(error => console.log(error))
    };

};

export const addUser = (user) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_BE_URL}/users`, user).then((resp) => {
            dispatch(userAdd());
            // dispatch(loadUsers());
        }).catch(error => console.log(error))
    };

};

export const getSingleUser = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_BE_URL}/users/${id}`).then((resp) => {
            dispatch(getUser(resp.data));
        }).catch(error => console.log(error))
    };

};

export const updateUser = (user, id) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_BE_URL}/users/${id}`, user).then((resp) => {
            dispatch(userUpdate());
        }).catch(error => console.log(error))
    };

};
