import { useState } from "react";

export default function BillSplitter({ title }) {
  const [bill, setBill]           = useState("");
  const [nameInput, setNameInput] = useState("");
  const [dayInput, setDayInput]   = useState("");
  const [names, setNames]         = useState([]);
  const [days, setDays]           = useState([]);
  const [split, setSplit]         = useState("equal");

  const total = parseFloat(bill) || 0;
  const count = names.length || 1;

  const addName    = () => { if (nameInput.trim()) { setNames(p => [...p, nameInput.trim()]); setNameInput(""); } };
  const addDay     = () => { if (dayInput.trim())  { setDays(p =>  [...p, parseInt(dayInput) || 30]); setDayInput(""); } };
  const removeName = i  => setNames(p => p.filter((_, idx) => idx !== i));
  const removeDay  = i  => setDays(p =>  p.filter((_, idx) => idx !== i));

  const getAmounts = () => {
    if (split === "equal") return names.map(n => ({ name: n, amount: (total / count).toFixed(2) }));
    const totalDays = days.reduce((a, b) => a + b, 0) || 1;
    return names.map((n, i) => ({ name: n, amount: ((days[i] || 30) / totalDays * total).toFixed(2) }));
  };

  return (
    <div className="bill-box">
      <h2 className="bill-title">{title}</h2>

      <label className="bill-label">Total Bill (₹)</label>
      <input type="number" value={bill} onChange={e => setBill(e.target.value)} placeholder="Enter bill amount" />

      <label className="bill-label">Add Name</label>
      <div className="input-add-row">
        <input type="text" value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addName()} placeholder="Enter name" />
        <button className="add-name-btn" onClick={addName}>Add</button>
      </div>
      <div className="name-list">
        {names.map((n, i) => (
          <div key={i} className="name-tag">{i + 1}. {n} <button className="remove-name-btn" onClick={() => removeName(i)}>×</button></div>
        ))}
      </div>

      <label className="bill-label">Split by</label>
      <div className="btn-row">
        <button className={`split-btn ${split === "equal" ? "active" : ""}`} onClick={() => setSplit("equal")}>Equal</button>
        <button className={`split-btn ${split === "days"  ? "active" : ""}`} onClick={() => setSplit("days")}>Days Stayed</button>
      </div>

      {split === "days" && (
        <>
          <label className="bill-label">Add Days Stayed</label>
          <div className="input-add-row">
            <input type="number" value={dayInput} onChange={e => setDayInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addDay()} placeholder="e.g. 25" />
            <button className="add-name-btn" onClick={addDay}>Add</button>
          </div>
          <div className="name-list">
            {days.map((d, i) => (
              <div key={i} className="name-tag">{names[i] || `Person ${i + 1}`}: {d}d <button className="remove-name-btn" onClick={() => removeDay(i)}>×</button></div>
            ))}
          </div>
        </>
      )}

      {names.length > 0 && total > 0 && (
        <div className="result-box">
          <h3 className="result-title">Each Person Pays</h3>
          {getAmounts().map((r, i) => (
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