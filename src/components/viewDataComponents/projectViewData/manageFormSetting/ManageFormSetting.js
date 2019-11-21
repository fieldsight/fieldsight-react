import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const sideNavRoutes = [
  {
    to: "/general",
    path: "/general",
    title: "General Forms",
    id: "app.generate-forms"
  },
  {
    to: "/scheduled",
    path: "/scheduled",
    title: "Scheduled Forms",
    id: "app.scheduled-form"
  },
  {
    to: "/stage",
    path: "/stage",
    title: "Staged Forms",
    id: "app.staged-form"
  }
];
const site_specific_forms = [
  {
    to: "/general-survey",
    path: "/general-survey",
    title: "General Forms",
    id: "app.generate-forms"
  }
];

const viewByStatus = [
  {
    to: "/rejected",
    path: "/rejected",
    title: "Rejected Submissions",
    id: "app.rejected-submissions"
  },
  {
    to: "/flagged",
    path: "/flagged",
    title: "Flagged Submissions",
    id: "app.flagged-submissions"
  },
  {
    to: "/pending",
    path: "/pending",
    title: "Pending Submissions",
    id: "app.pending-submissions"
  },
  {
    to: "/approved",
    path: "/approved",
    title: "Approved Submissions",
    id: "app.approved-submissions"
  }
];

class ManageFormSetting extends Component {
  render() {
    const {
      location: { pathname }
    } = this.props;

    return (
      <>
        {!this.props.show_submission && (
          <>
            <div className="manage_group">
              {/* <h5>Site Specific Forms</h5>*/}
              <h5>
                <FormattedMessage
                  id="app.site-specific-forms"
                  defaultMessage="Site Specific Forms"
                />
              </h5>
              <ul className="nav nav-tabs flex-column border-tabs">
                {sideNavRoutes.map((route, i) => (
                  <li className="nav-item" key={i}>
                    <Link
                      to={`/project-responses/${this.props.match.params.id}${route.to}`}
                      className={
                        this.props.location.pathname ==
                        `/project-responses/${this.props.match.params.id}${route.path}`
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      {/*route.title*/}
                      <FormattedMessage
                        id={route.id}
                        defaultMessage={route.title}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="manage_group mrt-15">
              {/*<h5>Project-Wide Forms</h5>*/}
              <h5>
                <FormattedMessage
                  id="app.project-wide-forms"
                  defaultMessage="Project-Wide Forms"
                />
              </h5>
              <ul className="nav nav-tabs flex-column border-tabs">
                {site_specific_forms.map((route, i) => (
                  <li className="nav-item" key={i}>
                    <Link
                      to={`/project-responses/${this.props.match.params.id}${route.to}`}
                      className={
                        this.props.location.pathname ==
                        `/project-responses/${this.props.match.params.id}${route.path}`
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      {/*route.title*/}
                      <FormattedMessage
                        id={route.id}
                        defaultMessage={route.title}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {!!this.props.show_submission && (
          <ul className="nav nav-tabs flex-column border-tabs">
            {viewByStatus.map((route, i) => (
              <li className="nav-item" key={i}>
                <Link
                  to={`/project-responses/${this.props.match.params.id}${route.to}`}
                  className={
                    this.props.location.pathname ==
                    `/project-responses/${this.props.match.params.id}${route.path}`
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  {/*route.title*/}
                  <FormattedMessage
                    id={route.id}
                    defaultMessage={route.title}
                  />
                </Link>
                <h5>{route.heading}</h5>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default withRouter(ManageFormSetting);
