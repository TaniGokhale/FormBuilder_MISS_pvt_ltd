import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function Form() {
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/forms/${id}`);
        setForm(res.data);
      } catch (err) {
        setError("Failed to load form");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = useCallback((label, value) => {
    setAnswers((prev) => ({
      ...prev,
      [label]: value,
    }));
  }, []);

  const submit = async () => {
    try {
      await API.post("/responses", {
        formId: id,
        answers,
      });

      alert("Submitted successfully");
      setAnswers({});
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting form");
    }
  };

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!form) return <div className="center">No Form Found</div>;

  return (
    <div className="container">
      <div className="card">
        <h2>{form.title}</h2>

        {form.fields.map((field, i) => (
          <div key={i} className="field">
            <label>{field.label}</label>

            {field.type === "select" ? (
              <select
                onChange={(e) =>
                  handleChange(field.label, e.target.value)
                }
              >
                <option value="">Select</option>
                {field.options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type === "number" ? "number" : "text"}
                onChange={(e) =>
                  handleChange(field.label, e.target.value)
                }
              />
            )}
          </div>
        ))}

        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default Form;