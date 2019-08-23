import React from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DotLoader } from "../../myForm/Loader";
import { BlockContentLoader } from "../../common/Loader";

// const data = {
//   stages: [
//     {
//       name: "stage1",
//       sub_stages: [
//         {
//           rejected: 0,
//           flagged: 0,
//           progress: 0,
//           form_name: "location form",
//           approved: 0,
//           pending: 2
//         },
//         {
//           rejected: 0,
//           flagged: 0,
//           progress: 0,
//           form_name: "simple form",
//           approved: 0,
//           pending: 1
//         }
//       ]
//     },
//     {
//       name: "Stage 2",
//       sub_stages: [
//         {
//           rejected: 0,
//           flagged: 0,
//           progress: 0,
//           form_name: "stage ko form",
//           approved: 0,
//           pending: 1
//         }
//       ]
//     }
//   ],
//   generals: [
//     {
//       name: "general form 2",
//       progress_data: [
//         {
//           progress: 0,
//           approved: 0,
//           rejected: 0,
//           pending: 2,
//           flagged: 0
//         }
//       ]
//     },
//     {
//       name: "general form1212",
//       progress_data: [
//         {
//           progress: 100,
//           approved: 1,
//           rejected: 0,
//           pending: 0,
//           flagged: 0
//         }
//       ]
//     }
//   ],
//   schedules: [
//     {
//       name: "Weekly form",
//       progress_data: [
//         {
//           progress: 0,
//           approved: 0,
//           rejected: 0,
//           pending: 2,
//           flagged: 0
//         }
//       ]
//     }
//   ]
// };
const ShowParent = ({ id, name }) => (
  <tr className="heading-row">
    <td>{id}</td>
    <td>{name}</td>
    <td />
    <td />
    <td />
    <td />
    <td />
  </tr>
);
const ShowChild = ({
  sn,
  id,
  name,
  progress,
  pending,
  approved,
  flagged,
  rejected
}) => {
  return (
    <tr className="sub-row" key={`${sn}_${id + 1}`}>
      <td>
        {sn}.{id + 1}
      </td>
      <td>{name}</td>
      <td>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="80"
            aria-valuemin="0"
            aria-valuemax="200"
            style={{
              width: progress + "%"
            }}
          >
            <span className="progress-count">{progress}%</span>
          </div>
        </div>
      </td>
      <td>{pending}</td>
      <td>{approved}</td>
      <td>{flagged}</td>
      <td>{rejected}</td>
    </tr>
  );
};

const CheckCase = ({ sub, id }) => {
  if (sub.name) {
    return (
      <>
        <tr className="sub-row" key={`stage_${id}`}>
          <td>{id}</td>
          <td>{sub.name}</td>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        {sub.sub_stages &&
          sub.sub_stages.length > 0 &&
          sub.sub_stages.map((item, key) => {
            return (
              <ShowChild
                sn={id}
                id={key}
                name={item.form_name}
                progress={item.progress}
                pending={item.pending}
                approved={item.approved}
                flagged={item.flagged}
                rejected={item.rejected}
              />
            );
          })}
      </>
    );
  }
};
class ProgressTable extends React.Component {
  render() {
    const { data, loader } = this.props;
    const sn = 1;
    return (
      <>
        {loader ? (
          <BlockContentLoader number={10} height="25px" />
        ) : (
          <div className="card-body">
            <div style={{ position: "relative", height: "400px" }}>
              <PerfectScrollbar>
                <Table
                  responsive="xl"
                  className="table  table-bordered  dataTable "
                >
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Name</th>
                      <th>Progress</th>
                      <th>Pending</th>
                      <th>Approved</th>
                      <th>Flagged</th>
                      <th>Rejected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!!data.generals && <ShowParent id={sn} name="Generals" />}
                    {!!data.generals &&
                      data.generals.map((general, id) => (
                        <ShowChild
                          sn={sn}
                          id={id}
                          name={general.name}
                          progress={general.progress_data[0].progress}
                          pending={general.progress_data[0].pending}
                          approved={general.progress_data[0].approved}
                          flagged={general.progress_data[0].flagged}
                          rejected={general.progress_data[0].rejected}
                        />
                      ))}
                    {!!data.schedules && (
                      <ShowParent id={sn + 1} name="Schedules" />
                    )}
                    {!!data.schedules &&
                      data.schedules.map((schedule, id) => (
                        <ShowChild
                          sn={sn + 1}
                          id={id}
                          name={schedule.name}
                          progress={schedule.progress_data[0].progress}
                          pending={schedule.progress_data[0].pending}
                          approved={schedule.progress_data[0].approved}
                          flagged={schedule.progress_data[0].flagged}
                          rejected={schedule.progress_data[0].rejected}
                        />
                      ))}
                    {!!data.stages && <ShowParent id={sn + 2} name="Stages" />}
                    {!!data.stages &&
                      data.stages.map((sub, id) => {
                        const snId = sn + 2 + "." + (id + 1);
                        return <CheckCase sub={sub} id={snId} />;
                      })}
                  </tbody>
                </Table>
              </PerfectScrollbar>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default ProgressTable;
