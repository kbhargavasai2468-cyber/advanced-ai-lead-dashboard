import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar
} from "recharts";

const defaultLeads = [
  {
    name: "Rahul",
    budget: 8000000,
    urgency: "High",
    questions: 6,
    siteVisit: "Scheduled",
    agent: "Kiran",
    score: 95,
    status: "Hot"
  },
  {
    name: "Priya",
    budget: 4000000,
    urgency: "Medium",
    questions: 3,
    siteVisit: "Interested",
    agent: "Anil",
    score: 68,
    status: "Warm"
  }
];

export default function App() {
  const [leads, setLeads] = useState(defaultLeads);

  const [form, setForm] = useState({
    name: "",
    budget: "",
    urgency: "Low",
    questions: "",
    siteVisit: "Not Interested",
    agent: ""
  });

  const [filter, setFilter] = useState("All");

  const calculateScore = () => {
    let score = 0;

    if (Number(form.budget) >= 7000000) score += 40;
    else if (Number(form.budget) >= 3000000) score += 25;
    else score += 10;

    if (form.urgency === "High") score += 25;
    else if (form.urgency === "Medium") score += 15;

    if (Number(form.questions) >= 5) score += 25;
    else if (Number(form.questions) >= 2) score += 15;
    else score += 5;

    if (form.siteVisit === "Scheduled") score += 25;
    else if (form.siteVisit === "Interested") score += 15;

    return score;
  };

  const getStatus = (score) => {
    if (score >= 80) return "Hot";
    if (score >= 50) return "Warm";
    return "Cold";
  };

  const addLead = () => {
    const score = calculateScore();
    const status = getStatus(score);

    const newLead = {
      ...form,
      score,
      status
    };

    setLeads([newLead, ...leads]);

    setForm({
      name: "",
      budget: "",
      urgency: "Low",
      questions: "",
      siteVisit: "Not Interested",
      agent: ""
    });
  };

  const filteredLeads =
    filter === "All"
      ? leads
      : leads.filter((lead) => lead.status === filter);

  const pieData = [
    {
      name: "Hot",
      value: leads.filter((l) => l.status === "Hot").length
    },
    {
      name: "Warm",
      value: leads.filter((l) => l.status === "Warm").length
    },
    {
      name: "Cold",
      value: leads.filter((l) => l.status === "Cold").length
    }
  ];

  const barData = [
    {
      month: "Jan",
      leads: 12
    },
    {
      month: "Feb",
      leads: 18
    },
    {
      month: "Mar",
      leads: 24
    },
    {
      month: "Apr",
      leads: 16
    }
  ];

  return (
    <div className="page">
      <div className="topbar">
        <h1>AI Lead Scoring Dashboard</h1>
        <p>Real Estate Admin Analytics Portal</p>
      </div>

      <div className="stats">
        <div className="card">
          <h3>Total Leads</h3>
          <h2>{leads.length}</h2>
        </div>

        <div className="card hot">
          <h3>Hot Leads</h3>
          <h2>{pieData[0].value}</h2>
        </div>

        <div className="card warm">
          <h3>Warm Leads</h3>
          <h2>{pieData[1].value}</h2>
        </div>

        <div className="card cold">
          <h3>Cold Leads</h3>
          <h2>{pieData[2].value}</h2>
        </div>
      </div>

      <div className="layout">
        <div className="glass">
          <h2>Add Lead</h2>

          <input
            placeholder="Customer Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Budget"
            value={form.budget}
            onChange={(e) =>
              setForm({ ...form, budget: e.target.value })
            }
          />

          <select
            value={form.urgency}
            onChange={(e) =>
              setForm({ ...form, urgency: e.target.value })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            placeholder="Questions Asked"
            value={form.questions}
            onChange={(e) =>
              setForm({ ...form, questions: e.target.value })
            }
          />

          <select
            value={form.siteVisit}
            onChange={(e) =>
              setForm({ ...form, siteVisit: e.target.value })
            }
          >
            <option>Not Interested</option>
            <option>Interested</option>
            <option>Scheduled</option>
          </select>

          <input
            placeholder="Assign Agent"
            value={form.agent}
            onChange={(e) =>
              setForm({ ...form, agent: e.target.value })
            }
          />

          <button onClick={addLead}>Generate Lead Score</button>
        </div>

        <div className="glass charts">
          <h2>Lead Distribution</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={90} label>
                <Cell fill="#ff4d4f" />
                <Cell fill="#ffc53d" />
                <Cell fill="#36cfc9" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#7c4dff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass tableBox">
        <div className="tableHeader">
          <h2>Lead Management</h2>

          <select
            className="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Hot</option>
            <option>Warm</option>
            <option>Cold</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Budget</th>
              <th>Questions</th>
              <th>Visit</th>
              <th>Agent</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead, index) => (
              <tr key={index}>
                <td>{lead.name}</td>
                <td>₹ {lead.budget}</td>
                <td>{lead.questions}</td>
                <td>{lead.siteVisit}</td>
                <td>{lead.agent}</td>
                <td>{lead.score}</td>
                <td>
                  <span className={"badge " + lead.status.toLowerCase()}>
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}