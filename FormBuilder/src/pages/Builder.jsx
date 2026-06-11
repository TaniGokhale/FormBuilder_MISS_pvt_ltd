import { useState } from "react";
import API from "../api/api";

function Builder() {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([
      ...fields,
      { label: "", type: "text", options: [] },
    ]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const saveForm = async () => {
    await API.post("/forms", {
      title,
      fields,
    });

    alert("Form Created");
  };

  return (
    <div>
      <h2>Create Form</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addField}>Add Field</button>

      {fields.map((f, i) => (
        <div key={i}>
          <input
            placeholder="Label"
            onChange={(e) =>
              updateField(i, "label", e.target.value)
            }
          />

          <select
            onChange={(e) =>
              updateField(i, "type", e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="select">Select</option>
          </select>
        </div>
      ))}

      <button onClick={saveForm}>Save Form</button>
    </div>
  );
}

export default Builder;