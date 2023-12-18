import { IEntry } from "./interfaces";

export const defaultColumns: IEntry[] = [
    {
        key: "timeCreated",
        order: "DESC",
        show: true,
        selected: "timeCreated",
        label: "Fecha"
    }
];

export const defaultField = "timeCreated"