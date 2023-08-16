import React, { MouseEvent } from "react";
import { SelectionPanel } from "jview/selection-panel";
import { useJViewContext } from "./context";
import { Button } from "pragmate-ui/form";
import { Searchbar } from "./search-bar";
import { Search } from "./search";

export function Header() {
  const {
    title,
    isSearch,
    search,
    create,
    panel
  } = useJViewContext();
  const clsHeader =
    !!create && !!create?.label ? "search-create " : "header-top";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!create || !create.onClick || typeof create.onClick !== "function")
      return;
    create.onClick(event);
  };
  return (
    <header>
      {title && <h4>{title}:</h4>}
      <div className={clsHeader}>
        {isSearch && <Search {...search} />}
        <div className="d-flex head-buttons">
          {!!panel && <SelectionPanel {...panel} />}
          {!!create && (
            <Button
              onClick={handleClick}
              label={create.label}
              className="btn btn-primary create-button"
            />
          )}
        </div>

      </div>
    </header>
  );
}
