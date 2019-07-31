import React from "react";
import { Fade } from "react-reveal";
import ReactLoader from "react-loader-spinner";

export const TableContentLoader = ({ row, column }) => (
  <div className="contentLoading">
    <div className="loading-list table-list">
      <div className="text no-thumb">
        {Array(row)
          .fill("")
          .map((el, ind) => (
            <div className="row" key={ind}>
              {Array(column)
                .fill("")
                .map((e, i) => (
                  <div className="col" key={i}>
                    <div className="loading-content" style={{ height: "15px" }}>
                      {" "}
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  </div>
);

export const GridContentLoader = ({ number, height }) => (
  <div className="contentLoading">
    <div className="loading-list grid-list">
      <div className="text no-thumb">
        <div className="row">
          {Array(number)
            .fill("")
            .map((e, i) => (
              <div className="col-lg-4 col-xs-4" key={i}>
                <div className="loading-content" style={{ height: height }}>
                  {" "}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

export const BlockContentLoader = ({ number, height }) => (
  <div className="contentLoading">
    <div className="loading-list block-list">
      <div className="text no-thumb">
        {Array(number)
          .fill("")
          .map((e, i) => (
            <div
              className="loading-content"
              style={{ height: height }}
              key={i}
            />
          ))}
      </div>
    </div>
  </div>
);

export const AvatarContentLoader = ({ number, width, size }) => (
  <>
    {Array(number)
      .fill("")
      .map((item, i) => (
        <div className="contentLoading" style={{ width: width }} key={i}>
          <div className="loading-list">
            <div className={`loading-image circle circle-${size}`}>​</div>
            <div className="text">
              <div className="loading-content" />
              <div className="loading-content" />
            </div>
          </div>
        </div>
      ))}
  </>
);

// export const ListContentLoader = ({ number }) => (
//   <div className="contentLoading">
//     <div className="loading-list">
//       <div className="text">
//         {Array(number)
//           .fill("")
//           .map((item, i) => (
//             <div
//               className="loading-content"
//               key={i}
//               style={{ height: "15px" }}
//             />
//           ))}
//       </div>
//     </div>
//   </div>
// );

export const DotLoader = ({ height }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      ...(height && { height: height })
    }}
  >
    <ReactLoader type="ThreeDots" color="#00628E" height="50" width="50" />
  </div>
);

export default props => (
  <Fade>
    <div className="fieldsight-popup open">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: 99999
        }}
      >
        <ReactLoader
          type="Ball-Triangle"
          color="#00628E"
          height="50"
          width="50"
        />

        <h6 style={{ color: "#00628E", marginTop: "20px" }}>
          Loading... Please wait!
          {/* Loading... Please wait! {props.loaded && `${props.loaded} %`} */}
        </h6>
      </div>
    </div>
  </Fade>
);
