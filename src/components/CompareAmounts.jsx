import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { calculateLoan } from "../utils/loanCalculator";

const MIN_AMOUNT = 5000;
const MAX_AMOUNT = 500000;
const APPLY_URL =
  "https://www.capitecbank.co.za/personal/credit/personal-estimate/#/credit-application-information";

const DECISION_UI = {
  Approved: { icon: "✓", label: "Approved", className: "approved" },
  Review: { icon: "!", label: "Needs review", className: "review" },
  Declined: { icon: "✕", label: "Not eligible", className: "declined" },
};

const formatZAR = (value) =>
  value.toLocaleString("en-ZA", { style: "currency", currency: "ZAR" });

// Same formatting as the loan form for numbers

const formatNumber = (value) =>
  value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// Starting suggestions: 80%, 60% and 40% of the original amount
const suggestAmount = (amount, fraction) =>
  Math.max(MIN_AMOUNT, Math.round((amount * fraction) / 1000) * 1000);

function CompareAmounts() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const results = state?.results;

  const [amounts, setAmounts] = useState(() =>
    results
      ? [0.8, 0.6, 0.4].map((f) =>
          formatNumber(String(suggestAmount(results.loanAmount, f)))
        )
      : ["", "", ""]
  );

  // Reached /compare directly, so there are no details to compare against
  if (!results) {
    return (
      <div className="compare-page">
        <h1>Compare Loan Amounts</h1>
        <p className="compare-subtitle">
          Please check your eligibility first so we can compare amounts
          against your income and expenses.
        </p>
        <div className="compare-buttons">
          <button className="compare-btn" onClick={() => navigate("/")}>
            Check Eligibility
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (index, value) => {
    setAmounts((prev) =>
      prev.map((a, i) => (i === index ? formatNumber(value) : a))
    );
  };

  const getResult = (value) => {
    if (value.trim() === "") return { status: "empty" };

    const amount = Number(value.replace(/\s/g, ""));

    if (amount < MIN_AMOUNT) {
      return { status: "invalid", message: "Minimum loan amount is R5 000" };
    }
    if (amount > MAX_AMOUNT) {
      return { status: "invalid", message: "Maximum loan amount is R500 000" };
    }

    const outcome = calculateLoan({
      income: results.income,
      expenses: results.expenses,
      loanAmount: amount,
      interestRate: results.interestRate,
      loanTerm: results.loanTerm,
    });

    return { status: "ok", outcome };
  };

  return (
    <div className="compare-page">
      <h1>Compare Loan Amounts</h1>

      <p className="compare-subtitle">
        See how different loan amounts affect your eligibility
      </p>

      <p className="compare-context">
        Based on your disposable income (what is left from your income) of{" "}
        <strong>{formatZAR(results.disposableIncome)}</strong>, an interest
        rate of <strong>{results.interestRate}%</strong> over{" "}
        <strong>{results.loanTerm} months</strong>.
      </p>

      <h3>Enter amounts to compare</h3>

      <div className="compare-inputs">
        {amounts.map((value, index) => (
          <div className="input-wrap" key={index}>
            <span className="currency-symbol">R</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder={`Amount ${index + 1}`}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="compare-results">
        {amounts.map((value, index) => {
          const result = getResult(value);
          const ui =
            result.status === "ok" ? DECISION_UI[result.outcome.decision] : null;

          return (
            <div
              className={`compare-card ${ui ? ui.className : ""}`}
              key={index}
            >
              <h4>Amount {index + 1}</h4>

              {result.status === "empty" && (
                <p className="awaiting">Awaiting input</p>
              )}

              {result.status === "invalid" && (
                <p className="error">{result.message}</p>
              )}

              {result.status === "ok" && (
                <>
                  <p>
                    Monthly instalment:{" "}
                    <strong>{formatZAR(result.outcome.monthlyPayment)}</strong>
                  </p>
                  <p>
                    Uses{" "}
                    <strong>{result.outcome.affordabilityPercentage}%</strong>{" "}
                    of your disposable income
                  </p>
                  <p className={`decision-badge ${ui.className}`}>
                    <span aria-hidden="true">{ui.icon}</span> {ui.label}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      
      <div className="compare-buttons">
        <button className="compare-btn" onClick={() => navigate("/")}>
          Check Eligibility
        </button>

        <button
          className="apply-btn"
          onClick={() => window.open(APPLY_URL, "_blank")}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default CompareAmounts;