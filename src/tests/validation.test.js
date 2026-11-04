import { describe, it, expect } from "vitest";
import { validateLoanForm, parseInterestRate } from "../utils/validation";
import { calculateLoan } from "../utils/loanCalculator";

// A form that passes every rule. Each test changes only the field it cares about.
const valid = {
  income: "25 000",
  expenses: "8 000",
  loanAmount: "150 000",
  interestRate: "12.75",
  loanTerm: 60,
  loanType: "personal-loan",
};

const check = (changes) => validateLoanForm({ ...valid, ...changes });

describe("validateLoanForm: valid input", () => {
  it("returns no errors for a complete, valid form", () => {
    expect(validateLoanForm(valid)).toEqual({});
  });
});

describe("validateLoanForm: income", () => {
  it.each([
    ["blank", ""],
    ["zero", "0"],
  ])("rejects %s income", (_label, income) => {
    expect(check({ income }).income).toBe("Please enter your income");
  });
});

describe("validateLoanForm: expenses", () => {
  it("requires expenses to be entered", () => {
    expect(check({ expenses: "" }).expenses).toBe(
      "Please enter your expenses (enter 0 if none)"
    );
  });

  it("accepts 0 expenses", () => {
    expect(check({ expenses: "0" }).expenses).toBe(undefined);
  });

  it("rejects expenses above income", () => {
    expect(check({ expenses: "25 001" }).expenses).toBe(
      "Expenses cannot exceed income"
    );
  });

  it("accepts expenses equal to income (the calculator declines it)", () => {
    expect(check({ expenses: "25 000" }).expenses).toBe(undefined);
  });

  it("does not report 'exceeds income' when income is missing", () => {
    const errors = check({ income: "", expenses: "5 000" });
    expect(errors.income).toBe("Please enter your income");
    expect(errors.expenses).toBe(undefined);
  });
});

describe("validateLoanForm: loan amount", () => {
  it("requires a loan amount", () => {
    expect(check({ loanAmount: "" }).loanAmount).toBe(
      "Please enter a loan amount"
    );
  });

  it.each([
    ["0", "Minimum loan amount is R5 000"],
    ["4 999", "Minimum loan amount is R5 000"],
    ["500 001", "Maximum loan amount is R500 000"],
    ["1 000 000", "Maximum loan amount is R500 000"],
  ])("R%s -> %s", (loanAmount, message) => {
    expect(check({ loanAmount }).loanAmount).toBe(message);
  });

  it.each([["5 000"], ["150 000"], ["500 000"]])(
    "accepts R%s",
    (loanAmount) => {
      expect(check({ loanAmount }).loanAmount).toBe(undefined);
    }
  );
});

describe("validateLoanForm: interest rate", () => {
  it.each([
    ["blank", ""],
    ["text", "abc"],
  ])("rejects a %s rate", (_label, interestRate) => {
    expect(check({ interestRate }).interestRate).toBe(
      "Please enter a valid interest rate"
    );
  });

  it.each([["0"], ["6.99"], ["30.01"], ["50"]])(
    "rejects %s%% as out of range",
    (interestRate) => {
      expect(check({ interestRate }).interestRate).toBe(
        "Interest rate must be between 7% and 30%"
      );
    }
  );

  it.each([["7"], ["12.75"], ["12,5"], ["30"]])(
    "accepts %s%%",
    (interestRate) => {
      expect(check({ interestRate }).interestRate).toBe(undefined);
    }
  );

  it("accepts a rate that is already a number", () => {
    expect(check({ interestRate: 12.75 }).interestRate).toBe(undefined);
  });
});

describe("validateLoanForm: several problems at once", () => {
  it("reports every empty field together", () => {
    const errors = validateLoanForm({
      ...valid,
      income: "",
      expenses: "",
      loanAmount: "",
    });
    expect(Object.keys(errors).sort()).toEqual([
      "expenses",
      "income",
      "loanAmount",
    ]);
  });
});

describe("parseInterestRate", () => {
  it.each([
    ["12.5", 12.5],
    ["12,5", 12.5],
    ["12,", 12],
    ["15", 15],
  ])("%s -> %s", (input, expected) => {
    expect(parseInterestRate(input)).toBe(expected);
  });

  it("returns NaN for text", () => {
    expect(Number.isNaN(parseInterestRate("abc"))).toBe(true);
  });
});

describe("regression: comma decimal rate", () => {
  // A raw "12,5" turns into NaN -> 0% inside the calculator, which
  // produced a wrong approval. The form must clean it first.
  it("is not treated as 0% interest once parsed", () => {
    const result = calculateLoan({
      ...valid,
      interestRate: parseInterestRate("12,5"),
    });
    expect(result.interestRate).toBe(12.5);
    expect(result.totalInterest).toBeGreaterThan(0);
  });
});