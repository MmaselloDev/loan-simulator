import { useState } from "react";
import { calculateLoan } from "../utils/loanCalculator";
import { validateLoanForm, parseInterestRate } from "../utils/validation";


function LoanForm({ onCalculate, clearResults }) {
  const [formData, setFormData] = useState({
    income: "",
    expenses: "",
    loanAmount: "",
    interestRate: "12.75",
    loanTerm: 60,
    loanType: "personal-loan",
  });

const [errors, setErrors] = useState({});

 const handleChange = (event) => {
   const { name, value } = event.target;

  if (name === "loanType") {
    let interestRate;

    switch (value) {
      case "credit-card":
        interestRate = "10.75";
        break;

      case "access-facility":
        interestRate = "12.75";
        break;

      case "home-loan":
        interestRate = "11.50";
        break;

      default:
        interestRate = "12.75";
    }

    setFormData({
      ...formData,
      loanType: value,
      interestRate,
    });

    return;
  }

  setFormData({
    ...formData,
    [name]: value,
  });
};

const handleSubmit = (event) => {
  event.preventDefault();

  const validationErrors = validateLoanForm(formData);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});

  // Pass the cleaned rate so a comma can't turn into 0%
  const results = calculateLoan({
    ...formData,
    interestRate: parseInterestRate(formData.interestRate),
  });
  onCalculate(results);


    if (window.innerWidth <= 1024) {
      setTimeout(() => {
        document.getElementById("ResultsCard")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  }
 
};

//using this for formatting the number as the user types. 

  const formatNumber = (value) => {
  const numbersOnly = value.replace(/\D/g, "");

  return numbersOnly.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " "
  );
};

  return (
<>
    <h2 className="form-title">Enter your details below</h2>


    <form onSubmit={handleSubmit}>

      {/* Income */}
     <div className="form-group">
     <div className="input-wrap">
     <span className="input-label">Income</span>

     <span className="currency-symbol">R</span>

        <input
            type="text"
            name="income"
            value={formData.income}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "income",
                  value: formatNumber(e.target.value),
                },
              })
            }
/>
    </div>

  <p className="helper-text">
    Enter your monthly income after deductions.
  </p>
  {errors.income && (
  <p className="error">{errors.income}</p>
    )}
</div>

      {/* Expenses */}
<div className="form-group">
  <div className="input-wrap">
    <span className="input-label">Expenses</span>

     <span className="currency-symbol">R</span>

        <input
            type="text"
            name="expenses"
            value={formData.expenses}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "expenses",
                  value: formatNumber(e.target.value),
                },
              })
            }
/>
    </div>

        <p className="helper-text">
          Enter your total monthly expenses.
        </p>
        {errors.expenses && (
  <p className="error">{errors.expenses}</p>
    )}
      </div>

      {/* Loan Amount */}
    <div className="form-group">
      <div className="input-wrap">
        <span className="input-label">Amount</span>

        <span className="currency-symbol">R</span>

        <input
              type="text"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "loanAmount",
                    value: formatNumber(e.target.value),
                  },
                })
              }
        />
    </div>

        <p className="helper-text">
          Enter your desired loan amount between R5 000 - R500 000.
        </p>
        {errors.loanAmount && (
          <p className="error">{errors.loanAmount}</p>
        )}
       </div>

      {/* Interest Rate */}
          <div className="form-group">
            <div className="input-wrap">
              <span className="input-label">Annual Interest Rate</span>

              <span className="currency-symbol">%</span>

              <input
                type="text"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                placeholder="12.75"
              />
            </div>

          <p className="helper-text">
            Annual interest rate between 7% and 30% (estimate, subject to change)
          </p>
          {errors.interestRate && (
            <p className="error">{errors.interestRate}</p>
          )}
        </div>

      {/* Loan Term */}
      <div className="form-group">
        <label htmlFor="loanTerm" className="loanTerm-label">
          Loan Term: {formData.loanTerm} months
        </label>

        <input
          type="range"
          id="loanTerm"
          name="loanTerm"
          min="12"
          max="84"
          value={formData.loanTerm}
          onChange={handleChange}
        />

        <div className="slider-labels">
          <span>12</span>
          <span>48</span>
          <span>84</span>
        </div>

        <p className="helper-text">
          Slide to choose loan term.
        </p>
      </div>

      {/* Loan Type */}
       <div className="form-group">
      <div className="input-wrap">
      

        <select
          id="loanType"
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
        >

         
          <option value="personal-loan">Personal Loan</option>
          <option value="credit-card">Credit Card</option>
          <option value="access-facility">Access Facility</option>
          <option value="home-loan">Home Loan</option>
        </select>

        </div>

        <p className="helper-text">
          Select loan type from dropdown.
        </p>
      </div>
      <div className="form-buttons">
        <button
          type="button"
          className="clear-btn"
          onClick={clearResults}
        >
          Clear
        </button>

        <button
          type="submit"
          className="submit-btn"
        >
          Check Eligibility
        </button>
      </div>

    </form>
  </>  
  );
}

export default LoanForm;