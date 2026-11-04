import { describe, it, expect } from "vitest";
import {
  calculateDisposableIncome,
  calculateMonthlyPayment,
  calculateAffordabilityRatio,
  determineDecision,
  calculateLoan,
} from "../utils/loanCalculator";

/*
  Business rules under test
  - Disposable income = income - expenses (never below 0)
  - Affordability ratio = monthly payment / disposable income
  - Decision uses the ratio rounded to 2 decimals (whole percentage):
      <= 30%  -> Approved
      <= 45%  -> Review
      >  45%  -> Declined
  - No disposable income -> ratio is 1 (100%) -> Declined
*/

// Base applicant: R25 000 income, R8 000 expenses (R17 000 disposable),
// 60 months. 0% interest is used in the boundary tests so the
// monthly payment is simply loanAmount / term (easy to reason about).
const worked = {
  income: "25 000",
  expenses: "8 000",
  loanAmount: "150 000",
  interestRate: "15",
  loanTerm: 60,
};

describe("calculateDisposableIncome", () => {
  it("subtracts expenses from income", () => {
    expect(calculateDisposableIncome(25000, 8000)).toBe(17000);
  });

  it("never goes below zero", () => {
    expect(calculateDisposableIncome(8000, 9000)).toBe(0);
  });
});

describe("calculateMonthlyPayment", () => {
  it("matches the worked example (R150 000, 15%, 60 months)", () => {
    expect(calculateMonthlyPayment(150000, 15, 60)).toBeCloseTo(3568.49, 2);
  });

  it("divides evenly when the interest rate is 0%", () => {
    expect(calculateMonthlyPayment(12000, 0, 12)).toBe(1000);
  });
});

describe("calculateAffordabilityRatio", () => {
  it("divides the payment by disposable income", () => {
    expect(calculateAffordabilityRatio(3000, 10000)).toBe(0.3);
  });

  it("returns 1 when there is no disposable income", () => {
    expect(calculateAffordabilityRatio(500, 0)).toBe(1);
  });
});

describe("determineDecision", () => {
  it.each([
    [0.1, "Approved"],
    [0.3, "Approved"],
    [0.31, "Review"],
    [0.45, "Review"],
    [0.46, "Declined"],
    [1, "Declined"],
  ])("ratio %s -> %s", (ratio, expected) => {
    expect(determineDecision(ratio)).toBe(expected);
  });
});

describe("calculateLoan: worked example", () => {
  const result = calculateLoan(worked);

  it("calculates disposable income", () => {
    expect(result.disposableIncome).toBe(17000);
  });

  it("calculates the monthly payment", () => {
    expect(result.monthlyPayment).toBe(3568.49);
  });

  it("calculates total repayment and total interest", () => {
    expect(result.totalRepayment).toBeCloseTo(214109.37, 1);
    expect(result.totalInterest).toBeCloseTo(64109.37, 1);
  });

  it("calculates the affordability ratio and percentage", () => {
    expect(result.affordabilityRatio).toBe(0.21);
    expect(result.affordabilityPercentage).toBe(21);
  });

  it("approves the application", () => {
    expect(result.decision).toBe("Approved");
  });

  it("returns the inputs the results card and compare page rely on", () => {
    expect(result.income).toBe(25000);
    expect(result.expenses).toBe(8000);
    expect(result.loanAmount).toBe(150000);
    expect(result.interestRate).toBe(15);
    expect(result.loanTerm).toBe(60);
  });
});

describe("calculateLoan: input handling", () => {
  it("reads currency strings with space separators", () => {
    const result = calculateLoan({ ...worked, income: "1 000 000" });
    expect(result.income).toBe(1000000);
  });

  it("accepts numbers as well as strings", () => {
    const result = calculateLoan({
      income: 25000,
      expenses: 8000,
      loanAmount: 150000,
      interestRate: 15,
      loanTerm: 60,
    });
    expect(result.decision).toBe("Approved");
  });

  it("accepts the loan term as a string (slider value)", () => {
    const result = calculateLoan({ ...worked, loanTerm: "60" });
    expect(result.monthlyPayment).toBe(3568.49);
  });
});

describe("calculateLoan: decision thresholds (0% interest, R10 000 disposable, 10 months)", () => {
  const base = {
    income: "10 000",
    expenses: "0",
    interestRate: "0",
    loanTerm: 10,
  };

  // loanAmount / 10 months = monthly payment, so R30 000 -> R3 000 -> 30%
  it.each([
    ["30 000", 30, "Approved"], // exactly 30%
    ["30 400", 30, "Approved"], // 30.4% rounds to 30%
    ["30 600", 31, "Review"], // 30.6% rounds to 31%
    ["45 000", 45, "Review"], // exactly 45%
    ["45 400", 45, "Review"], // 45.4% rounds to 45%
    ["45 600", 46, "Declined"], // 45.6% rounds to 46%
    ["60 000", 60, "Declined"],
  ])("loan of R%s -> %s%% -> %s", (loanAmount, percentage, decision) => {
    const result = calculateLoan({ ...base, loanAmount });
    expect(result.affordabilityPercentage).toBe(percentage);
    expect(result.decision).toBe(decision);
  });
});

describe("calculateLoan: no disposable income", () => {
  it("declines when expenses equal income", () => {
    const result = calculateLoan({ ...worked, income: "8 000" });
    expect(result.disposableIncome).toBe(0);
    expect(result.affordabilityPercentage).toBe(100);
    expect(result.decision).toBe("Declined");
  });

  it("declines when expenses exceed income", () => {
    const result = calculateLoan({ ...worked, income: "5 000" });
    expect(result.disposableIncome).toBe(0);
    expect(result.decision).toBe("Declined");
  });
});

describe("calculateLoan: 0% interest", () => {
  it("has no interest cost", () => {
    const result = calculateLoan({
      income: "20 000",
      expenses: "0",
      loanAmount: "12 000",
      interestRate: "0",
      loanTerm: 12,
    });
    expect(result.monthlyPayment).toBe(1000);
    expect(result.totalInterest).toBe(0);
    expect(result.decision).toBe("Approved");
  });
});

describe("calculateLoan: compare amounts scenario (12.75%, 60 months)", () => {
  // Same applicant as the compare page: only the loan amount changes
  const applicant = {
    income: "25 000",
    expenses: "8 000",
    interestRate: "12.75",
    loanTerm: 60,
  };

  it.each([
    ["150 000", 20, "Approved"],
    ["300 000", 40, "Review"],
    ["400 000", 53, "Declined"],
  ])("R%s -> %s%% -> %s", (loanAmount, percentage, decision) => {
    const result = calculateLoan({ ...applicant, loanAmount });
    expect(result.affordabilityPercentage).toBe(percentage);
    expect(result.decision).toBe(decision);
  });

  it("a lower amount never gives a worse decision", () => {
    const order = { Approved: 0, Review: 1, Declined: 2 };
    const amounts = ["400 000", "300 000", "200 000", "100 000"];
    const ranks = amounts.map(
      (loanAmount) => order[calculateLoan({ ...applicant, loanAmount }).decision]
    );
    for (let i = 1; i < ranks.length; i++) {
      expect(ranks[i]).toBeLessThanOrEqual(ranks[i - 1]);
    }
  });
});