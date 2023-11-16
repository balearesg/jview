import React from "react";
import { Icon } from "pragmate-ui/icons";
import { usePanelContext } from "./context";

export function Message(): JSX.Element {
  const { max, isMax } = usePanelContext();
  return (
    <>
      {isMax && (
        <div className="content-alert">
          <div className="alert-selection">
            <Icon icon="exclamation-gt" />
            <span>
              Puede selecionar {max} columnas como máximo y una como mínimo
            </span>
          </div>
        </div>
      )}
    </>
  );
}
