import {
  GET_FORMS_REQ,
  GET_FORMS_SUCCESS,
  ADD_FORMS_SUCCESS,
  GET_FORM_SUCCESS,
} from "./formActionTypes";
import axios from "axios";
import config from "../../config";

const getFormRequest = () => {
  return {
    type: GET_FORMS_REQ,
  };
};

const getFormsSuccess = (forms) => {
  return {
    type: GET_FORMS_SUCCESS,
    payload: forms,
  };
};
const getFormSuccess = (form) => {
  return {
    type: GET_FORM_SUCCESS,
    payload: form,
  };
};

const getFormFailure = () => {
  return {
    type: GET_FORMS_REQ,
  };
};
const addFormSuccess = () => {
  return {
    type: ADD_FORMS_SUCCESS,
  };
};

export const getForms = () => {
  return function (dispatch) {
    dispatch(getFormRequest);
    axios.get(config.severURL + "/forms").then((resp) => {
      dispatch(getFormsSuccess(resp.data));
    });
    //ADD FAILURE CASE
  };
};

export const getForm = (id) => {
  return function (dispatch) {
    dispatch(getFormRequest);
    axios.get(config.severURL + `/forms/${id}`).then((resp) => {
      dispatch(getFormSuccess(resp.data));
    });
    //ADD FAILURE CASE
  };
};

export const addForm = (formData) => {
  return function (dispatch) {
    dispatch(getFormRequest);
    axios.post(config.severURL + "/forms", formData).then((resp) => {
      dispatch(addFormSuccess(resp.data));
    });
  };
};

export const updateForm = (formData) => {
  return function (dispatch) {
    dispatch(getFormRequest);
    axios
      .put(config.severURL + `/forms/${formData.id}`, formData)
      .then((resp) => {
        dispatch(addFormSuccess(resp.data));
      });
  };
};
