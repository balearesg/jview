import React, {
  useEffect,
  useRef,
  useState,
  MutableRefObject,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  PropsWithChildren,
  ForwardedRef,
} from "react";
import { props, state, table, values } from "./types";
import { PanelContext } from "./context";
import { View } from "./view";

export /*bundle*/
  const SelectionPanel: ForwardRefExoticComponent<
    props & RefAttributes<unknown>
  > = forwardRef(
    (
      props: PropsWithChildren<props & RefAttributes<unknown>>,
      ref: ForwardedRef<unknown>
    ): JSX.Element => {
      const { tables, save, max, isMax, selectAll, entity } = props;

      const [show, setShow] = useState<boolean>(false);

      const [init, setInit] = useState<values>({ search: "", all: false });

      const [values, setValues] = useState<values>({ search: "", all: false });

      const [states, setStates] = useState<state>({
        items: Array.from(tables),
        originalItems: Array.from(tables),
      });

      const container: MutableRefObject<HTMLDivElement> =
        useRef<HTMLDivElement>(null);

      useEffect((): void => {
        const confTables = !!localStorage.getItem(entity)
          ? JSON.parse(localStorage.getItem(entity))
          : tables.slice(0, max);

        const keys: Array<string> = confTables.map(
          (item: table): string => item.key ?? item.id
        );
        tables.forEach((table) => {
          init[table.id] = keys.includes(table.id);
        });
        const allValues: values = { ...init };

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
          const isAChildren: boolean = current?.contains(event.composedPath()[0]);
          if (!isSameNode && !isAChildren) setShow(false);
        };
        document.addEventListener("click", handleClick);
        return (): void => document.removeEventListener("click", handleClick);
      }, []);

      const value = {
        values,
        setValues,
        states,
        setStates,
        tables,
        selectAll,
        max,
        isMax,
        show,
        setShow,
        container,
        setInit,
        save,
        init,
        entity
      };
      return (
        <PanelContext.Provider value={value}>
          <View />
        </PanelContext.Provider>
      );
    }
  );

SelectionPanel.defaultProps = {
  entity: "operations",
  max: 9,
  isMax: true,
  selectAll: true,
};
