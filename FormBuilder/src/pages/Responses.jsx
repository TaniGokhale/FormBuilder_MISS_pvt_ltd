import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function Responses() {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    API.get(`/responses/${id}`).then((res) => {
      setResponses(res.data);
    });
  }, [id]);

  if (!responses.length) return <div>No Responses</div>;
{responses.map((r) => (
  <tr key={r._id}>
    <td>{new Date(r.createdAt).toLocaleString()}</td>
    <td>
      {Object.entries(r.answers).map(([k, v]) => (
        <div key={k}>
          {k} : {Array.isArray(v) ? v.join(", ") : v}
        </div>
      ))}
    </td>
  </tr>
))}
  return (
    <div>
      <h2>Responses</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Submission Time</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {responses.map((r) => (
            <tr key={r._id}>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
              <td>
                {Object.entries(r.answers).map(([k, v]) => (
                  <div key={k}>
                    <b>{k}</b>: {String(v)}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Responses;