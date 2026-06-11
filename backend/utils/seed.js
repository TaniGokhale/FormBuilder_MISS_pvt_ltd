const Form = require("../models/Form");
const Response = require("../models/Response");

const seedData = async () => {
  await Form.deleteMany();
  await Response.deleteMany();

  const jobForm = await Form.create({
    title: "Job Application Form",
    fields: [
      { label: "Name", type: "text" },
      { label: "Email", type: "text" },
      { label: "Experience", type: "number" },
      { label: "Skills", type: "select", options: ["React", "Node", "MongoDB"] },
      { label: "Role", type: "select", options: ["Dev", "QA"] },
    ],
  });

  const eventForm = await Form.create({
    title: "Event Registration Form",
    fields: [
      { label: "Full Name", type: "text" },
      { label: "Contact", type: "text" },
      { label: "Ticket Type", type: "select", options: ["VIP", "Standard"] },
      { label: "Tickets", type: "number" },
      { label: "Days", type: "select", options: ["Day1", "Day2"] },
    ],
  });

  const feedbackForm = await Form.create({
    title: "Feedback Form",
    fields: [
      { label: "Customer Name", type: "text" },
      { label: "Rating", type: "number" },
      { label: "Service", type: "select", options: ["Food", "Support"] },
      { label: "Feedback", type: "text" },
      { label: "Recommend", type: "select", options: ["Yes", "No"] },
    ],
  });

  await Response.insertMany([
    {
      formId: jobForm._id,
      answers: { Name: "A", Email: "a@test.com", Experience: 2, Skills: ["React"], Role: "Dev" },
    },
    {
      formId: jobForm._id,
      answers: { Name: "B", Email: "b@test.com", Experience: 3, Skills: ["Node"], Role: "QA" },
    },
    {
      formId: eventForm._id,
      answers: { "Full Name": "C", Contact: "123", "Ticket Type": "VIP", Tickets: 2, Days: ["Day1"] },
    },
    {
      formId: feedbackForm._id,
      answers: { "Customer Name": "D", Rating: 5, Service: "Food", Feedback: "Good", Recommend: "Yes" },
    },
    {
      formId: feedbackForm._id,
      answers: { "Customer Name": "E", Rating: 4, Service: "Support", Feedback: "Ok", Recommend: "Yes" },
    },
  ]);

  console.log("Seed Done");
};

module.exports = seedData;