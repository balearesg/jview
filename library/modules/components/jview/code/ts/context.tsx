import { createContext, useContext, Context } from "react";
import type { TValue } from "./interfaces";

export const JViewContext: Context<TValue> = createContext({});
export const useJViewContext: () => TValue = (): TValue => useContext(JViewContext);
