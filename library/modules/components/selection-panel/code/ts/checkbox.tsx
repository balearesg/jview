import React from 'react'
export function Checkbox({ values, handleChange, name, label }) {
 
    return (
        <div className="item-select form-group-checkboxes">
            <input
                style={{ display: "none" }}
                type="checkbox"
                className="inp-cbx"
                id={name}
                name={name}
                checked={values[name] ?? false}
                onChange={handleChange}
            />
            <label className="cbx" htmlFor={name}>
                <span>
                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                        <polyline points="1 5 4 8 11 1"></polyline>
                    </svg>
                </span>
                <span>{label}</span>
            </label>
        </div>
    );
};