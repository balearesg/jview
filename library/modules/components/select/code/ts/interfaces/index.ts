import { ChangeEvent, MutableRefObject } from "react";
import { Manager } from "../manager";

export type IOption = {
    label: string,
    value: string | number
};

export type IOptions = Array<IOption>

export interface IProps {
    options?: IOptions,
    placeholder?: string,
    value?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => {}
}
export interface IValue extends IProps {
    manager?: Manager,
    options?: IOptions;
    ref?: MutableRefObject<HTMLDivElement>;
    isDeleteItem?: boolean
};

