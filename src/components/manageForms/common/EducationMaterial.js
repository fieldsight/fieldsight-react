import React from 'react';

const EducationMaterial = props => {
  const { formTable, item, editForm, toDrag } = props;
  if (formTable === 'project') {
    return (
      <span className={`${!!toDrag} ? disabled : ''`}>
        <a
          onClick={() => editForm(item.em, item.id)}
          tabIndex="0"
          role="button"
          onKeyDown={() => editForm(item.em, item.id)}
        >
          <i className="la la-book" />
          {item.em ? item.em.title : ''}
        </a>
      </span>
    );
  }
  if (formTable === 'site') {
    return (
      <span className={`${!!toDrag} ? disabled : ''`}>
        {!!item.site && (
          <a
            onClick={() => editForm(item.em, item.id)}
            tabIndex="0"
            role="button"
            onKeyDown={() => editForm(item.em, item.id)}
          >
            <i className="la la-book" />
            {item.em ? item.em.title : ''}
          </a>
        )}
      </span>
    );
  }
  return null;
};

export default EducationMaterial;
