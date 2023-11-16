import React from "react";
import { useSearchContext } from "../context";
import { Item } from "./item";

export function Items() {
    const { isFilter, filter } = useSearchContext();
    if (!isFilter) return null;
    const output: Array<JSX.Element> = filter.map(
        (item): JSX.Element => <Item key={item.id} item={item} />
    );
    return <>{output}</>;
}
