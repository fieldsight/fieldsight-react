import React, { PureComponent } from 'react';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';

export default class MetricsTable extends PureComponent {
  render() {
    const { attributes } = this.props;
    return (
      <div className="card-body">
        <label>Metrics</label>
        {attributes.length > 0 &&
          attributes.map(item => (
            <div key={item.id}>
              {!item.value && <label>{item.label}</label>}
              {!!item.value && item.value.label && (
                <label>{`${item.label} (${item.value.label})`}</label>
              )}
              {!!item.value &&
                item.value.selectedIndividualForm &&
                item.value.selectedForm.title && (
                  <label>{`${item.label}-${item.value.selectedForm.title} (${item.value.selectedIndividualForm.label})`}</label>
                )}
              {!!item.value &&
                item.value.selectedIndividualForm &&
                item.value.selectedForm.form_name && (
                  <label>{`${item.label}-${item.value.selectedForm.form_name} (${item.value.selectedIndividualForm.label})`}</label>
                )}
              {!!item.value &&
                item.value.selectedQuestion &&
                item.value.selectedForm.title && (
                  <label>{`${item.label}-${item.value.selectedForm.title} (${item.value.selectedQuestion.name}-${item.value.selectedQuestion.form.label})`}</label>
                )}
              {!!item.value &&
                item.value.selectedQuestion &&
                item.value.selectedForm.form_name && (
                  <label>{`${item.label}-${item.value.selectedForm.form_name}- (${item.value.selectedQuestion.name}-${item.value.selectedQuestion.form.label})`}</label>
                )}
            </div>
          ))}
      </div>
    );
  }
}
