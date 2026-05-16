import { useState } from "react";
import ElectricityBill from "./ElectricityBill";
import WaterBill from "./WaterBill";
import WifiBill from "./WifiBill";

export default function App() {
  const [tab, setTab] = useState("electricity");

  const tabs = [
    { id: "electricity", label: " Electricity" },
    { id: "water",       label: " Water"       },
    { id: "wifi",        label: " WiFi"         },
  ];

  return (
    <div className="app">
      <div className="navbar">
        <span className="brand">⚡ BillSplit</span>
        <div className="tab-group">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`tab-btn ${tab === t.id ? "active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="content">
        {tab === "electricity" && <ElectricityBill />}
        {tab === "water"       && <WaterBill />}
        {tab === "wifi"        && <WifiBill />}
      </div>
    </div>
  );
}