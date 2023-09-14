import React from "react";
import { useJViewContext } from "../../context";
import { IconButton } from "pragmate-ui/icons";
import { Switch } from "pragmate-ui/form";

export function Actions(): JSX.Element {
    const { actions } = useJViewContext();
    if (!actions || typeof actions !== "object") return null;
    return (
        <td>
            <div className="d-flex align-center actions-jview">
                {!!actions.status && <Switch />}
                {!!actions.delete && <IconButton icon="delete" />}
                {!!actions.edit && <IconButton icon="pencil" />}
            </div>
        </td>
    );
}
