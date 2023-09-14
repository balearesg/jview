export type TFilter = {
    id: string;
    name: string;
    identifier?: string;
};

export interface IProps {
    filter?: Array<TFilter>;
    initValues: { [x: string]: string };
    onSearch?: (params: { [x: string]: string }) => Promise<void>;
    onClear?: () => Promise<void>;
    isClear?: boolean;
    placeholder?: string;
    type?: string;
    date?: boolean;
    dialogTitle?: string;
    searchableList?: boolean;
    element: any
}