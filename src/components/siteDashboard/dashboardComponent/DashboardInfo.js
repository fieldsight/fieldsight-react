import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import uuid from "uuid/v4";
import { ListContentLoader } from "../../common/Loader";

const DashboardInfoItem = ({ meta }) => (
  <li>
    <p>
      <label>{meta.question_text} :</label> {meta.answer}
    </p>
  </li>
);

const DashboardInfo = ({ siteMetas, showContentLoader }) => (
  <>
    {showContentLoader ? (
      <ListContentLoader number={16} />
    ) : (
      <PerfectScrollbar>
        <div className="info-wrap">
          <ul>
            {siteMetas.length > 0 ? (
              siteMetas.map(meta => (
                <DashboardInfoItem meta={meta} key={uuid()} />
              ))
            ) : (
              <p> No Data Available</p>
            )}
          </ul>
        </div>
      </PerfectScrollbar>
    )}
  </>
);
export default DashboardInfo;
