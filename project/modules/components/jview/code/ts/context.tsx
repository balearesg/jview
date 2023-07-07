import { createContext, useContext, Context } from "react";
import type { IValue } from "./types";

export const JViewContext: Context<IValue> = createContext({ });
export const useJViewContext: () => IValue = (): IValue => useContext(JViewContext);
