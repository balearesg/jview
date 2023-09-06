import React, { MouseEvent } from "react";
import { useJViewContext } from "./context";
import { IconButton } from "pragmate-ui/icons";

export function Head() {
  const { dataHead, actions, state } = useJViewContext();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (
      !actions.order ||
      !actions.order?.onClick ||
      typeof actions.order?.onClick !== "function"
    ) {
      state.controller.changeOrder(event);
      return;
    }
    actions.order.onClick(event);
  };
  const heads: JSX.Element[] =
    dataHead &&
    dataHead.map((item): JSX.Element => {
      return (
        <th key={item.id}>
          <span className="arrow-order">
            {item.label}
            {!!actions?.order && (
              <IconButton
                icon={state.controller.icon(item.id)}
                data-key={item.id}
                onClick={handleClick}
              />
            )}
          </span>
        </th>
      );
    });
  return <>{heads}</>;
}
