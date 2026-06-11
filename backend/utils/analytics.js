const calculateAnalytics = (form, responses) => {
  const result = {
    totalSubmissions: responses.length,
    selectAnalytics: {},
    numberAnalytics: {},
  };

  form.fields.forEach((field) => {
    if (field.type === "select") {
      result.selectAnalytics[field.label] = {};
    }

    if (field.type === "number") {
      result.numberAnalytics[field.label] = {
        total: 0,
        count: 0,
        average: 0,
      };
    }
  });

  responses.forEach((res) => {
    for (let key in res.answers) {
      const value = res.answers[key];

      // NUMBER
      if (typeof value === "number") {
        if (result.numberAnalytics[key]) {
          result.numberAnalytics[key].total += value;
          result.numberAnalytics[key].count += 1;
        }
      }

      // SELECT (string)
      if (typeof value === "string") {
        if (result.selectAnalytics[key]) {
          result.selectAnalytics[key][value] =
            (result.selectAnalytics[key][value] || 0) + 1;
        }
      }

      // MULTI SELECT (array)
      if (Array.isArray(value)) {
        value.forEach((v) => {
          result.selectAnalytics[key][v] =
            (result.selectAnalytics[key][v] || 0) + 1;
        });
      }
    }
  });

  // calculate averages
  Object.keys(result.numberAnalytics).forEach((key) => {
    const item = result.numberAnalytics[key];
    if (item.count > 0) {
      item.average = item.total / item.count;
    }
  });

  return result;
};

module.exports = calculateAnalytics;