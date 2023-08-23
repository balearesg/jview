import React, { MouseEvent } from "react";
import { SelectionPanel } from "jview/selection-panel";
import { useJViewContext } from "./context";
import { Button } from "pragmate-ui/form";
import { Search } from "./search";

export function Header() {
  const { title, isSearch, search, actions, panel, texts } = useJViewContext();

  const clsHeader =
    !!actions?.create && !!actions?.create?.label
      ? "search-create "
      : "header-top";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (
      !actions?.create ||
      !actions?.create.onClick ||
      typeof actions?.create.onClick !== "function"
    )
      return;
    actions?.create.onClick(event);
  };
  return (
    <header>
      {title && <h4 className="title-jview">{title}:</h4>}
      <div className={clsHeader}>
        {isSearch && <Search {...search} />}
        <div className="d-flex head-buttons">
          {!!panel && <SelectionPanel {...panel} />}
          {actions?.export && (
            <Button
              label={texts.export}
              className="btn btn-primary create-button"
            />
          )}

          {!!actions?.create && (
            <Button
              onClick={handleClick}
              label={actions?.create.label}
              className="btn btn-primary create-button"
            />
          )}

        </div>
      </div>
    </header>
  );
}
