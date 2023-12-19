import React from "react";
import { IconButton } from "pragmate-ui/icons";
import { iconDown } from "./icon-down";
import { useSelectContext } from "../contex";
export function Search() {
    const { manager } = useSelectContext();
    return (
        <div className="select-search">
            <input
                type="text"
                placeholder="Select"
                onChange={manager.handleChange}
                onFocus={manager.handleFocus}
                value={manager.value}
            />
            <div className="icon-search">
                <IconButton
                    onClick={manager.handleShow}
                    icon={iconDown.icon}
                    viewBox={iconDown.viewBox}
                />
            </div>
        </div>
    );
}
