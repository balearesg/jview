import React from "react";
import { useJViewContext } from "./context";
import { Select } from 'jview/input';
import config from "jview/config"
export function SelectEntries(): JSX.Element {
    const { load, total, state } = useJViewContext();
    const rowsJView = config.params.application.tables.rows
    const entiresNumber = [rowsJView, 25, 50, 100, 250].map((item) => ({ value: item, label: item }));
  
    const handleChange = ({ currentTarget }: React.ChangeEvent<HTMLSelectElement>): void => {
        const limit = parseInt(currentTarget.value);
        let pages: number;
        if (total <= limit) pages = 1;
        else pages = Math.ceil(total / limit);
        const loadItems = load && typeof load === "function" ? load : state.controller.changeItems
        loadItems({ limit, total, pages })
    };
    return (
        <div className="d-flex align-center select-items">
            Mostrar &nbsp;
            <Select onChange={handleChange} title="Select entries" options={entiresNumber} />
            &nbsp;
            Filas
        </div>

    );
}
