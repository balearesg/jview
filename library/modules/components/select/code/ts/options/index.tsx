import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelectContext } from "../contex";
import { Empty } from "./empty";
import { ConfirmModal } from "pragmate-ui/modal";
import { Item } from "./item";

export function Options(): JSX.Element {
    const { options, manager } = useSelectContext();

    if (!manager.showOptions) return null;
    if (!options || !Array.isArray(options) || !options.length)
        return <Empty />;
    const output = options.map((item) => {
        return <Item key={uuidv4()} item={item} />
    });

    return (
        <div className="options">
            {output}
            {manager.confirmDelete && (
                <ConfirmModal
                    show
                    className="beauty-modal"
                    title="Eliminar"
                    text="Seguro que desea eliminar la configuración"
                    onClose={manager.handleConfirmDelete}
                    onCancel={manager.handleConfirmDelete}
                    onConfirm={manager.deleteOption}
                />
            )}
        </div>
    );
}
