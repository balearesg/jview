import React, { SelectHTMLAttributes } from "react";

type option = {
  label: string;
  value: any;
};

interface props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: option[];
}
export /*bundle*/ function Select(props: props): JSX.Element {
  const { label, options, className } = props;
  const output: JSX.Element[] = options.map(
    (item: option): JSX.Element => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    )
  );
  const cls: string = `${className ?? "form-group-select"}`;
  const properties = Object.assign({}, props);
  delete properties.className;
  delete properties.label;
  delete properties.options;
  return (
    <div className={cls}>
      <label>{label}</label>
      <div>
        <select
          className="select"
          title={label}
          {...properties}
          id={props.name}
        >
          {output}
        </select>
        {/* <label htmlFor={props.name} className='arrow-drop-down'>
                    <AppIcon htmlFor={props.name} icon="arrowDropDown" />
                </label> */}
      </div>
    </div>
  );
}
