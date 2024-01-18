import { useEffect } from "react";
import { useJViewContext } from "../context";
import { Manager } from "../manager";
import { TPropsController } from "../interfaces";

export function customHooks() {
    const {
        setState,
        total,
        setCurrent,
        props,
        rows,
        state,
        action,
        onPrev,
        onNext,
        setTotal,
        setEntries,
        setPages
    } = useJViewContext();
    const propsController: TPropsController = {
        ...props,
        total: props.total,
        rows,
        action,
        current: props.current,
        entries: props.entries,
        onPrev,
        onNext,
    };
    useEffect(() => {
        const update = (specs: object = {}): void => {
            setState({ ...state, ...specs, controller });
            const page =
                typeof controller.current === "string"
                    ? parseInt(controller.current)
                    : controller.current;
            setCurrent(page);
        };
        const controller: any = new Manager(propsController);
        controller.bind("change", update);
        update();
        return () => controller.unbind("change", update);
    }, []);

    useEffect((): void => {
        if (props.total !== total) {
            setTotal(props.total);
            if (state.controller) state.controller.current = 1;
            setCurrent(1);
        }

        setTimeout(() => {
            if (props.currentPage) {
                if (state?.controller) state.controller.current = props.currentPage;
                const page =
                    typeof props.currentPage === "string"
                        ? parseInt(props.currentPage)
                        : props.currentPage;
                setCurrent(page);
            }
        }, 500);

        setEntries(props.entries);
    }, [props.total, props.entries, props.currentPage]);

    useEffect(() => {
        if (total <= rows) setPages(1);
        else setPages(Math.ceil(total / rows));
    }, [total, rows]);
}
