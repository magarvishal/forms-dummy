import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Input,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon,
  InputGroupText,
  Button,
} from "reactstrap";

const Form = ({ title, questions, onFormSubmit }) => {
  const [formTitle, setFormTitle] = useState(title);
  const [questionsData, setQuestionsData] = useState(questions);
  const [submitButtonStatus, setSubmitButtonStatus] = useState(
    !title.length > 0
  );

  useEffect(() => {
    setFormTitle(title);
    setQuestionsData(questions);
  }, [title, questions]);

  const formTitleHandler = (e) => {
    e.persist();
    setFormTitle(e.target.value);
    e.target.value.length === 0
      ? setSubmitButtonStatus(true)
      : setSubmitButtonStatus(false);
  };

  const questionTitleHandler = (e, index) => {
    let newQuestionsData = questionsData.map((question, indx) => {
      if (indx === index) {
        question.title = e.target.value;
      }
      return question;
    });
    setQuestionsData(newQuestionsData);
  };

  const toggleDropDown = (index) => {
    let newQuestionsData = questionsData.map((question, indx) => {
      if (indx === index) {
        question.dropDownOpen = !question.dropDownOpen;
      }
      return question;
    });
    setQuestionsData(newQuestionsData);
  };

  const selectQuestionType = (e, index) => {
    let newType = "";
    switch (e.target.innerText) {
      case "Multiple Choice":
        newType = "radio";
        break;
      case "Checkbox":
        newType = "checkbox";
        break;
    }
    console.log("INDX & TYPE ", index, newType);
    let newQuestionsData = questionsData.map((question, indx) => {
      if (indx === index) {
        question.type = newType;
      }
      return question;
    });
    setQuestionsData(newQuestionsData);
  };
  const optionChangeHandler = (e, indx) => {
    console.log("e & indx", e.target.value, indx);
  };

  const addAnotherOptionHandler = (index) => {
    let newQuestionsData = questionsData.map((question, indx) => {
      if (indx === index) {
        question.options.push("Option" + (question.options.length + 1));
      }
      return question;
    });
    setQuestionsData(newQuestionsData);
  };
  const removeOptionHandler = (indexQ, option) => {
    // console.log("INDX", indx);
    // let newOptions = questionData.options;
    // newOptions.splice(indx, 1);
    // setQuestionData({ ...questionData, options: newOptions });
    //NEW CODE
    let newQuestionsData = questionsData.map((question, indx) => {
      if (indx === indexQ) {
        let newOptions = question.options.filter((opti) => opti !== option);
        question.options = newOptions;
      }
      return question;
    });
    setQuestionsData(newQuestionsData);
  };
  const addQuestionHandler = () => {
    //ADDING NEW Q
    let newQ = {
      title: "",
      type: "",
      options: [],
      dropDownOpen: false,
    };
    setQuestionsData([...questionsData, newQ]);
  };
  return (
    <>
      <label>Form Title</label>
      <InputGroup size="lg">
        <Input onChange={formTitleHandler} />
      </InputGroup>
      {questionsData.map((questionData, index) => {
        return (
          <div>
            <InputGroup>
              <Input
                onChange={(e) => questionTitleHandler(e, index)}
                value={questionData.title ? questionData.title : ""}
              />
              <InputGroupButtonDropdown
                addonType="append"
                isOpen={questionData.dropDownOpen}
                toggle={() => toggleDropDown(index)}
                disabled={questionData.title.length === 0}
              >
                <DropdownToggle caret>
                  {questionData.type ? questionData.type : "Select option type"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={(e) => selectQuestionType(e, index)}>
                    Multiple Choice
                  </DropdownItem>
                  <DropdownItem onClick={(e) => selectQuestionType(e, index)}>
                    Checkbox
                  </DropdownItem>
                  <DropdownItem>Input</DropdownItem>
                </DropdownMenu>
              </InputGroupButtonDropdown>
            </InputGroup>
            {questionData.type &&
              questionData.options.map((option, indx) => {
                return (
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{ height: "38px" }}>
                        <Input
                          addon
                          type={questionData.type}
                          aria-label="Checkbox for following text input"
                          disabled={true}
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      // placeholder={option}
                      value={option}
                      onChange={(e) => optionChangeHandler(e, indx)}
                      // onBlur={optionBlurHandler}
                    />
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => removeOptionHandler(index, option)}
                    >
                      Remove
                    </Button>
                  </InputGroup>
                );
              })}
            <Button
              color="primary"
              size="sm"
              onClick={() => addAnotherOptionHandler(index)}
              disabled={!questionData.type}
            >
              Add Option
            </Button>
          </div>
        );
      })}
      <br />
      <br />
      <Button color="primary" onClick={addQuestionHandler}>
        Add Question
      </Button>
      <br />
      <br />
      <Button
        color="primary"
        onClick={() => onFormSubmit(formTitle, questionsData)}
        disabled={submitButtonStatus}
      >
        Create Form
      </Button>
    </>
  );
};

export default Form;
