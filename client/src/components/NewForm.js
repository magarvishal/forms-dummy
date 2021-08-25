import React, { useState } from "react";
import { connect } from "react-redux";
import { addForm } from "../redux/forms/formActions";
import Form from "./Form";

export const NewForm = ({ loading, addForm }) => {
  console.log(loading);
  const formSubmitHandler = (formTitle, questionsData) => {
    console.log("questionsData", questionsData);
    let formToSave = {
      title: formTitle,
      questions: questionsData,
    };
    addForm(formToSave);
  };
  return (
    <div>
      <br />
      <Form title="untitled" questions={[]} onFormSubmit={formSubmitHandler} />
      <br />
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log("check1");
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addForm: (formToSave) => dispatch(addForm(formToSave)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewForm);
