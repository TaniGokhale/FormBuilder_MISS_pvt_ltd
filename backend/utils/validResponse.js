const validateResponse = (form, answers) => {
  for (let field of form.fields) {
    const value = answers[field.label];

    if (!value) {
      return `${field.label} is required`;
    }

    if (field.type === "number" && isNaN(value)) {
      return `${field.label} must be number`;
    }

    if (field.type === "select") {
      if (!field.options.includes(value)) {
        return `${field.label} invalid option`;
      }
    }
  }

  return null;
};

module.exports = validateResponse;