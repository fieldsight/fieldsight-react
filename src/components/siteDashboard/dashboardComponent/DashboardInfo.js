import React, { Component, Fragment } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import uuid from "uuid/v4";
import ContentLoader from "react-content-loader";

const number = [
  0,
  20,
  40,
  60,
  80,
  100,
  120,
  140,
  160,
  180,
  200,
  220,
  240,
  260,
  280,
  300
];

const ListLoader = ({ className, number }) => (
  <ContentLoader
    height={350}
    width={500}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    className={className}
  >
    {number.map((num, i) => (
      <Fragment>
        <rect x="0" y={num} rx="0" ry="0" width="250" height="12" />
        <rect x="270" y={num} rx="0" ry="0" width="250" height="12" />
      </Fragment>
    ))}
  </ContentLoader>
);

const DashboardInfoItem = ({ meta }) => (
  <li>
    <p>
      <label>{meta.question_text} :</label> {meta.answer}
    </p>
  </li>
);

const DashboardInfo = ({ siteMetas }) => (
  <Fragment>
    <ListLoader className="info-wrap" number={number} />
    <PerfectScrollbar>
      <div className="info-wrap">
        <ul>
          {/* {siteMetas.map(meta => (
            <DashboardInfoItem meta={meta} key={uuid()} />
          ))} */}
        </ul>
      </div>
    </PerfectScrollbar>
  </Fragment>
);
export default DashboardInfo;
