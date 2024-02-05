import React, { SelectHTMLAttributes } from "react";
import { Icon } from "pragmate-ui/icons";

type option = {
  label: string;
  value: any;
};

interface props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: option[];
  firstOption?: string;
}
export /*bundle*/ function Select(props: props): JSX.Element {
  const { label, options, className, firstOption } = props;
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
  delete properties.firstOption;
  const down = {
    icon: `<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>`,
    viewBox: "0 0 512 512"
  }
  return (
    <div className={cls}>
      <label>{label}</label>
      <select
        className="select"
        title={label}
        {...properties}
        id={properties.name}
        value={properties.value ?? ""}
        name={properties.name}
      >
        {firstOption !== null && <option value="">{firstOption ?? label}</option>}
        {output}
      </select>
      <Icon icon={down} />

      {
        properties.required && (
          <span className="beyond-input__required-label">(*)</span>
        )
      }
    </div >
  );
}
