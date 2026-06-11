const Form = require("../models/Form");
const Response = require("../models/Response");
const calculateAnalytics = require("../utils/analytics");

const getAnalytics = async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);
    const responses = await Response.find({
      formId: req.params.formId,
    });

    if (!form) {
      return res.status(404).json({
        message: "Form not found",
      });
    }

    const analytics = calculateAnalytics(
      form,
      responses
    );

    res.json(analytics);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};