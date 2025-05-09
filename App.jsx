import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const mockInterests = ["Tech", "Fashion", "Fitness", "Gaming", "Finance"];

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("user", "demo@example.com");
    navigate("/dashboard");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input placeholder="Email" className="block w-full mb-3 border p-2 rounded" required />
        <input type="password" placeholder="Password" className="block w-full mb-3 border p-2 rounded" required />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
};

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [form, setForm] = useState({
    name: "",
    ageRange: "18-25",
    location: "",
    interests: [],
    image: "",
    adCopy: ""
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm({ ...form, image: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCampaign = {
      ...form,
      date: new Date().toLocaleString(),
      status: "Pending",
      impressions: Math.floor(Math.random() * 10000),
      ctr: (Math.random() * 5).toFixed(2) + "%"
    };
    setCampaigns([...campaigns, newCampaign]);
    setForm({ name: "", ageRange: "18-25", location: "", interests: [], image: "", adCopy: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Create New Campaign</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Campaign Name"
            className="border p-2 rounded"
            required
          />
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Location"
            className="border p-2 rounded"
          />
          <select
            value={form.ageRange}
            onChange={(e) => setForm({ ...form, ageRange: e.target.value })}
            className="border p-2 rounded"
          >
            <option>18-25</option>
            <option>26-35</option>
            <option>36-50</option>
          </select>
          <select
            multiple
            value={form.interests}
            onChange={(e) => setForm({ ...form, interests: Array.from(e.target.selectedOptions, o => o.value) })}
            className="border p-2 rounded h-24"
          >
            {mockInterests.map((i) => <option key={i}>{i}</option>)}
          </select>
          <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
          {form.image && <img src={form.image} alt="Banner Preview" className="w-32 h-20 object-cover rounded" />}
          <textarea
            placeholder="Ad Copy"
            value={form.adCopy}
            onChange={(e) => setForm({ ...form, adCopy: e.target.value })}
            className="border p-2 rounded"
          />
          <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Submit Campaign</button>
        </form>
      </div>

      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-bold mb-2">Campaigns</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Targeting</th>
                <th className="p-2 text-left">Impressions</th>
                <th className="p-2 text-left">CTR</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.date}</td>
                  <td className="p-2">{c.status}</td>
                  <td className="p-2">{c.ageRange}, {c.location}, {c.interests.join(", ")}</td>
                  <td className="p-2">{c.impressions}</td>
                  <td className="p-2">{c.ctr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default App;