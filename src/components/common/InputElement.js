import React from 'react'

const InputElement = ({ tag: Tag, formType, type, required, label, htmlFor, value }) => (
    <div className="form-group">
        {formType === "editForm" && <label htmlFor={htmlFor}>{label} {required && <sup>*</sup>}</label>}
        <Tag type={type} className="form-control" required={required} value={value} />
        {formType === "floatingForm" && <label htmlFor={htmlFor}>{label}</label>}
    </div>
)

export default InputElement