import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/forms").then((res) => {
      setForms(res.data);
    });
  }, []);

  return (
    <div>
      <h2>All Forms</h2>

      <button onClick={() => navigate("/builder")}>
        Create Form
      </button>

      {forms.map((f) => (
        <div key={f._id}>
          <h3>{f.title}</h3>

          <button
            onClick={() =>
              navigate(`/form/${f._id}`)
            }
          >
            Open Form
          </button>
          <button
  onClick={() =>
    navigate(`/analytics/${f._id}`)
  }
>
  View Analytics
</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;