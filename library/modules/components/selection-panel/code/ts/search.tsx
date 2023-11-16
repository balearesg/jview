import React, { ChangeEvent } from "react";
import { Icon } from "pragmate-ui/icons";
import { usePanelContext } from "./context";
import { table } from "./types";

export function Search(): JSX.Element {
  const { values, setValues, setStates, states, tables } = usePanelContext();
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: HTMLInputElement & EventTarget =
      event.currentTarget as HTMLInputElement;

    const search: string = value.toLowerCase();
    const newStates: Array<table> = tables.filter((table) =>
      table.label.toLowerCase().includes(search)
    );
    setValues({ ...values, [name]: value });
    setStates({ ...states, items: newStates });
  };
  return (
    <div className="content-input">
      <input
        type="search"
        name="search"
        value={values.search ?? ""}
        onChange={handleChange}
        placeholder="Buscar columnas"
      />
      <Icon icon="search" />
    </div>
  );
}
