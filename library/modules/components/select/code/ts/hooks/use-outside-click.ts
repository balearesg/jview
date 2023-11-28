import { MutableRefObject, useEffect, useRef } from "react";

export function useOutsideClick<T>(callback = () => { }) {
    const ref: MutableRefObject<T> = useRef(null);
    useEffect((): (() => void) => {
        const handleClick = (event: any): void => {
            const { current }: any = ref;
            const isSameNode: boolean =
                current === event.target ||
                current === event.currentTarget ||
                event.composedPath()[0] === current;
            const isAChildren: boolean = current?.contains(
                event.composedPath()[0]
            );
            if (!isSameNode && !isAChildren) callback();
        };
        document.addEventListener("click", handleClick);
        return (): void => document.removeEventListener("click", handleClick);
    }, []);
    return ref;
}
