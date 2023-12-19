import { MutableRefObject, useEffect } from "react";
import { ITable, IValues } from "../types";
import { usePanelContext } from "../context";

export function customHooks() {
    const {
        container,
        setShow,
        init,
        setValues,
        max,
        tables,
        setInit,
        entity,
    } = usePanelContext();
    useEffect((): void => {
        const confTables = !!localStorage.getItem(entity)
            ? JSON.parse(localStorage.getItem(entity))
            : tables.slice(0, max);

        const keys: Array<string> = confTables.map(
            (item: ITable): string => item.key ?? item.id
        );
        tables.forEach((table) => {
            init[table.id] = keys.includes(table.id);
        });
        const allValues: IValues = { ...init };

        delete allValues.all;
        delete allValues.search;
        const checks = Object.values(allValues).filter(
            (table): boolean => table === true
        );
        setInit({ ...init, all: checks.length === max });
        setValues({ ...init, all: checks.length === max });
    }, [tables]);

    useEffect((): (() => void) => {
        const handleClick = (event: any): void => {
            const { current }: MutableRefObject<HTMLDivElement> = container;
            const isSameNode: boolean =
                current === event.target ||
                current === event.currentTarget ||
                event.composedPath()[0] === current;
            const isAChildren: boolean = current?.contains(
                event.composedPath()[0]
            );
            if (!isSameNode && !isAChildren) setShow(false);
        };
        document.addEventListener("click", handleClick);
        return (): void => document.removeEventListener("click", handleClick);
    }, []);
}
