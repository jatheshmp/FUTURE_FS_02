import React, { useState } from "react";
import axios from "axios";

function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/leads", form);
    alert("Lead Submitted");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />
      <button type="submit">Submit Lead</button>
    </form>
  );
}

export default LeadForm;