import { ReactiveModel } from '@beyond-js/reactive/model';
import { ChangeEvent, SyntheticEvent } from 'react';
import { IOption, IOptions, IProps } from '../interfaces';
export class Manager extends ReactiveModel<Manager> {
    showOptions: boolean = false;
    options: IOptions;
    originalOptions: IOptions;
    selected;
    value = '';
    confirmDelete = false;
    itemDelete;
    props: IProps = {};

    constructor(props) {
        super();
        this.options = props.options;
        this.originalOptions = props.options;
        this.props = props;
        this.findValue(props.value)
    };

    findValue = (value: string) => {
        if (!value && value !== undefined) return
        const item = this.options.find(
            (option) => option.value === value
        );
        if (!item) return;
        this.value = item.label;
        this.selected = item;
    }

    handleShow = () => {
        this.showOptions = !this.showOptions;
        this.triggerEvent();
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.value = event.currentTarget.value;
        this.options = this.originalOptions.filter((item) =>
            item.label
                .toLocaleLowerCase()
                .includes(this.value.toLocaleLowerCase().trim())
        );
        this.triggerEvent();
    };

    handleFocus = () => {
        if (this.showOptions) return;
        this.showOptions = true;
        this.triggerEvent();
    };

    closeOptions = () => {
        this.showOptions = false;
        this.triggerEvent();
    };

    select = (event: SyntheticEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const { value } = event.currentTarget.dataset;
        const item: IOption = JSON.parse(value);
        this.selected = item;
        this.value = item.label;
        if (this.props.onChange && typeof this.props.onChange === 'function')
            this.props.onChange(item);
        this.showOptions = false;

        this.triggerEvent();
    };

    deleteOption = () => {
        this.options = this.originalOptions.filter(
            (entry) => entry.label !== this.itemDelete.label
        );
        this.originalOptions = this.options;
        const isSelected =
            !!this.selected &&
            this.itemDelete.value === this.selected.value &&
            this.itemDelete.label === this.selected.label;
        if (isSelected) this.selected = null;
        if (this.value === this.itemDelete.name) this.value = '';
        if (
            this.props.deleteOption &&
            typeof this.props.deleteOption === 'function'
        )
            this.props.deleteOption(this.options);
        this.confirmDelete = false;
        this.triggerEvent();
    };

    selectDelete = (item) => {
        this.itemDelete = item;
        this.confirmDelete = true;
        this.triggerEvent();
    };

    handleConfirmDelete = () => {
        this.itemDelete = null;
        this.confirmDelete = !this.confirmDelete;
        this.triggerEvent();
    };
}
