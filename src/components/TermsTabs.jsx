import { useState } from "react";

export default function TermsTabs() {
  const [activeTab, setActiveTab] = useState("service");

  const tabs = [
    {
      id: "service",
      title: "Service Availability",
      content: `NovaNet is committed to providing reliable and uninterrupted internet services. However, service availability is dependent on external infrastructure and utility providers beyond our direct control.`,
    },
    {
      id: "power",
      title: "Power Supply Dependency",
      content: `NovaNet’s network operations and equipment rely primarily on electricity supplied by the Electricity Company of Ghana (ECG). In the event of power outages, load shedding, voltage instability, grid maintenance, national power emergencies, or any interruption in electricity supply from ECG, NovaNet services may be temporarily disrupted, slowed, or unavailable.`,
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content: `NovaNet shall not be held liable for service interruptions, performance delays, data loss, or temporary unavailability resulting from power failures from ECG, natural disasters, government directives, infrastructure damage, or events beyond our reasonable control (Force Majeure). No refunds, credits, or compensation shall be guaranteed for service interruptions caused by third-party power supply issues.`,
    },
    {
      id: "restoration",
      title: "Emergency Restoration",
      content: `In the event of power restoration, NovaNet will make reasonable efforts to restore services as quickly as possible. Restoration times may vary depending on the stability of the electricity supply.`,
    },
    {
      id: "acknowledgment",
      title: "Customer Acknowledgment",
      content: `By using NovaNet services, the customer acknowledges and agrees that internet availability is dependent on national power infrastructure and external utility providers.`,
    },
  ];

  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="benefit-block_one-inner">
          <div className="mt-20">
            <h5>Terms & Conditions (Power & Service Availability Clause)</h5><br/><br/>
          </div>
          {/* Tabs */}
          <div className="d-flex gap-2 mb-3 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`btn ${
                  activeTab === tab.id ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-3 border rounded">
            {tabs.map(
              (tab) =>
                activeTab === tab.id && (
                  <div key={tab.id}>
                    <h5>{tab.title}</h5>
                    <p>{tab.content}</p>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
