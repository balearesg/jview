import React from "react";

export interface IProps {
    items?: IItem[];
    onSubmit?: (orders: Array<string>[]) => void
}
export /*bundle*/ interface IRef {
    handleModal: () => void,
    close: () => void,
    open: () => void
};

export interface ITexts {
    title: string;
    orderBy: string;
    ancestry: string;
    descendant: string;
    addColumn: string;
    order: string;
    cancel: string;
};

export interface IEntry {
    show: boolean;
    order: string;
    key: string;
    selected: string;
    label: string
}

export interface IValue extends IProps {
    texts?: ITexts,
    entries?: IEntry[],
    state?: IEntry[],
    setState?: React.Dispatch<React.SetStateAction<IEntry[]>>,
    close?: () => void,
    show?: boolean,
    handleModal?: () => void
};

export interface IItem {
    key: string,
    label: string,
};