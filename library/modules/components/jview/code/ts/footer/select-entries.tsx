import React from "react";
import { useJViewContext } from "../context";
import { Select } from "@bggroup/jview/input";
export function SelectEntries(): JSX.Element {
  const { load, total, state, texts, rows } = useJViewContext();
  const rowsJView = rows ?? 5;
  const [value, setValue] = React.useState(rowsJView);
  const entiresNumber = [rowsJView, 25, 50, 100, 250].map((item) => ({
    value: item,
    label: item,
  }));

  const handleChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLSelectElement>): void => {
    const limit = parseInt(currentTarget.value);
    let pages: number;
    if (total <= limit) pages = 1;
    else pages = Math.ceil(total / limit);
    const loadItems =
      load && typeof load === "function" ? load : state.controller.changeItems;
    loadItems({ limit, total, pages });
    setValue(limit);
  };
  return (
    <div className="d-flex align-center select-items">
      {texts.show} &nbsp;
      <Select
        onChange={handleChange}
        title="Select entries"
        options={entiresNumber}
        value={value}
        firstOption={null}
      />
      &nbsp;
      {texts.rows}. &nbsp;
    </div>
  );
}
