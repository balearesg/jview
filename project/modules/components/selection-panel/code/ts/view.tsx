import React, { SyntheticEvent } from "react";
import { IconButton } from "pragmate-ui/icons";
import { usePanelContext } from "./context";
import { table } from "./types";
import { Search } from "./search";
import { SelectAll } from "./select-all";
import { Checkboxes } from "./checkboxes";
import { Message } from "./message";
import { Buttons } from "./buttons";
import { iconPanel } from "./icon";

export function View(): JSX.Element {
  const {
    container,
    setShow,
    setStates,
    setValues,
    show,
    values,
    tables,
    setInit,
    save,
    states,
    entity
  } = usePanelContext();
  const handleClick = (): void => setShow(!show);
  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, Event>
  ): Promise<void> => {
    event.preventDefault();
    const validCheck: boolean = tables.some(
      (table): boolean => values[table.id] === true
    );
   
    if (!validCheck) return;
    const newConfig: Array<table> = tables.filter(
      (table): boolean => values[table.id] === true
    );
 
    if (entity) localStorage.setItem(entity, JSON.stringify(newConfig))
    save && save(newConfig);
    setInit({ ...values });
    setShow(false);
  };
  const cls: string = show
    ? "show content-selection"
    : "hide-selection content-selection";

  const clear = (): void => {
    tables.forEach((table) => {
      values[table.id] = false;
    });
    setValues({ ...values, all: false, search: "" });
    setStates({ ...states, items: states.originalItems });
  };

  return (
    <div ref={container} className="container-selection">
      <span className="tooltip-item bottom"
        data-tooltip="Panel de selección">
        <IconButton
          {...iconPanel}
          onClick={handleClick}
          className="icon-header"
          data-tooltip="Panel de selección"
        />
      </span>

      <form className={cls} autoComplete="off" onSubmit={handleSubmit}>
        <Search />
        <div className="all-clear">
          <SelectAll />
          <div className="item-clear">
            <IconButton icon="close" onClick={clear} />
            <span onClick={clear}>Limpiar</span>
          </div>
        </div>
        <div className="content-items">
          <Checkboxes />
        </div>
        <Message />
        <Buttons />
      </form>
    </div>
  );
}
