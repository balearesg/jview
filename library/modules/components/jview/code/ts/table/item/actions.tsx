import React, { MouseEvent } from "react";
import { useJViewContext } from "../../context";
import { IconButton } from "pragmate-ui/icons";
import { Switch } from "pragmate-ui/form";
import { routing } from "@beyond-js/kernel/routing";

export function Actions({ item }): JSX.Element {
    const { actions, permissions } = useJViewContext();

    let isEdit = true;
    let isDelete = true;
    if (permissions && typeof permissions === "object") {
        const isPermissionWithState = !!permissions.stateId;
        const permission = isPermissionWithState
            ? permissions.statesPermissions.get(item.stateId)
            : permissions;
        isEdit =
            !!permission.writeP &&
            (permissions.additional ? !permissions.additional.includes(item.stateId) : true);
        isDelete = !!permission.deleteP;
    }
    if (!actions || typeof actions !== "object") return null;
    const handleOnEdit = () => {
        const url = `${actions.edit.url}/${item.id}${!isEdit ? "?read=true" : ""
            }`;
        routing.pushState(url);
    };
    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        const { action } = event.currentTarget.dataset;
        if (action === "edit" && !actions[action]?.onClick) {
            handleOnEdit();
            return;
        }
        if (
            !actions[action] ||
            !actions[action]?.onClick ||
            typeof actions[action]?.onClick !== "function"
        )
            return;
        actions[action].onClick(item);
    };
    const icon = isEdit ? "pencil" : "eye";

    return (
        <td>
            <div className="d-flex align-center actions-jview">
                {!!actions.status && isEdit && <Switch />}
                {!!actions.delete && isDelete && (
                    <IconButton
                        icon="delete"
                        data-action="delete"
                        onClick={handleClick}
                    />
                )}
                {!!actions.edit && (
                    <IconButton
                        data-action="edit"
                        icon={icon}
                        onClick={handleClick}
                    />
                )}
            </div>
        </td>
    );
}
