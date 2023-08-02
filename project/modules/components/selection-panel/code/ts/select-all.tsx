import React, { ChangeEvent } from "react";
import { usePanelContext } from "./context";
import { values } from "./types";
import { Checkbox } from "pragmate-ui/form";
export function SelectAll(): JSX.Element {
  const { selectAll, values, max, setValues } = usePanelContext();
  const isAllChecked = (): boolean => {
    const allValues: values = structuredClone(values);
    delete allValues.all;
    delete allValues.search;
    const checks = Object.values(allValues).filter(
      (table): boolean => table === true
    );
    const valid: boolean = checks.length === max ? true : false;
    return valid;
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked }: HTMLInputElement & EventTarget =
      event.currentTarget as HTMLInputElement;
    if (name === "all") {
      const allValues: values = { ...values };
  
      delete allValues.all;
      delete allValues.search;
      const sliceValues: Array<string> = Object.keys(allValues).slice(0, max);
      const endValues: Array<string> = Object.keys(allValues).slice(
        max,
        Object.keys(allValues).length
      );
      sliceValues.forEach((table) => {
        allValues[table] = checked;
      });
      endValues.forEach((table) => {
        allValues[table] = false;
      });
      setValues({ ...allValues, all: checked, search: values.search });
    }
  };

  return (
    <>
      {selectAll && (
        <div className="item-select-all">
          <Checkbox
            id="all"
            name="all"
            label="Seleccionar todos"
            checked={values.all && isAllChecked()}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
};