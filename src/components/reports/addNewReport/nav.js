import React from 'react';

const Nav = ({ breadcrumb, isEdit, reportName }) => (
  <nav aria-label="breadcrumb" role="navigation">
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <a href={breadcrumb.name_url} style={{ color: '#00628E' }}>
          {breadcrumb.name}
        </a>
      </li>
      {isEdit && <li className="breadcrumb-item">{reportName}</li>}
      <li className="breadcrumb-item">
        {isEdit ? 'Edit Report' : 'Create Report'}
      </li>
    </ol>
  </nav>
);

export default Nav;
