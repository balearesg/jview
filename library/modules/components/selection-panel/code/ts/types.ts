export type ITable = {
    label: string;
    key?: string;
    id?: string
};

export type IProps = {
    tables: Array<ITable>;
    save: (newConfig: Array<ITable>) => void;
    max?: number;
    isMax?: boolean;
    selectAll?: boolean;
    entity: string;
    select?: any
};

export type IState = {
    items: Array<ITable>;
    originalItems: Array<ITable>;
    count: number
};

export type IValues = {
    all?: boolean;
    search?: string;
    [x: string | number | symbol]: any;
};