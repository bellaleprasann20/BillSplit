import { useState } from "react";
import BillSplitter from "./BillSplitter";

const TABS = [
  { id: "electricity", label: "⚡ Electricity", title: "⚡ Electricity Bill" },
  { id: "water",       label: "💧 Water",       title: "💧 Water Bill"       },
  { id: "wifi",        label: "📶 WiFi",         title: "📶 WiFi Bill"        },
];

export default function App() {
  const [tab, setTab] = useState("electricity");
  const current = TABS.find(t => t.id === tab);

  return (
    <div className="app">
      <div className="navbar">
        <span className="brand">⚡ BillSplit</span>
        <div className="tab-group">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`tab-btn ${tab === t.id ? "active" : ""}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="content">
        <BillSplitter key={tab} title={current.title} />
      </div>
    </div>
  );
}