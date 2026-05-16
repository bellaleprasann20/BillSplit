import { useState } from "react";

export default function WifiBill() {
  const [custom, setCustom] = useState("");
  const [names, setNames]   = useState("");

  const nameList      = names.split(",").map(n => n.trim()).filter(Boolean);
  const count         = nameList.length || 1;
  const selectedPrice = parseFloat(custom) || 0;
  const share         = (selectedPrice / count).toFixed(2);

  return (
    <div className="bill-box">
      <h2 className="bill-title"> WiFi Bill</h2>

      <label className="bill-label">WiFi Plan Amount (₹)</label>
      <input
        type="number"
        value={custom}
        onChange={e => setCustom(e.target.value)}
        placeholder="Enter your plan amount"
      />

      <label className="bill-label">Names (comma separated)</label>
      <input
        type="text"
        value={names}
        onChange={e => setNames(e.target.value)}
        placeholder="Rahul, Priya, Arjun"
      />

      <div className="total-row">
        <span className="total-label">Total bill</span>
        <span className="total-amount">₹{selectedPrice}/month</span>
      </div>

      {nameList.length > 0 && selectedPrice > 0 && (
        <div className="result-box">
          <h3 className="result-title">Each Person Pays (Equal Split)</h3>
          {nameList.map((n, i) => (
            <div key={i} className="result-row">
              <span className="num">{i + 1}</span>
              <span className="name">{n}</span>
              <span className="amount">₹{share}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}