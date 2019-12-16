import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import format from "date-fns/format";
import uuid from "uuid/v4";
import { BlockContentLoader } from "../common/Loader";

class TaskHandler extends Component {


  populatemytasklist = data => {
    let obj = {
      status: ' has failed.',
      icon: "la la-times-circle",
      title: "Failed",
      div_class: "task-error",
      div_subclass: "text-danger",
      error_msg: "<b>Error message:</b> " + data.description + "<br/><br/>"
    }

    switch (data.status) {
      case 0:
        return {
          ...obj,
          status: ' has been added to Queue.',
          icon: "la la-hourglass-1",
          title: "Added",
          div_class: "task-pending",
          div_subclass: "text-warning",
        }
      case 1:
        return {
          ...obj,
          status: ' has been started.',
          icon: "la la-hourglass-2",
          title: "Started",
          div_class: "task-ongoing",
          div_subclass: "text-info",
        }
      case 2:
        return {
          ...obj,
          status: ' has completed.',
          icon: "la la-check-circle",
          title: "Completed",
          div_class: "task-success",
          div_subclass: "text-success",
        }
      default: return obj
    }
  }

  getTaskContent = (data) => {
    let content = "";
    switch (data.task_type) {

      case 0:
        if (data.terms_and_labels != null) {
          content =
            "Bulk " + data.terms_and_labels.site +
            " Update " + "<a href='" + data.get_event_url + "'>" +
            data.get_event_name + "</a>" + status;
        }
        return content;

      case 2:
        if (data.terms_and_labels != null) {
          content =
            "User Assign to " +
            data.terms_and_labels.site + "<a href='" +
            data.get_event_url + "'>" + data.get_event_name +
            "</a>" + status;
        }
        return content;

      case 3:
        if (data.terms_and_labels != null) {
          content =
            data.terms_and_labels.site +
            " Response Xls Report " + "<a href='" +
            data.get_event_url + "'>" + data.get_event_name + "</a>" + status;
        }
        return content;

      case 4:
        if (data.terms_and_labels != null) {
          content =
            data.terms_and_labels.site +
            " Import " + "<a href='" + data.get_event_url +
            "'>" + data.get_event_name + "</a>" + status;
        }
        return content;
      case 6:
        if (data.terms_and_labels != null) {
          content =
            "Zip " + data.terms_and_labels.site +
            " Image " + "<a href='" + data.get_event_url +
            "'>" + data.get_event_name + "</a>" + status;
        }
        return content;

      case 8:
        if (data.terms_and_labels != null) {
          content =
            data.terms_and_labels.site +
            " Data Export of " + "<a href='" +
            data.get_event_url + "'>" + data.get_event_name + "</a>" + status;
        }
        return content;
      case 10:
        if (data.terms_and_labels != null) {
          content =
            data.terms_and_labels.site +
            " Progress Xls Report Image " + "<a href='" +
            data.get_event_url + "'>" + data.get_event_name + "</a>" + status;
        }
        return content;

      case 13:
        if (data.terms_and_labels != null) {
          content =
            "User Assign to " + data.terms_and_labels.region +
            "<a href='" + data.get_event_url + "'>" +
            data.get_event_name + "</a>" + status;
        }
        return content;
      default:
        return content = data.get_task_type_display +
          " of " + "<a href='" + data.get_event_url + "'>" +
          data.get_event_name + "</a>" + status;;
    }
  };

  render() {
    const {
      props: { tasks, showContentLoader, handleDownloadFile },
      getTaskContent,
    } = this;
    return (
      <div
        className="tab-pane active"
        id="role"
        role="tabpanel"
        aria-labelledby="role_tab"
      >
        <div
          className="thumb-list mr-0 "
          style={{ position: "relative", height: "314px" }}
        >
          {showContentLoader ? (
            <BlockContentLoader number={2} height="150px" />
          ) : (
              <PerfectScrollbar>
                {tasks.length > 0 ? (
                  
                    <ul className="notification-menu">
                      {tasks.map(task => {
                        const resp = this.populatemytasklist(task)
                        return (
                          <li key={task.id}>
                            <a>
                              <figure>
                                <i className={resp.icon} />
                              </figure>
                              <div className="notify-info">
                                <p dangerouslySetInnerHTML={{
                                  __html: getTaskContent(task)
                                }}
                                />

                                <span className="time">
                                  {`Added on ${format(task.date_added, ["MMMM, DD, YYYY, h:mm a"])}`}
                                </span>
                                {task.file && <div className="download-file"
                                  onClick={() => { handleDownloadFile(task.file) }}>
                                  <b>download file</b>
                                </div>}
                              </div>
                            </a>
                          </li>
                        );
                      })}
                      {/* <li className="dropdown-footer">
                        <a className="text-center" >
                          <span>View All</span>
                          <span>Mark all as seen</span> </a>
                      </li> */}
                    </ul>
                 
                )
                  : (
                    <p> No Data Available </p>
                  )}
              </PerfectScrollbar>
            )}
        </div>
      </div>
    );
  }
}
export default TaskHandler;
