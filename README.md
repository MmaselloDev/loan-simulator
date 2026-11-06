# Loan Eligibility Simulator

A single-page web app that estimates whether a user may qualify for a loan. The user enters their monthly income, expenses, loan amount, interest rate and loan term. The app calculates affordability and returns a decision of Approved, Review or Declined, together with a repayment breakdown.

> **Disclaimer:** This is a demo. All interest rates are mock rates for educational purposes and do not represent real lending rates. No data is collected or sent anywhere.

## Features

- Calculates disposable income, monthly repayment, total repayment, total interest and the affordability ratio
- Estimates the maximum affordable loan amount
- Shows a results card with a clear decision, using an icon and text as well as colour
- Gives recommendation cards when an application is in Review or Declined
- Includes a Compare Amounts page (`/compare`) that checks different loan amounts against the same rules
- Validates all inputs with inline error messages
- Offers four loan types (Personal Loan, Credit Card, Access Facility, Home Loan), each with a default mock interest rate that the user can edit within 7% to 30%
- Responsive layout for desktop, tablet and mobile

## How the decision works

The affordability ratio is the monthly repayment divided by disposable income (income minus expenses). The ratio is rounded to the whole-number percentage shown to the user, and the decision uses that rounded value.

| Affordability ratio | Decision |
|---|---|
| 30% or less | Approved |
| Above 30% up to 45% | Review |
| Above 45% | Declined |

An application is also declined if expenses are equal to or greater than income.

**Input limits**

- Loan amount: R5 000 to R500 000
- Loan term: 12 to 84 months
- Interest rate: 7% to 30%

**Worked example:** income R25 000, expenses R8 000, loan R150 000 over 60 months at 15%. The monthly repayment is R3 568.49, the affordability ratio is 21%, and the decision is Approved.

The full formulas, thresholds and assumptions are in [docs/Rules.md](docs/Rules.md).

## Technologies

- React and JavaScript (ES6+)
- Vite
- React Router
- React Icons
- CSS3
- Vitest (unit tests)
- Docker and nginx

## Run with Docker

Requires Docker (Docker Desktop, or Rancher Desktop with the dockerd engine).

```bash
git clone https://github.com/MmaselloDev/loan-simulator.git
cd loan-simulator
docker build -t loan-simulator .
docker run -p 8080:80 loan-simulator
```

Then open http://localhost:8080.

The unit tests run during the image build, so a failing test stops the build.

## Run locally without Docker

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

## Run the tests

```bash
npm test
```

The tests cover the loan calculations (`src/utils/loanCalculator.js`) and the form validation (`src/utils/validation.js`).

## Documentation

- [Business rules](docs/Rules.md): inputs, formulas, thresholds and assumptions
- [Low-fidelity wireframe](docs/LowFidWireframe.pdf)

## Design decisions


- **The loan term is in months** (slider up to 84), so calculations match how loan terms are normally quoted.
- **The decision uses the rounded ratio**, so the percentage the user sees is the one that decides the outcome.
- **Status never relies on colour alone.** Each decision has an icon and text as well as a colour.
- **Validation is a set of pure functions** in `utils/validation.js`, which keeps it testable without rendering the form.
- **The secondary navigation deliberately links nowhere**, because this is a demo site. Some links in the primary navigation point to external sites and do work.
- **The `/compare` route is handled by nginx** (`try_files`), so refreshing on that page works in the Docker build.

## Project structure

```
src/
  components/   UI components (LoanForm, ResultsCard, CompareAmounts, FlipCard, Header, Footer)
  utils/        loanCalculator.js, validation.js
  tests/        Vitest unit tests
docs/           Business rules and wireframe
Dockerfile      Multi-stage build (Node build, nginx serve)
nginx.conf      Serves the app and handles client-side routing
```

## Possible future improvements

- Repayment charts and visualisations
- Saved calculations
- Dark mode
- Additional loan products
- Export results to PDF

## Author

Developed by **Mmasello Manabile**.