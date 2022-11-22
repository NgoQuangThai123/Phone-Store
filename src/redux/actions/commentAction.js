import * as types from '../actionType';
import axios from 'axios';

const getComments = (comments) => ({
    type: types.GET_COMMENTS,
    payload: comments
});

const commentDelete = () => ({
    type: types.DELETE_COMMENTS
})
const commentAdd = () => ({
    type: types.ADD_COMMENTS
})
const getComment = (comment) => ({
    type: types.GET_SINGLE_COMMENTS,
    payload: comment,
})
const commentUpdate = (comment) => ({
    type: types.UPDATE_COMMENTS,
    payload: comment
})


export const loadComments = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_BE_URL}/comments`).then((resp) => {
            dispatch(getComments(resp.data));
        }).catch(error => console.log(error))
    };

};

export const deleteComment = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_BE_URL}/comments/${id}`).then((resp) => {
            dispatch(commentDelete());
            dispatch(loadComments());
        }).catch(error => console.log(error))
    };

};

export const addComment = (comment) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_BE_URL}/comments`, comment).then((resp) => {
            dispatch(loadComments());
            // dispatch(loadUsers());
        }).catch(error => console.log(error))
    };

};

export const getSingleComment = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_BE_URL}/comments/${id}`).then((resp) => {
            console.log("resp", resp);
            dispatch(getComment(resp.data));
        }).catch(error => console.log(error))
    };

};

export const updateComment = (comments, id) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_BE_URL}/comments/${id}`, comments).then((resp) => {
            console.log("resp", resp);
            dispatch(commentUpdate());
        }).catch(error => console.log(error))
    };

};