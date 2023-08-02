import { createContext, useContext, Context } from "react";

export const PanelContext: Context<any> = createContext({ });
export const usePanelContext: () => any = (): any => useContext(PanelContext);