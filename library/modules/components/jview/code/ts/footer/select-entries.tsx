import React from "react";
import { useJViewContext } from "../context";
import { Select } from "@bgroup/jview/input";
export function SelectEntries(): JSX.Element {
  const { load, total, state, texts, rows, optionsChangeRows } = useJViewContext();
  const rowsJView = rows ?? 5;
  const [value, setValue] = React.useState(rowsJView);
  const options = optionsChangeRows ?? [rowsJView, 25, 50, 100, 250];
  React.useEffect(() => {
    setValue(rowsJView);
  }, [rows]);
  const entiresNumber = React.useMemo(() => {
    return options.map((item) => ({
      value: item,
      label: item,
    }));
  }, [])

  const handleChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLSelectElement>): void => {
    const limit = parseInt(currentTarget.value);
    state.controller.handleChangeRows({ limit })
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
