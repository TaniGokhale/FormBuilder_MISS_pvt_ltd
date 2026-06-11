import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { getCache, setCache } from "../utils/cache";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Analytics() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        const cacheKey = `analytics_${id}`;
        const cached = getCache(cacheKey);

        if (cached) {
          setData(cached);
          setLoading(false);
          return;
        }

        const res = await API.get(`/analytics/${id}`);

        setData(res.data);
        setCache(cacheKey, res.data);
      } catch (err) {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  const selectCharts = useMemo(() => {
    return Object.entries(data?.selectAnalytics || {}).map(
      ([field, values]) => ({
        field,
        values: Object.entries(values).map(([name, value]) => ({
          name,
          value,
        })),
      })
    );
  }, [data]);

  const numberCharts = useMemo(() => {
    return Object.entries(data?.numberAnalytics || {}).map(
      ([field, value]) => ({
        name: field,
        value: value.average,
      })
    );
  }, [data]);

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data) return <div className="center">No Data Found</div>;

  return (
    <div className="container">

      <div className="grid">
        <div className="card kpi">
          <h3>Total Responses</h3>
          <p>{data.totalSubmissions}</p>
        </div>

        <div className="card kpi">
          <h3>Select Fields</h3>
          <p>{Object.keys(data.selectAnalytics).length}</p>
        </div>

        <div className="card kpi">
          <h3>Number Fields</h3>
          <p>{Object.keys(data.numberAnalytics).length}</p>
        </div>
      </div>

      <h3 className="section-title">Select Distribution</h3>

      <div className="grid">
        {selectCharts.map((chart, i) => (
          <div key={i} className="card">
            <h4>{chart.field}</h4>

            <PieChart width={250} height={250}>
              <Pie
                data={chart.values}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {chart.values.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        ))}
      </div>

      <h3 className="section-title">Average Values</h3>

      <div className="grid">
        {numberCharts.map((item, i) => (
          <div key={i} className="card">
            <h4>{item.name}</h4>

            <BarChart width={250} height={200} data={[item]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" />
            </BarChart>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;