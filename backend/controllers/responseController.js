const Response = require("../models/Response");
const Form = require("../models/Form");
const validateResponse = require("../utils/validResponse");

// SUBMIT RESPONSE
const submitResponse = async (req, res) => {
  try {
    const { formId, answers } = req.body;

    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({
        message: "Form not found",
      });
    }

    const error = validateResponse(form, answers);

    if (error) {
      return res.status(400).json({
        message: error,
      });
    }

    const response = await Response.create({
      formId,
      answers,
    });

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET RESPONSES OF FORM
const getResponsesByForm = async (req, res) => {
  try {
    const responses = await Response.find({
      formId: req.params.formId,
    });

    res.json(responses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  submitResponse,
  getResponsesByForm,
};