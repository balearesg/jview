import * as React from "react";
export function useOutsideClick({ ref, button, setShow }) {
  React.useEffect(() => {
    const handleClick = (event: any): void => {
      const { current }: React.MutableRefObject<HTMLFieldSetElement> = ref;
      const isSameNode: boolean = event.composedPath()[0] === current;
      const isAChildren: boolean = current?.contains(event.composedPath()[0]);
      const istButton: boolean = button.current?.isSameNode(
        event.composedPath()[0]
      );
      const isChildrenButton: boolean = button.current?.contains(
        event.composedPath()[0]
      );
      if (!isSameNode && !isAChildren && !istButton && !isChildrenButton) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClick);
    return (): void => document.removeEventListener("click", handleClick);
  }, []);
}
