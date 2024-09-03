import "./App.css";
import PayPalButton from "./paypal";
import { useState } from "react";

function App() {
  const [checkOut, setCheckOut] = useState(false);

  const handleRequestURL = (data) => {
    console.log("Request URL triggered", data);
  };

  const handleCancelURL = (data) => {
    console.log("Payment cancelled", data);
  };

  const handleApproveURL = async (order) => {
    console.log("Payment approved, processing...", order);
  };

  return (
    <div className="App">
      {checkOut ? (
        <div>
          <PayPalButton onRequestURL={handleRequestURL} onCancelURL={handleCancelURL} onApproveURL={handleApproveURL} />
        </div>
      ) : (
        <button onClick={() => setCheckOut(true)}>CheckOut</button>
      )}
    </div>
  );
}

export default App;