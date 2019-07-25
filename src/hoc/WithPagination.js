import React, { Component } from "react";
import axios from "axios";

const project_id = window.project_id ? window.project_id : 137;

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const withPagination = WrappedComponent => {
  class WithPagination extends Component {
    state = {
      siteList: [],
      totalCount: 0,
      toData: 200,
      fromData: 1,
      pageNum: 1,
      dLoader: true,
      per_page: 200,
      totalPage: null,
      textVal: null
    };

    getUrl = (page_num, type) => {
      switch (type) {
        case "projectSiteList":
          return `fv3/api/project-site-list/?page=${page_num}&project=${project_id}`;
      }
    };

    requestHandler = paginateUrl => {
      this._isMounted = true;
      axios
        .get(`${paginateUrl}`)

        .then(res => {
          if (this._isMounted) {
            if (res.status === 200) {
              if (res.data.results.query === null) {
                this.setState({
                  siteList: res.data.results.data,
                  dLoader: false,
                  totalCount: res.data.count,
                  textVal: null,
                  totalPage: Math.ceil(res.data.count / 200)
                });
              } else {
                if (res.data.results.query == this.state.textVal) {
                  this.setState({
                    siteList: res.data.results.data,
                    dLoader: false,
                    totalCount: res.data.count,
                    textVal: null,
                    totalPage: Math.ceil(res.data.count / 200)
                  });
                }
              }
            }
          }
        })
        .catch(err => {});
    };

    paginationHandler = (page_num, searchUrl, type) => {
      const toNum = page_num * 200;
      const fromNum = (page_num - 1) * 200 + 1;
      let paginateUrl;

      if (searchUrl) {
        paginateUrl = searchUrl;
      } else {
        paginateUrl = this.getUrl(page_num, type);
      }

      this.setState(
        {
          toData: toNum,
          fromData: fromNum,
          pageNum: page_num,
          dLoader: true
        },
        () => this.requestHandler(paginateUrl)
      );
    };

    renderPageNumbers = type => {
      if (this.state.totalPage) {
        const pageNumbers = [];
        for (let i = 1; i <= this.state.totalPage; i++) {
          pageNumbers.push(i);
        }

        return pageNumbers.map(number => {
          let classes = this.state.pageNum === number ? "current" : "";

          if (
            number == 1 ||
            number == this.state.totalPage ||
            (number >= this.state.pageNum - 2 &&
              number <= this.state.pageNum + 2)
          ) {
            return (
              <li key={number} className={classes}>
                {" "}
                <a onClick={e => this.paginationHandler(number, null, type)}>
                  {number}
                </a>
              </li>
            );
          }
        });
      }
    };

    searchHandler = (searchValue, searchUrl, type) => {
      if (searchValue) {
        this.setState({
          textVal: searchValue
        });
        this.paginationHandler(1, searchUrl);
      } else {
        this.setState({
          pageNum: 1,
          textVal: null
        });
        this.paginationHandler(1, null, type);
      }
    };

    render() {
      const {
        state,
        searchHandler,
        renderPageNumbers,
        paginationHandler,
        requestHandler
      } = this;
      return (
        <WrappedComponent
          {...this.props}
          {...state}
          projectId={project_id}
          searchHandler={searchHandler}
          renderPageNumbers={renderPageNumbers}
          paginationHandler={paginationHandler}
          requestHandler={requestHandler}
        />
      );
    }

    componentWillUnmount() {
      this._isMounted = false;
    }
  }

  WithPagination.displayName = `WithPagination(${getDisplayName(
    WrappedComponent
  )})`;

  return WithPagination;
};

export default withPagination;
