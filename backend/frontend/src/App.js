import React from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

function App() {
  return (
    <div className="container">
      <h1>Simple CRM Lead Manager</h1>
      <LeadForm />
      <LeadList />
    </div>
  );
}

export default App;