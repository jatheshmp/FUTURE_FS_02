import React, { useEffect, useState } from "react";
import axios from "axios";

function LeadList() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const res = await axios.get("http://localhost:5000/api/leads");
    setLeads(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/leads/${id}`, { status });
    fetchLeads();
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div>
      <h2>Leads</h2>
      {leads.map(lead => (
        <div key={lead._id} className="card">
          <h3>{lead.name}</h3>
          <p>Email: {lead.email}</p>
          <p>Phone: {lead.phone}</p>
          <p>Message: {lead.message}</p>
          <p>Status: {lead.status}</p>

          <select
            value={lead.status}
            onChange={e => updateStatus(lead._id, e.target.value)}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default LeadList;