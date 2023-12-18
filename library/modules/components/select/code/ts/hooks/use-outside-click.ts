import { MutableRefObject, useEffect, useRef } from "react";

export function useOutsideClick<T>(callback = () => { }) {
    const ref: MutableRefObject<T> = useRef(null);
    useEffect((): (() => void) => {
        console.log("entro en useEffect", ref.current)
        const handleClick = (event: any): void => {
            console.log("in handleClick")
            const { current }: any = ref;

            const isSameNode: boolean =
                current === event.target ||
                current === event.currentTarget ||
                event.composedPath()[0] === current;
            const isAChildren: boolean = current?.contains(
                event.composedPath()[0]
            );

            console.log("isSameNode", isSameNode);
            console.log("isAChildren", isAChildren)
            if (!isSameNode && !isAChildren) callback();
        };
        console.log("document", document)
        document.addEventListener("click", handleClick);
        return (): void => document.removeEventListener("click", handleClick);
    }, []);
    return ref;
}
