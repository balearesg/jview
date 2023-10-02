import React, { MouseEvent } from "react";
import { useJViewContext } from "../../context";
import { IconButton } from "pragmate-ui/icons";
import { Switch } from "pragmate-ui/form";

export function Actions({ item }): JSX.Element {
    const { actions } = useJViewContext();
    if (!actions || typeof actions !== "object") return null;
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const { action } = event.currentTarget.dataset;
        if (!actions[action] || !actions[action]?.onClick || typeof actions[action]?.onClick !== 'function') return;
        actions[action].onClick(item);
    };
    return (
        <td>
            <div className="d-flex align-center actions-jview">
                {!!actions.status && <Switch />}
                {!!actions.delete && <IconButton icon="delete" data-action="delete" onClick={handleClick} />}
                {!!actions.edit && <IconButton data-action="edit" icon="pencil" onClick={handleClick} />}
            </div>
        </td>
    );
}
