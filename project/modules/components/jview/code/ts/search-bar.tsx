import React from "react";
import { Button, Form } from "pragmate-ui/form";
import { IconButton } from "pragmate-ui/icons";
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value) => void;
  onReset: () => void;
  label?: string;
  className?: string;
}
export /*bundle*/ function Searchbar(props: IProps) {
  function handleSubmit() {
    props.onSearch(props.value);
  }

  const { onSearch, onReset, label, className, ...inputProps } = props;

  const clsDefault = `jview-search-bar ${className}`;

  return (
    <Form className={clsDefault} onSubmit={handleSubmit}>
      <div className="search-border">
        <input
          placeholder="Buscar..."
          {...inputProps}
          className="search-input"
          max={`${inputProps.max}`}
        />
        <IconButton type="reset" onClick={onReset} icon="close" />
      </div>
      <Button
        icon="search"
        type="submit"
        className="btn btn-primary"
        label={label}
      />
    </Form>
  );
}
