import React from "react";
import { usePanelContext } from "../context";
import { Item } from "./item";
import { v4 as uuidv4 } from "uuid";

export function Checkboxes(): JSX.Element {
    const { states } = usePanelContext();

    const output: JSX.Element[] = React.useMemo(() => {
        return states.items.map((table): JSX.Element => {
            return <Item key={uuidv4()} table={table} />;
        });
    }, [states.count]);
    return <div>{output}</div>;
}
