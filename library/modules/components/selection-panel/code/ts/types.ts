export type table = {
    label: string;
    key?: string;
    id?: string
};

export type props = {
    tables: Array<table>;
    save: (newConfig: Array<table>) => void;
    max?: number;
    isMax?: boolean;
    selectAll?: boolean;
    entity: string
};

export type state = {
    items: Array<table>;
    originalItems: Array<table>;
};

export type values = {
    all: boolean;
    search: string;
    [x: string | number | symbol]: any;
};