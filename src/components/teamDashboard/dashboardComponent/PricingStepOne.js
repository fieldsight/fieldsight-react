import React, { Component } from "react";
import Modal from "../../common/Modal";

const FreePlan = ({ period, plan }) => (
  <div className="col-md-4">
    <div className="module-pricing mt-4" id="pk_free">
      <div className="mp-head pbg-1">
        <h4>Free</h4>
        <h3>
          <strong>${plan.total_charge}</strong>
          <sub> {period == "monthly" ? "/Mo" : "/Yr"}</sub>
        </h3>
        <div className="tri-wrap">
          <div className="tri-left"></div>
          <div className="tri-right"></div>
        </div>
      </div>
      <div className="mp-body">
        <ul>
          <li>
            <strong>{plan.submissions}</strong> Submissions
          </li>
          <li>
            <strong>15</strong> Users, <strong>2</strong> Projects,{" "}
            <strong>10</strong>
            Sites
          </li>
          <li>
            <strong>Unlimited</strong> Forms, Stages & Schedules
          </li>
          <li>
            <strong>Unlimited</strong> Reports, Dashboards & Maps
          </li>
        </ul>
      </div>
      <div className="mp-footer">
        <a title="" className="btn pbg-1 btn-block btn-lg">
          Subscribed
        </a>
      </div>
    </div>
  </div>
);
const StarterPlan = ({ period, plan, handleSelect }) => (
  <div className="col-md-4">
    <div className="module-pricing mt-4" id="pk_starter">
      <div className="mp-head pbg-2">
        <h4>Starter</h4>
        <h3>
          <strong>${plan.total_charge}</strong>
          <sub>{period == "monthly" ? "/Mo" : "/Yr"}</sub>
        </h3>
        <div className="tri-wrap">
          <div className="tri-left"></div>
          <div className="tri-right"></div>
        </div>
      </div>
      <div className="mp-body">
        <ul>
          <li>
            <strong>{plan.submissions}</strong> Submissions
          </li>
          <li>
            <strong>Unlimited</strong> Users, Projects, Sites
          </li>
          <li>
            <strong>Unlimited</strong> Forms, Stages & Schedules
          </li>
          <li>
            <strong>Unlimited</strong> Reports, Dashboards & Maps
          </li>
        </ul>
      </div>
      <div className="mp-footer">
        <a
          title=""
          className="btn pbg-2 btn-block btn-lg"
          onClick={() => handleSelect("starter_plan", plan)}
        >
          Select
        </a>
      </div>
    </div>
  </div>
);

const BasicPlan = ({ period, plan, handleSelect }) => (
  <div className="col-md-4">
    <div className="module-pricing mt-4" id="pk_basic">
      <div className="mp-head pbg-3">
        <h4>Basic</h4>
        <h3>
          <strong>${plan.total_charge}</strong>
          <sub>{period == "monthly" ? "/Mo" : "/Yr"}</sub>
        </h3>
        <div className="tri-wrap">
          <div className="tri-left"></div>
          <div className="tri-right"></div>
        </div>
      </div>
      <div className="mp-body">
        <ul>
          <li>
            <strong>{plan.submissions}</strong> Submissions
          </li>
          <li>
            <strong>Unlimited</strong> Users, Projects, Sites
          </li>
          <li>
            <strong>Unlimited</strong> Forms, Stages & Schedules
          </li>
          <li>
            <strong>Unlimited</strong> Reports, Dashboards & Maps
          </li>
        </ul>
      </div>
      <div className="mp-footer">
        <a
          title=""
          className="btn pbg-3 btn-block btn-lg"
          onClick={() => handleSelect("basic_plan", plan)}
        >
          Select
        </a>
      </div>
    </div>
  </div>
);

const ExtendedPlan = ({ period, plan, handleSelect }) => (
  <div className="col-md-4">
    <div className="module-pricing mt-4" id="pk_extended">
      <div className="mp-head pbg-4">
        <h4>Extended</h4>
        <h3>
          <strong>${plan.total_charge}</strong>
          <sub> {period == "monthly" ? "/Mo" : "/Yr"}</sub>
        </h3>
        <div className="tri-wrap">
          <div className="tri-left"></div>
          <div className="tri-right"></div>
        </div>
      </div>
      <div className="mp-body">
        <ul>
          <li>
            <strong>{plan.submissions}</strong> Submissions
          </li>
          <li>
            <strong>Unlimited</strong> Users, Projects, Sites
          </li>
          <li>
            <strong>Unlimited</strong> Forms, Stages & Schedules
          </li>
          <li>
            <strong>Unlimited</strong> Reports, Dashboards & Maps
          </li>
        </ul>
      </div>
      <div className="mp-footer">
        <a
          title=""
          className="btn pbg-4 btn-block btn-lg"
          onClick={() => handleSelect("extended_plan", plan)}
        >
          Select
        </a>
      </div>
    </div>
  </div>
);

const ProPlan = ({ period, plan, handleSelect }) => (
  <div className="col-md-4">
    <div className="module-pricing mt-4" id="pk_pro">
      <div className="mp-head pbg-5">
        <h4>Pro</h4>
        <h3>
          <strong>${plan.total_charge}</strong>
          <sub> {period == "monthly" ? "/Mo" : "/Yr"}</sub>
        </h3>
        <div className="tri-wrap">
          <div className="tri-left"></div>
          <div className="tri-right"></div>
        </div>
      </div>
      <div className="mp-body">
        <ul>
          <li>
            <strong>{plan.submissions}</strong> Submissions
          </li>
          <li>
            <strong>Unlimited</strong> Users, Projects, Sites
          </li>
          <li>
            <strong>Unlimited</strong> Forms, Stages & Schedules
          </li>
          <li>
            <strong>Unlimited</strong> Reports, Dashboards & Maps
          </li>
        </ul>
      </div>
      <div className="mp-footer">
        <a
          title=""
          className="btn pbg-5 btn-block btn-lg"
          onClick={() => handleSelect("pro_plan", plan)}
        >
          Select
        </a>
      </div>
    </div>
  </div>
);

const ScalePlan = ({ period, plan, handleSelect }) => (
  <div className="col-md-4">
    <div className="module-pricing mt-4" id="pk_scale">
      <div className="mp-head pbg-6">
        <h4>Scale</h4>
        <h3>
          <strong>${plan.total_charge}</strong>
          <sub> {period == "monthly" ? "/Mo" : "/Yr"}</sub>
        </h3>
        <div className="tri-wrap">
          <div className="tri-left"></div>
          <div className="tri-right"></div>
        </div>
      </div>
      <div className="mp-body">
        <ul>
          <li>
            <strong>{plan.submissions}</strong> Submissions
          </li>
          <li>
            <strong>Unlimited</strong> Users, Projects, Sites
          </li>
          <li>
            <strong>Unlimited</strong> Forms, Stages & Schedules
          </li>
          <li>
            <strong>Unlimited</strong> Reports, Dashboards & Maps
          </li>
        </ul>
      </div>
      <div className="mp-footer">
        <a
          title=""
          className="btn btn-block pbg-6 btn-lg"
          onClick={() => handleSelect("scale_plan", plan)}
        >
          Select
        </a>
      </div>
    </div>
  </div>
);
const MonthlyPricing = props => {
  const { data, handleSelect } = props;
  return (
    <div className="row">
      <FreePlan period="monthly" plan={data[0]} />
      <StarterPlan
        period="monthly"
        plan={data[9]}
        handleSelect={handleSelect}
      />
      <BasicPlan period="monthly" plan={data[1]} handleSelect={handleSelect} />
      <ExtendedPlan
        period="monthly"
        plan={data[3]}
        handleSelect={handleSelect}
      />
      <ProPlan period="monthly" plan={data[5]} handleSelect={handleSelect} />
      <ScalePlan period="monthly" plan={data[7]} handleSelect={handleSelect} />
    </div>
  );
};
const YearlyPricing = props => {
  const { data, handleSelect } = props;
  return (
    <div className="row">
      <FreePlan period="yearly" plan={data[0]} handleSelect={handleSelect} />
      <StarterPlan
        period="yearly"
        plan={data[10]}
        handleSelect={handleSelect}
      />
      <BasicPlan period="yearly" plan={data[2]} handleSelect={handleSelect} />
      <ExtendedPlan
        period="yearly"
        plan={data[4]}
        handleSelect={handleSelect}
      />
      <ProPlan period="yearly" plan={data[6]} handleSelect={handleSelect} />
      <ScalePlan period="yearly" plan={data[8]} handleSelect={handleSelect} />
    </div>
  );
};
class PricingStepOne extends Component {
  render() {
    const {
      props: {
        packageDetails,
        handleNext,
        handleFirstStepSelect,
        handleIntervalPeriod,
        periodType,
        isPackageSelected
      }
    } = this;

    return (
      // <Modal title="Choose a plan">
      <div className="fieldsight-new">
        <div className="bg-primary p-4">
          <div className="bg-light p-4 m-4">
            <div className="pb-2"></div>
            <h6 className="text-center mt-4">
              <strong>Thank you for signing up with FieldSight!</strong>
            </h6>
            <h5 className="text-center mt-2 mb-3">
              <strong>Select a Plan from Plan Options</strong>
            </h5>
            <p className="text-center mb-4 text-xlight">
              Fees for access to the system cover the costs of hosting data and
              providing support. <br />
              FieldSight subscription fees are charged at the start of
              delivering service and renew automatically.
            </p>
            <div className="pb-2 text-center">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <button
                  value="monthly"
                  className={`${
                    periodType == "monthly" ? "active" : ""
                  } btn btn-pk btn-outline-primary`}
                  onClick={e => {
                    handleIntervalPeriod(e);
                  }}
                >
                  Monthly
                </button>
                <button
                  value="yearly"
                  className={`${
                    periodType == "yearly" ? "active" : ""
                  } btn btn-pk btn-outline-primary`}
                  onClick={e => {
                    handleIntervalPeriod(e);
                  }}
                >
                  Yearly
                </button>
              </div>
            </div>
            {periodType == "monthly" ? (
              <MonthlyPricing
                data={packageDetails}
                handleSelect={handleFirstStepSelect}
              />
            ) : (
              <YearlyPricing
                data={packageDetails}
                handleSelect={handleFirstStepSelect}
              />
            )}
            {isPackageSelected && (
              <div className="text-center mt-4">
                <button
                  title=""
                  className="btn btn-primary"
                  onClick={() => handleNext("second")}
                >
                  Next <i className="la la-long-arrow-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default PricingStepOne;
