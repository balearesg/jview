import React from "react";
import { Input, Select } from "@bggroup/jview/input";
import { useSearchContext } from "../context";

export function Item({ item }) {
    const { state, handleChange } = useSearchContext();
    if (item.type === "select") {
        return (
            <Select
                name={item.identifier}
                options={item.options}
                label={item.name}
                value={state[item.identifier] ?? ""}
                onChange={handleChange}
            />
        );
    }
    return (
        <Input
            type="text"
            name={item.identifier}
            label={item.name}
            value={state[item.identifier] ?? ""}
            onChange={handleChange}
        />
    );
}
