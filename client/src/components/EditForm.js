import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getForm } from "../redux/forms/formActions";
import { useHistory, Link } from "react-router-dom";
import Form from "./Form";
import { updateForm } from "../redux/forms/formActions";

const EditForm = ({ form, loading, getForm, updateForm }) => {
  const history = useHistory();
  const [id, setId] = useState(history.location.pathname.split("/forms/")[1]);
  useEffect(() => {
    console.log(id);
    if (id) {
      let id = history.location.pathname.split("/forms/")[1];
      console.log("id", id);
      getForm(id);
    }
  }, [id]);
  console.log("history--", form);
  const formSubmitHandler = (formTitle, questionsData) => {
    console.log("questionsData", questionsData);
    let formToSave = {
      id: form._id,
      title: formTitle,
      questions: questionsData,
    };
    updateForm(formToSave);
  };
  return (
    <>
      <Form
        title={form ? form.title : "untitled"}
        questions={form ? form.questions : []}
        onFormSubmit={formSubmitHandler}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    form: state.form,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getForm: (id) => dispatch(getForm(id)),
    updateForm: (formToSave) => dispatch(updateForm(formToSave)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
