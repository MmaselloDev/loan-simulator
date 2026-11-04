/*
  Loan form validation
  */

export const LIMITS = {
  minLoan: 5000,
  maxLoan: 500000,
  minRate: 7,
  maxRate: 30,
};

// "150 000" -> 150000
function parseAmount(value) {
  return Number(String(value ?? "").replace(/\s/g, ""));
}

// Accept "12,5" as well as "12.5"
export function parseInterestRate(value) {
  return Number(String(value ?? "").replace(",", "."));
}

// Returns an object of error messages keyed by field name.
// An empty object means the form is valid.
export function validateLoanForm(formData) {
  const errors = {};

  const income = parseAmount(formData.income);
  const expenses = parseAmount(formData.expenses);
  const loanAmount = parseAmount(formData.loanAmount);
  const interestRate = parseInterestRate(formData.interestRate);

  if (!income) {
    errors.income = "Please enter your income";
  }

  if (String(formData.expenses ?? "").trim() === "") {
    errors.expenses = "Please enter your expenses (enter 0 if none)";
  } else if (income > 0 && expenses > income) {
    errors.expenses = "Expenses cannot exceed income";
  }

  if (String(formData.loanAmount ?? "").trim() === "") {
    errors.loanAmount = "Please enter a loan amount";
  } else if (loanAmount < LIMITS.minLoan) {
    errors.loanAmount = "Minimum loan amount is R5 000";
  } else if (loanAmount > LIMITS.maxLoan) {
    errors.loanAmount = "Maximum loan amount is R500 000";
  }

  if (
    String(formData.interestRate ?? "").trim() === "" ||
    Number.isNaN(interestRate)
  ) {
    errors.interestRate = "Please enter a valid interest rate";
  } else if (interestRate < LIMITS.minRate || interestRate > LIMITS.maxRate) {
    errors.interestRate = "Interest rate must be between 7% and 30%";
  }

  return errors;
}