import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [loadPayBill, setLoadPayBill] = useState(false);
  const [loadTable, setLoadTable] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: ""
  });
  const [bill, setBill] = useState("");
  const [paid, setPaid] = useState("");
  const notes = [2000, 500, 200, 100, 50, 20, 10, 5, 1];
  const [notesCount, setNotesCount] = useState(new Array(9).fill(0));

  function calculateNotes(amount) {
    let arr = new Array(9).fill(0);
    for (let i = 0; i < arr.length; i++) {
      if (amount >= arr[i]) {
        arr[i] = Math.floor(amount / notes[i]);
        // setNotesCount(notesCount[i] = Math.floor(amount / notes[i]));
        // notesCount[i] = Math.floor(amount / notes[i]);
        amount = amount - notes[i] * arr[i];
      }
    }
    setNotesCount(arr);
    arr = [];
  }

  function inputHandler(e) {
    if (e.target.name === "bill") {
      setBill(e.target.value);
    } else {
      setPaid(e.target.value);
    }
  }
  function payBillHandler() {
    if (parseInt(bill) >= 1) {
      setLoadPayBill(true);
      setError({ status: false, message: "" });
    } else {
      setLoadPayBill(false);
      setError({
        status: true,
        message: "Bill amount should be greater than 1"
      });
    }
  }

  const amountPayHandler = () => {
    if (!paid || parseInt(paid) < parseInt(bill)) {
      setError({
        status: true,
        message: "Payment Should be greater than bill"
      });
      setLoadTable(false);
    } else {
      calculateNotes(paid - bill);
      setError({ status: false, message: "" });
      setLoadTable(true);
    }
    // console.log(notesCount)
  };
  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Cash Register Manager</h1>
          <p>
            Enter the bill amount and cash given by the customer and know
            minimum number of notes to return.
          </p>
        </div>
        <div className="bill">
          <label>Enter Bill Amount : </label>
          <input name="bill" value={bill} onChange={inputHandler} />
          <button onClick={payBillHandler}>Pay Bill</button>
        </div>
        {loadPayBill ? (
          <div className="bill bill_paid">
            <label>Enter Bill Paid : </label>
            <input name="paid" value={paid} onChange={inputHandler} />
            <button onClick={amountPayHandler}>Get Remaining Amount</button>
          </div>
        ) : null}
        {error.status ? <div className="error">{error.message}</div> : null}
        {loadTable ? (
          <div className="notes_data">
            <table id="customers">
              <tbody>
                <tr>
                  <th>Currency Value</th>
                  <th>Currency Count</th>
                </tr>
                {notes.map((val, index) => {
                  return (
                    <tr key={index}>
                      <td>{val}</td>
                      <td>{notesCount[index]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </>
  );
}
