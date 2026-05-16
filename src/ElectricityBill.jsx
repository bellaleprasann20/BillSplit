import { useState } from "react";

export default function ElectricityBill() {
  const [bill, setBill]   = useState("");
  const [names, setNames] = useState("");
  const [days, setDays]   = useState("");
  const [split, setSplit] = useState("equal");

  const nameList = names.split(",").map(n => n.trim()).filter(Boolean);
  const dayList  = days.split(",").map(d => parseInt(d.trim()) || 30);
  const count    = nameList.length || 1;
  const total    = parseFloat(bill) || 0;

  const getAmounts = () => {
    if (split === "equal") {
      return nameList.map(n => ({ name: n, amount: (total / count).toFixed(2) }));
    }
    const totalDays = dayList.reduce((a, b) => a + b, 0) || 1;
    return nameList.map((n, i) => ({
      name: n,
      amount: ((dayList[i] || 30) / totalDays * total).toFixed(2),
    }));
  };

  const results = getAmounts();

  return (
    <div className="bill-box">
      <h2 className="bill-title"> Electricity Bill</h2>

      <label className="bill-label">Total Bill (₹)</label>
      <input
        type="number"
        value={bill}
        onChange={e => setBill(e.target.value)}
        placeholder="Enter bill amount"
      />

      <label className="bill-label">Names (comma separated)</label>
      <input
        type="text"
        value={names}
        onChange={e => setNames(e.target.value)}
        placeholder="Rahul, Priya, Arjun"
      />

      <label className="bill-label">Split by</label>
      <div className="btn-row">
        <button
          className={`split-btn ${split === "equal" ? "active" : ""}`}
          onClick={() => setSplit("equal")}
        >
          Equal
        </button>
        <button
          className={`split-btn ${split === "days" ? "active" : ""}`}
          onClick={() => setSplit("days")}
        >
          Days Stayed
        </button>
      </div>

      {split === "days" && (
        <>
          <label className="bill-label">Days stayed (comma separated)</label>
          <input
            type="text"
            value={days}
            onChange={e => setDays(e.target.value)}
            placeholder="30, 25, 20"
          />
        </>
      )}

      {nameList.length > 0 && total > 0 && (
        <div className="result-box">
          <h3 className="result-title">Each Person Pays</h3>
          {results.map((r, i) => (
            <div key={i} className="result-row">
              <span className="num">{i + 1}</span>
              <span className="name">{r.name}</span>
              <span className="amount">₹{r.amount}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}