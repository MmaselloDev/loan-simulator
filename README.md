# Loan Eligibility Simulator

## Overview

The Loan Eligibility Simulator is a React-based web application that helps users estimate whether they may qualify for a loan based on their financial circumstances.

The simulator calculates affordability using income, expenses, loan amount, interest rate, and loan term, then provides an eligibility decision based on predefined business rules.

Possible outcomes include:

- ✅ Approved
- ⚠️ Review
- ❌ Declined

The application is designed to provide a realistic simulation of a lending assessment while maintaining a user-friendly and responsive experience across desktop, tablet, and mobile devices.

> **Disclaimer:** All interest rates used in this application are mock rates for educational and demonstration purposes only. They do not represent actual lending rates.

---
## Key Learning Outcomes

This project provided practical experience with:

- React component architecture
- React state management
- Form validation
- Financial calculations
- Responsive web design
- Mobile-first development
- Business rule implementation
- Conditional rendering
- User experience design
- React Router navigation
- Reusable utility functions

## Features

### Loan Eligibility Assessment

- Calculates disposable income
- Calculates monthly loan repayments
- Calculates total repayment amount
- Calculates total interest payable
- Calculates affordability ratio
- Estimates maximum affordable loan amount
- Provides loan eligibility decision

### Interactive User Experience

- Responsive design for desktop, tablet, and mobile
- Dynamic results card
- Auto-scroll to results after calculation
- Interactive flip cards with recommendations
- Status tracker showing application outcome
- Clear form functionality
- Compare Amounts page for affordability comparison

### Validation

The application validates user inputs before performing calculations.

#### Required Fields

- ✅ Income required
- ✅ Expenses required
- ✅ Loan amount required

#### Business Validations

- ✅ Expenses cannot be greater than income
- ✅ Minimum loan amount = R5 000
- ✅ Maximum loan amount = R500 000

---

## Technologies Used

- React
- JavaScript (ES6+)
- React Router
- React Icons
- CSS3

---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
```

### Navigate to the Project Directory

```bash
cd loan-eligibility-simulator
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The application will start locally and can be viewed in your browser.

---

# Business Rules

## Input Fields

### Income

The applicant's monthly income after deductions.

#### Validation

- Must be greater than R0

---

### Expenses

The applicant's monthly expenses and existing debt obligations.

#### Validation

- Must be greater than or equal to R0

---

### Loan Amount

The amount the user wishes to borrow.

#### Validation

- Minimum: R5 000
- Maximum: R500 000

---

### Annual Interest Rate

The yearly interest rate used in repayment calculations.

#### Validation

- Must be greater than or equal to 0%
- Default value: 12.75%

---

### Loan Term

Selected using the loan term slider.

#### Validation

- Minimum: 12 months
- Maximum: 84 months

---

### Loan Type

Available options:

- Personal Loan
- Credit Card
- Access Facility
- Home Loan

---

## Financial Calculations

### Disposable Income

```text
Disposable Income = Income - Expenses
```

### Monthly Interest Rate

```text
Monthly Interest Rate =
Annual Interest Rate / 100 / 12
```

### Monthly Repayment

The simulator uses the standard amortized loan formula.

```text
Monthly Payment =
Loan Amount × r
-------------------------
1 - (1 + r)^(-n)
```

Where:

- r = monthly interest rate
- n = number of months

#### Special Rule

If interest rate equals 0%:

```text
Monthly Payment =
Loan Amount ÷ Number of Months
```

---

### Total Repayment

```text
Total Repayment =
Monthly Payment × Number of Months
```

---

### Total Interest

```text
Total Interest =
Total Repayment - Loan Amount
```

---

### Affordability Ratio

```text
Affordability Ratio =
Monthly Payment ÷ Disposable Income
```

The ratio determines whether the repayment is affordable.

---

## Maximum Loan Calculation

### Maximum Affordable Repayment

```text
Maximum Repayment =
Disposable Income × 30%
```

### Maximum Loan

```text
Max Loan =
Max Repayment ×
(1 - (1 + r)^(-n))
-------------------
r
```

### Rules

- Rounded down to the nearest Rand
- Cannot exceed R500 000
- If disposable income is R0 or less, maximum loan equals R0

---

## Eligibility Assessment

### Hard Declines

An application is automatically declined if:

#### Loan Amount

- Less than R5 000
- Greater than R500 000

#### Loan Term

- Less than 12 months
- Greater than 84 months

#### Disposable Income

```text
Income ≤ Expenses
```

Result:

```text
Declined
```

---

## Affordability Bands

### Approved

Condition:

```text
Affordability Ratio ≤ 30%
```

Decision:

```text
Approved
```

---

### Review

Condition:

```text
Affordability Ratio > 30%
AND
Affordability Ratio ≤ 45%
```

Decision:

```text
Review
```

---

### Declined

Condition:

```text
Affordability Ratio > 45%
```

Decision:

```text
Declined
```

---

## Boundary Rules

The following values are inclusive:

```text
30% = Approved
45% = Review
```

Examples:

```text
30.0% → Approved
45.0% → Review
45.1% → Declined
```

---

## Default Mock Interest Rates

- Up to 24 months → 13%
- 25 - 48 months → 14%
- 49 - 60 months → 15%
- 61 - 84 months → 16%

---

## Example Calculation

### Inputs

```text
Income:          R25 000
Expenses:        R8 000
Loan Amount:     R150 000
Loan Term:       60 Months
Interest Rate:   15%
```

### Results

```text
Disposable Income = R17 000

Monthly Repayment = R3 568.49

Total Repayment = R214 109.37

Total Interest = R64 109.37

Affordability Ratio = 21.0%

Maximum Loan = R214 376

Decision = Approved
```

---

## Rounding Rules

- Monetary values are rounded to two decimal places
- Percentages are rounded for display purposes
- Affordability calculations use full precision before rounding

---

## Future Enhancements

Potential future improvements include:

- Loan repayment charts and visualisations
- Saved calculations using local storage
- Dark mode support
- Additional loan products
- Export results to PDF
- Integration with real-world lending APIs

---
## Features

### Loan Eligibility Assessment

- Calculates disposable income
- Calculates monthly loan repayments
- Calculates total repayment amount
- Calculates total interest payable
- Calculates affordability ratio
- Estimates maximum affordable loan amount
- Provides a loan eligibility decision

### Loan Types

The simulator supports multiple loan products:

- Personal Loan
- Credit Card
- Access Facility
- Home Loan

Each loan type is assigned a default mock interest rate that can be adjusted by the user.

### Interactive User Experience

- Dynamic results card
- Affordability indicator
- Interactive recommendation cards
- Status tracker
- Auto-scroll to results
- Clear form functionality

### Compare Amounts Tool

The Compare Amounts feature allows users to compare different loan amounts side-by-side using the same affordability calculations and eligibility rules as the main calculator.

Users can evaluate:

- Monthly repayment estimates
- Affordability percentage
- Eligibility outcome
- Maximum affordable loan amount

This helps users determine the most suitable loan amount before applying.

### Validation

#### Required Fields

- Income required
- Expenses required
- Loan amount required

#### Business Rules

- Expenses cannot be greater than income
- Minimum loan amount = R5 000
- Maximum loan amount = R500 000


## Working Examples

The following examples demonstrate how affordability bands are applied.

### Example 1: Approved

#### Inputs

```text
Income: R19 000
Expenses: R8 000

Disposable Income = R11 000
```

#### Calculation

```text
Maximum approved monthly repayment:

30% × R11 000
= R3 300
```

#### Result

Any loan producing a monthly repayment of R3 300 or less will be:

✅ Approved

---

### Example 2: Review

#### Inputs

```text
Income: R19 000
Expenses: R8 000

Disposable Income = R11 000
```

#### Calculation

```text
Review range:

Greater than R3 300
Up to R4 950

(30% - 45% of disposable income)
```

#### Result

Any loan producing a monthly repayment within this range will be:

⚠️ Review

---

### Example 3: Declined

#### Inputs

```text
Income: R19 000
Expenses: R8 000

Disposable Income = R11 000
```

#### Calculation

```text
Monthly repayment exceeds:

45% × R11 000
= R4 950
```

#### Result

Any loan producing a monthly repayment above R4 950 will be:

❌ Declined

# Loan Eligibility Simulator

A single-page loan eligibility simulator built with React and Vite. The user enters their income, expenses, loan amount, term and interest rate, and the app returns a decision (Approved, Review or Declined) with a repayment breakdown. For Review and Declined results, a comparison page shows alternative loan amounts and terms.

> This is a demo. No real data is collected or sent anywhere.

## Run with Docker

Requires Docker (Docker Desktop or Rancher Desktop with the dockerd engine).

```bash
docker build -t loan-simulator .
docker run -p 8080:80 loan-simulator
```

Then open http://localhost:8080. The unit tests run during the image build, so a failing test stops the build.

## Run locally (without Docker)

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

## Run the tests

```bash
npm test
```

Tests use Vitest and cover the loan calculations (`src/utils/loanCalculator.js`) and form validation (`src/utils/validation.js`).

## Documentation

- [Business rules](docs/Rules.md): inputs, formulas, thresholds and assumptions
- [Low-fidelity wireframe](docs/LowFidWireframe.pdf)

## Design decisions

- **Loan term is in months** (slider up to 84), so the calculations match how loan terms are quoted.
- **Interest rate is limited to 7%–30%**, and the decision is based on the rounded affordability ratio, so the percentage shown to the user is the one used for the decision.
- **Results never rely on colour alone.** Each status uses an icon and text as well as colour.
- **Validation is a set of pure functions** in `utils/validation.js`, which keeps it testable without rendering the form.
- **The secondary navigation is deliberately not linked to other pages**, because this is a demo site. Some links in the primary navigation point to external sites and work.
- **The `/compare` route is handled by nginx** (`try_files`), so refreshing on that page works in the Docker build.

## Project structure

```
src/
  components/   UI components (LoanForm, ResultsCard, CompareAmounts, ...)
  utils/        loanCalculator.js, validation.js
  tests/        Vitest unit tests
docs/           Business rules and wireframe
```

## Author

Developed by **Mmasello Manabile**.