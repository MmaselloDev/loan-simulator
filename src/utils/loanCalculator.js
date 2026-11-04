/*
  Loan Calculator Functions
*/

function parseCurrency(value) {
  return Number(
    String(value).replace(/\s/g, "")
  );
}
// Disposable Income
export function calculateDisposableIncome(income, expenses) {
  return Math.max(0, income - expenses);
}

// Monthly Interest Rate
export function calculateMonthlyRate(interestRate) {
  return interestRate / 100 / 12;
}

// Monthly Repayment
export function calculateMonthlyPayment(
  loanAmount,
  interestRate,
  loanTerm
) {
  const monthlyRate = calculateMonthlyRate(interestRate);

  if (monthlyRate === 0) {
    return loanAmount / loanTerm;
  }

  return (
    (loanAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -loanTerm))
  );
}

// Total Repayment
export function calculateTotalRepayment(
  monthlyPayment,
  loanTerm
) {
  return monthlyPayment * loanTerm;
}

// Total Interest
export function calculateTotalInterest(
  totalRepayment,
  loanAmount
) {
  return totalRepayment - loanAmount;
}

// Affordability Ratio
export function calculateAffordabilityRatio(
  monthlyPayment,
  disposableIncome
) {
  if (disposableIncome <= 0) {
    return 1;
  }

  return monthlyPayment / disposableIncome;
}


// Decision Rules
export function determineDecision(
  affordabilityRatio
) {
  if (affordabilityRatio <= 0.3) {
    return "Approved";
  }

  if (affordabilityRatio <= 0.45) {
    return "Review";
  }

  return "Declined";
}

// Main Calculator
export function calculateLoan(formData) {
  const income = parseCurrency(formData.income);
const expenses = parseCurrency(formData.expenses);
const loanAmount = parseCurrency(formData.loanAmount);
  const interestRate = Number(formData.interestRate) || 0;
  const loanTerm = Number(formData.loanTerm) || 0;

  const disposableIncome =
    calculateDisposableIncome(
      income,
      expenses
    );

  const monthlyPayment =
    calculateMonthlyPayment(
      loanAmount,
      interestRate,
      loanTerm
    );

  const totalRepayment =
    calculateTotalRepayment(
      monthlyPayment,
      loanTerm
    );

  const totalInterest =
    calculateTotalInterest(
      totalRepayment,
      loanAmount
    );

  const affordabilityRatio =
    calculateAffordabilityRatio(
      monthlyPayment,
      disposableIncome
    );

 const decision = determineDecision(
  Number(affordabilityRatio.toFixed(2))
    );

  
  return {
    disposableIncome: Number(
      disposableIncome.toFixed(2)
    ),

    monthlyPayment: Number(
      monthlyPayment.toFixed(2)
    ),

    totalRepayment: Number(
      totalRepayment.toFixed(2)
    ),

    totalInterest: Number(
      totalInterest.toFixed(2)
    ),

    affordabilityRatio: Number(
      affordabilityRatio.toFixed(2)
    ),

    affordabilityPercentage: Number(
      (affordabilityRatio * 100).toFixed(0)
    ),

    decision,

    income,
    expenses,
    loanAmount,
    interestRate,
    loanTerm,
  };
};
