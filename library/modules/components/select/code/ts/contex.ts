import { createContext, useContext, Context } from "react";
import { IValue } from "./interfaces";

export const SelectContext: Context<IValue> = createContext({});
export const useSelectContext: () => IValue = (): IValue => useContext(SelectContext);