import React, { Component } from 'react';
import axios from 'axios';

/* eslint-disable camelcase */

/* eslint-disable consistent-return */

/* esling-disable array-callback-return */

const getDisplayName = WrappedComponent => {
  return (
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'
  );
};

const withPagination = WrappedComponent => {
  class WithPagination extends Component {
    constructor(props) {
      super(props);

      this.state = {
        siteList: [],
        totalCount: 0,
        toData: 200,
        fromData: 1,
        pageNum: 1,
        dLoader: true,
        per_page: 200,
        totalPage: null,
        textVal: null,
        form_id_string: '',
        is_survey: false,
        breadcrumbs: {},
      };
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    getUrl = (page_num, payload) => {
      switch (payload.type) {
        case 'projectSiteList':
          return `fv3/api/project-site-list/?page=${page_num}&project=${payload.projectId}`;
        case 'mySiteList':
          return `fv3/api/my-sites/?page=${page_num}&project=${payload.projectId}`;

        case 'regionSite':
          return `fv3/api/regional-sites/?page=${page_num}&region=${payload.projectId}`;

        case 'projectRegionList':
          return `fv3/api/project-regions/?page=${page_num}&project=${payload.projectId}`;

        case 'viewByStatus':
          return `fv3/api/view-by-status/?page=${page_num}&project=${payload.projectId}&submission_status=${payload.status}`;
        case 'siteStatus':
          return `fv3/api/view-by-status/?page=${page_num}&site=${payload.projectId}&submission_status=${payload.status}`;
        case 'formSubmission':
          return `/fv3/api/forms-submissions/?page=${page_num}&project=${payload.projectId}&fsxf_id=${payload.fsxf_id}`;
        case 'siteSubmission':
          return `/fv3/api/forms-submissions/?page=${page_num}&site=${payload.projectId}&fsxf_id=${payload.fsxf_id}`;
        default:
          return null;
      }
    };

    requestHandler = paginateUrl => {
      this.mounted = true;
      axios
        .get(`${paginateUrl}`)

        .then(res => {
          if (this.mounted) {
            if (res.status === 200) {
              // if (res.data.results.query === null) {
              //   this.setState({
              //     siteList: res.data.results.data,
              //     dLoader: false,
              //     totalCount: res.data.count,
              //     textVal: null,
              //     totalPage: Math.ceil(res.data.count / 200)
              //   });
              // } else {
              //   if (res.data.results.query == this.state.textVal) {
              //     this.setState({
              //       siteList: res.data.results.data,
              //       dLoader: false,
              //       totalCount: res.data.count,
              //       textVal: null,
              //       totalPage: Math.ceil(res.data.count / 200)
              //     });
              //   }
              // }

              if (res.data.results.query) {
                const { textVal } = this.state;
                if (res.data.results.query === textVal) {
                  this.setState({
                    siteList: res.data.results.data,
                    dLoader: false,
                    totalCount: res.data.count,
                    textVal: null,
                    totalPage: Math.ceil(res.data.count / 200),
                  });
                }
              } else {
                this.setState({
                  siteList: res.data.results.data,
                  dLoader: false,
                  totalCount: res.data.count,
                  textVal: null,
                  form_id_string: res.data.results.form_id_string,
                  breadcrumbs: res.data.results.breadcrumbs,
                  totalPage: Math.ceil(res.data.count / 200),
                  is_survey: res.data.results.is_survey,
                });
              }
            }
          }
        })
        .catch(() => {});
    };

    paginationHandler = (page_num, searchUrl, payload) => {
      const toNum = page_num * 200;
      const fromNum = (page_num - 1) * 200 + 1;
      let paginateUrl;

      if (searchUrl) {
        paginateUrl = searchUrl;
      } else {
        paginateUrl = this.getUrl(page_num, payload);
      }
      this.setState(
        {
          toData: toNum,
          fromData: fromNum,
          pageNum: page_num,
          dLoader: true,
        },
        () => this.requestHandler(paginateUrl),
      );
    };

    renderPageNumbers = payload => {
      const { totalPage, pageNum } = this.state;
      if (totalPage) {
        const pageNumbers = [];
        for (let i = 1; i <= totalPage; i += 1) {
          pageNumbers.push(i);
        }

        pageNumbers.map(number => {
          const classes = pageNum === number ? 'current' : '';

          if (
            number === 1 ||
            number === totalPage ||
            (number >= pageNum - 2 && number <= pageNum + 2)
          ) {
            return (
              <li key={number} className={classes}>
                <a
                  tabIndex="0"
                  role="button"
                  onKeyDown={() => {
                    this.paginationHandler(number, null, payload);
                  }}
                  onClick={() => {
                    this.paginationHandler(number, null, payload);
                  }}
                >
                  {number}
                </a>
              </li>
            );
          }
          return null;
        });
      }
    };

    searchHandler = (searchValue, searchUrl, payload) => {
      if (searchValue) {
        this.setState({
          textVal: searchValue,
        });
        this.paginationHandler(1, searchUrl, payload);
      } else {
        this.setState({
          pageNum: 1,
          textVal: null,
        });
        this.paginationHandler(1, null, payload);
      }
    };

    render() {
      const {
        state,
        searchHandler,
        renderPageNumbers,
        paginationHandler,
        requestHandler,
      } = this;
      return (
        <WrappedComponent
          {...this.props}
          {...state}
          searchHandler={searchHandler}
          renderPageNumbers={renderPageNumbers}
          paginationHandler={paginationHandler}
          requestHandler={requestHandler}
        />
      );
    }
  }

  WithPagination.displayName = `WithPagination(${getDisplayName(
    WrappedComponent,
  )})`;

  return WithPagination;
};

export default withPagination;
