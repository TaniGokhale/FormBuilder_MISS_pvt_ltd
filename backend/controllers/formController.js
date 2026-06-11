const Form = require("../models/Form");

const createForm = async (req, res) => {
  try {
    const { title, description, fields } = req.body;

    if (!title || !fields) {
      return res.status(400).json({
        message: "Title and fields are required",
      });
    }

    const form = await Form.create({
      title,
      description,
      fields,
    });

    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({
        message: "Form not found",
      });
    }

    res.json(form);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createForm,
  getForms,
  getFormById,
};