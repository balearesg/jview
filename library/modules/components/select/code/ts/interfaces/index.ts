import { MutableRefObject } from "react";
import { Manager } from "../manager";

export type IOption = {
    label: string,
    value: string | number
};

export type IOptions = Array<IOption>

export interface IValue {
    manager?: Manager,
    options?: IOptions;
    ref?: MutableRefObject<HTMLDivElement>;
    isDeleteItem?: boolean
};