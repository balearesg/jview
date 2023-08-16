import { createContext, useContext, Context } from "react";

export const SearchContext: Context<any> = createContext({ });
export const useSearchContext: () => any = (): any => useContext(SearchContext);