import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoanForm from "./components/LoanForm";
import ResultsCard from "./components/ResultsCard";
import CompareAmounts from "./components/CompareAmounts";
import Header from "./components/Header"; 
import Footer from "./components/Footer";
import "./App.css"; 

function App() {
  const [results, setResults] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const clearResults = () => {
    setResults(null);
    setResetKey(prev => prev + 1);
  };

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <h2>Let's Check Your Eligibility</h2>

              <p className="intro-text">
                Simply enter your details below and we'll instantly estimate your loan eligibility.
              </p>

              <p>
                <strong>Quick, easy, and free.</strong>
              </p>

              <div className="card-grid">
                <section id="LoanForm">
                  <LoanForm
                    key={resetKey}
                    onCalculate={setResults}
                    clearResults={clearResults}
                  />
                </section>

                <section id="ResultsCard">
                  <ResultsCard
                    results={results}
                    clearResults={clearResults}
                  />
                </section>
              </div>
            </div>
          }
        />

        <Route
          path="/compare"
          element={<CompareAmounts />}
        />
      </Routes>
      <Footer/>
    </>
  );
}
export default App;