import { createContext, useContext, Context } from "react";
import type { TValue } from "./types";

export const JViewContext: Context<TValue> = createContext({ });
export const useJViewContext: () => TValue = (): TValue => useContext(JViewContext);
