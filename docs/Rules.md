Loan Eligibility Simulator: Business Rules

 All amounts are in South African rand (ZAR).
 the simulator estimates the monthly repayment on a loan and compares it with what is left of the applicant's income after expenses. A repayment of 30% or less of that leftover income is Approved, up to 45% is Review, and anything above is Declined.

1. Purpose
The simulator gives a quick, indicative answer to the question: could this person afford this loan? It compares the estimated monthly repayment with the applicant's disposable income and returns one of three outcomes: Approved, Review or Declined. The result is an estimate only and is not a credit decision.

2. Inputs and validation
Input
Rule
Error message
Monthly income
Required. Whole rand. Must be greater than R0. Spaces are added automatically as thousands separators.
Please enter your income
Monthly expenses
Required (enter 0 if none). Whole rand. Cannot exceed income.
Please enter your expenses (enter 0 if none) / Expenses cannot exceed income
Loan amount
Required. Between R5 000 and R500 000 inclusive.
Please enter a loan amount / Minimum loan amount is R5 000 / Maximum loan amount is R500 000
Annual interest rate
Pre-filled from the loan type and editable. Must be a number from 7% to 30% inclusive. A comma or a point is accepted as the decimal separator.
Please enter a valid interest rate / Interest rate must be between 7% and 30%
Loan term
Slider from 12 to 84 months in whole-month steps. Default 60.
Not applicable
Loan type
Dropdown. Default is Personal Loan.
Not applicable
The form only accepts digits in the money fields. Anything else is stripped as the user types. Results appear only after the form passes validation on submit.

3. Loan types and default interest rates
Loan type
Default annual rate
Personal Loan
12.75%
Credit Card
10.75%
Access Facility
12.75%
Home Loan
11.50%
These are illustrative mock rates and are labelled on screen as estimates subject to change. Choosing a loan type overwrites any rate the user has typed. The loan type has no other effect: the same limits and decision rules apply to all types.

4. Calculations
• Disposable income = income − expenses, with a floor of R0.
• Monthly rate (i) = annual rate ÷ 100 ÷ 12. The annual rate is nominal and compounded monthly.
• Monthly repayment = P × i ÷ (1 − (1 + i)^−n), where P is the loan amount and n is the term in months. If the rate is 0%, the repayment is P ÷ n.
• Total repayment = monthly repayment × n.
• Total interest = total repayment − P.
• Affordability ratio = monthly repayment ÷ disposable income. If disposable income is R0, the ratio is set to 1 (100%).
No fees, insurance or other charges are included.

5. Decision rules
Affordability ratio
Decision
30% or less
Approved
Above 30% and up to 45%
Review
Above 45%
Declined
The decision is based on the whole-number percentage shown to the user, so what the user sees always matches the outcome. Exactly 30% is Approved and exactly 45% is Review.

6. Rounding and display
• Disposable income, monthly repayment, total repayment and total interest are rounded to 2 decimal places.
• The affordability ratio is rounded to 2 decimal places, and the percentage shown is rounded to a whole number.
• The decision uses this rounded ratio, so the percentage shown always agrees with the outcome. For example, an applicant at 30.4% is shown 30% and is Approved.
• Total repayment is calculated from the unrounded monthly repayment, so it can differ by a few cents from the displayed monthly repayment × term.

7. Worked example
Income R25 000, expenses R8 000, loan R150 000, 60 months, 15% annual rate.
• Disposable income: R17 000
• Monthly rate: 1.25%
• Monthly repayment: approximately R3 568
• Total repayment: approximately R214 100
• Total interest: approximately R64 100
• Affordability ratio: approximately 21%
• Decision: Approved

8. Assumptions and scope
The following are deliberate scope decisions for this version.
• Eligibility rests only on the affordability ratio. There is no credit history check, existing-debt check or maximum-loan calculation.
• No fees, insurance or other charges are included in the repayment.
• Only whole rand can be entered, so cents are not supported in income, expenses or loan amount.
• Interest rates per loan type are illustrative defaults. The user can change them within the 7% to 30% limit.
• Results are indicative estimates and are not a credit decision.