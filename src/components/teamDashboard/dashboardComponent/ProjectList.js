import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

const imgUrl = "https://naxafieldsight.s3.amazonaws.com/";
class ProjectList extends Component {
  render() {
    const { projects } = this.props;
    return (
      <div className="card-body">
        <div
          className="thumb-list mr-0"
          style={{ position: "relative", height: "360px" }}
        >
          <PerfectScrollbar>
            <ul>
              {projects.length > 0 &&
                projects.map((each, index) => (
                  <li key={index}>
                    <figure>
                      <img src={`${imgUrl}${each.logo}`} alt="pf" />
                    </figure>
                    <div className="content">
                      <h6>
                        <a
                          href={`/fieldsight/application/#/project-dashboard/${each.id}`}
                        >
                          {each.name}{" "}
                        </a>
                      </h6>
                      {each.address && <span>{each.address}</span>}
                    </div>
                  </li>
                ))}
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
}
export default ProjectList;
