import React, { Component } from 'react';
import { BlockContentLoader } from '../common/Loader';
import PerfectScrollbar from 'react-perfect-scrollbar';

class Submissions extends Component {
  render() {
    const { submissionLoader, submission } = this.props;
    return (
      <div className="">
        {submissionLoader && (
          <BlockContentLoader height="20px" number={23} />
        )}
        {!submissionLoader && (
          <div className="thumb-list mr-0">
            <ul style={{ position: 'relative', height: '650px' }}>
              {submission.length === 0 && <p>No Data Available</p>}
              <PerfectScrollbar>
                {submission.map((sub, i) => (
                  <li key={i}>
                    {/* <figure>
                <img src="" alt="profile" />
             
                </figure> */}
                    <div className="content">
                      <p>
                        <a href={sub.profile}>{sub.submitted_by}</a>{' '}
                        submitted a response for{' '}
                        <a href={sub.form_url}>
                          <b>{sub.form_name}</b>
                        </a>{' '}
                        in{' '}
                        <a href={sub.extra_object_url}>
                          <b>{sub.extra_object}</b>
                        </a>
                      </p>
                      <time>
                        <i className="la la-clock" /> {sub.date}
                      </time>
                    </div>
                  </li>
                ))}
              </PerfectScrollbar>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Submissions;
