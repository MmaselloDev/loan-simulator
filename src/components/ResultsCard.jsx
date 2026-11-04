import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { SiReacthookform } from "react-icons/si";
import { FaFileWaveform } from "react-icons/fa6";
import { CgDanger } from "react-icons/cg";
import FlipCard from "./FlipCard";

function ResultsCard({ results, clearResults }) {
  const navigate = useNavigate();

  if (!results) {
    return (

      <div id="results-title">
        <h2>Do you qualify?</h2>
        <p className="intro-text">
          Your results will be displayed here
          <span className="dots"></span>
        </p>
        <div style={{ height: "655px" }}></div>
      </div>
    );
  }

  const decision = results.decision;

  const renderStatusTracker = () => (
  <div className={`status-tracker ${decision.toLowerCase()}`}>
    <div className="tracker-item">
      <div
        className={`status-circle ${
          decision === "Approved" ? "active" : ""
        }`}
      >
        ✓
      </div>
      <span>Approved</span>
    </div>

    <div className="tracker-line"></div>

    <div className="tracker-item">
      <div
        className={`status-circle ${
          decision === "Review" ? "active" : ""
        }`}
      >
        !
      </div>
      <span>Review</span>
    </div>

    <div className="tracker-line"></div>

    <div className="tracker-item">
      <div
        className={`status-circle ${
          decision === "Declined" ? "active" : ""
        }`}
      >
        ✕
      </div>
      <span>Declined</span>
    </div>
  </div>
);

  return (
    <div>
      {decision === "Approved" ? (
        <>
          <div className="success-title">
            <Confetti numberOfPieces={400} recycle={false} />
            <SiReacthookform size={50} />
            <h2>You are pre-qualified!</h2>
          </div>

          <p className="results-message">
            Based on the details you provided, you are eligible to apply.
            <strong> Click "Apply now" on the button below!</strong>
          </p>

          {renderStatusTracker()}
              

          <div className="results-summary">
            <div className="result-item">
              <span>Desired Loan Amount</span>
              <strong>
                {results.loanAmount?.toLocaleString("en-ZA", {
                  style: "currency",
                  currency: "ZAR",
                })}
              </strong>
            </div>

            <div className="result-item">
              <span>Monthly Instalment</span>
              <strong>
                {results.monthlyPayment?.toLocaleString("en-ZA", {
                  style: "currency",
                  currency: "ZAR",
                })}
              </strong>
            </div>

            <div className="result-item">
              <span>Interest Rate</span>
              <strong>{results.interestRate}%</strong>
            </div>

            <div className="result-item">
              <span>Repayment Term</span>
              <strong>{results.loanTerm} Months</strong>
            </div>
          </div>
                   
          <div className="approved-apply">
             <button
              className="apply-btn"
              onClick={() =>
                window.open(
                  "https://www.capitecbank.co.za/personal/credit/personal-estimate/#/credit-application-information",
                  "_blank"
                )
              }
            >
              Apply Now
            </button>

            <div className="apply">
              <h3>Other ways to apply</h3>
              <ul>
                <li>
                  Call us on: <a href="tel:0860667789">0860 66 77 89</a>
                </li>
                <li>Visit a branch near you!</li>
              </ul>
            </div>

           </div>  
    
        </>

      ) : decision === "Review" ? (
        <>
          <div className="success-title">
            <FaFileWaveform size={40} />
            <h2>Needs Review</h2>
          </div>

          <p className="results-message">
            Based on the details you provided, you application needs a review.
            <strong> Click "Apply now" on the button below for more info</strong>
          </p>

          {renderStatusTracker()}

          <div className="flip-card-container">
          
          <FlipCard
            title="Reason"
            content={
              <p>
                Your affordability falls outside our pre-approval criteria and requires further assessment.
              </p>
            }
          />

          <FlipCard
            title="How to Improve"
            content={
              <ul>
                <li>Reduce monthly expenses</li>
                <li>Consider a lower loan amount</li>
                <li>Increase disposable income</li>
                <li>Submit supporting documents if requested</li>
              </ul>
            }
          />
        </div>

        <p id="card-info"> Click a card for more information </p>

                                
          <div className="button-group">
            <button
              className="apply-btn"
              onClick={() =>
                window.open(
                  "https://www.capitecbank.co.za/personal/credit/personal-estimate/#/credit-application-information",
                  "_blank"
                )
              }
            >
              Apply Now
            </button>

            <button
              className="compare-btn"
              onClick={() => navigate("/compare", { state: { results } })}
            >
              Compare Amounts
            </button>

             </div>
        </>
      ) : (
        <>
          
          <div className="success-title">
              <CgDanger size={40} />
              <h2> You're Not Eligible Yet </h2>
          </div>

          <p className="results-message">
            Based on the provided details, you are not able to apply at the
            moment. Compare lower loan amounts on the button below.
          </p>

          {renderStatusTracker()}

    <div className="flip-card-container">
          
          <FlipCard
            title="Reason"
            content={
              <p>
                Based on the information provided, your affordability does not currently meet the minimum lending criteria.
              </p>
            }
          />

          <FlipCard
            title="How to Improve"
            content={
              <ul>
                <li>Reduce existing debt commitments</li>
                <li>Consider a lower loan amount</li>
                <li>Increase disposable income</li>
                <li>Reapply once your financial position has improved</li>
              </ul>
            }
          />
        </div>

        <p id="card-info"> Click a card for more information </p>

            <div className="declined-apply">
            <button className="compare-btn"
             onClick={() => navigate("/compare", { state: { results } })}
          >
            Compare Amounts
          </button>

            <div className="apply">
              <h3>Other ways to apply</h3>
              <ul>
                <li>
                  Call us on: <a href="tel:0860667789">0860 66 77 89</a>
                </li>
                <li>Visit a branch near you!</li>
              </ul>
            </div>

           </div>  

          </>
      )}
    </div>
  );
}

export default ResultsCard;


