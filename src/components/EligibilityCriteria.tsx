import React from "react";
import "./EligibilityCriteria.css";

const criteria = [
  {
    icon: "🎂",
    title: "Age",
    value: "21-24 Years",
    description: "21-24 Years",
    highlight: "21",
  },
  {
    icon: "💼",
    title: "Job Status",
    value: "Not Employed Full Time",
    description: "Not Employed Full Time",
  },
  {
    icon: "🎓",
    title: "Education",
    value: "Not Enrolled Full Time",
    description: "Not Enrolled Full Time",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family (Self/ Spouse / Parents)",
    value: "",
    description: (
      <ul style={{margin:0, paddingLeft:20}}>
        <li>No one is Earning more than ₹8 Lakhs PA</li>
        <li>No Member has a Govt. Job</li>
      </ul>
    ),
  },
];

const EligibilityCriteria = () => (
  <section className="eligibility-section">
    <h2 className="eligibility-title">Eligibility Criteria</h2>
    <div className="eligibility-cards">
      {criteria.map((c, i) => (
        <div className="eligibility-card" key={i}>
          <div className="eligibility-icon">{c.icon}</div>
          <div className="eligibility-card-title">{c.title}</div>
          {c.highlight && (
            <div className="eligibility-highlight">{c.highlight}</div>
          )}
          <div className="eligibility-desc">{c.description}</div>
        </div>
      ))}
    </div>
  </section>
);

export default EligibilityCriteria;
