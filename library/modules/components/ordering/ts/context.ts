import { createContext, useContext, Context } from "react";
import type { IValue } from "./interfaces";

export const OrderingContext: Context<IValue> = createContext({});
export const useOrderingContext: () => IValue = (): IValue => useContext(OrderingContext);
