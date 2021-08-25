import {
  GET_FORMS_REQ,
  GET_FORMS_SUCCESS,
  ADD_FORMS_SUCCESS,
  GET_FORM_SUCCESS,
} from "./formActionTypes";

const initialState = { forms: [], loading: false };
const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORMS_REQ:
      return { ...state, loading: true };
    case GET_FORMS_SUCCESS:
      return { ...state, loading: false, forms: action.payload };
    case ADD_FORMS_SUCCESS:
      return { ...state, loading: false };
    case GET_FORM_SUCCESS:
      return { ...state, loading: false, form: action.payload };
    default:
      return state;
  }
};

export default formsReducer;
