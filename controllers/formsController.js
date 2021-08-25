const Joi = require("joi");
const Form = require("../models/form");

const reqSchema = Joi.object({
  title: Joi.string().required().min(3),
  // createdBy: Joi.string().required().min(3),
  questions: Joi.array(),
});
const addForm = async (req, res) => {
  const { error, value } = reqSchema.validate(req.body);
  if (error) {
    res.status(400).send({ status: "error", message: error.message });
  } else {
    let formValues = {
      title: value.title,
      //NEED TO UPDATE
      createdBy: "vishal",
      createdAt: Date.now(),
      questions: value.questions ? value.questions : [],
    };
    let formToSave = new Form(formValues);
    let result = await formToSave.save();
    res.send(value);
  }
  console.log("ADD FORM");
};
const getForm = async (req, res) => {
  const id = req.params.id;
  const form = await Form.findOne({ _id: id });
  console.log(form);
  if (form) {
    res.status(200).send(form);
  } else {
    res.status(404).send({ status: "error", message: "form not found" });
  }
};
const getForms = async (req, res) => {
  const allForms = await Form.find();
  res.status(200).send(allForms);
};
const updateForm = async (req, res) => {
  //const { error, value } = reqSchema.validate(req.body);
  const id = req.params.id;
  if (id) {
    const form = await Form.findOne({ _id: id });
    if (form) {
      const result = await Form.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        (err, doc) => {
          if (err) {
            res
              .status(500)
              .send({ status: "error", message: "Internal error" });
          } else {
            res
              .status(200)
              .send({ status: "success", message: "updated successfully" });
          }
        }
      );
    } else {
      res.status(404).send({ status: "error", message: "form not found" });
    }
  } else {
    res.status(400).send({ status: "error", message: "id missing" });
  }
};
const deleteForm = (req, res) => {};

const formsController = { addForm, getForm, getForms, updateForm, deleteForm };
module.exports = formsController;
