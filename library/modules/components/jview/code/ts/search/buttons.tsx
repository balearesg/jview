import React, { MouseEvent } from "react";
import { IconButton } from "pragmate-ui/icons";
import { useSearchContext } from "./context";

interface IProps {
  isOnSubmited: boolean;
  setIsOnSubmited: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Buttons({isOnSubmited, setIsOnSubmited} : IProps): JSX.Element {
  const {
    state, setShow, show, setState, initialState, button, onClear,isClear, searchableList,
  } = useSearchContext();

  const handleShow = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setShow(!show);
  };
  const handleClear = async (
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.stopPropagation();
    setIsOnSubmited(false);
    setState(initialState);
    onClear && (await onClear());
    setShow(false);
  };

  const isClearValues: boolean =
    state.search ||
    (isClear &&
      Object.keys(state).some((item: string): boolean => !!state[item]));
  const clearableCls: string = isClearValues || isOnSubmited   
    ? "close clearable"
    : "close not-clearable";

  const cls: string = searchableList ? "show" : "hide";
  return (
    <div className="icon-buttons">
      <span ref={button} className={cls}>
        <IconButton
          icon="list-search"
          className="list-search"
          onClick={handleShow}
        />
      </span>

      <IconButton
        icon="close"
        className={clearableCls}
        type="button"
        onClick={handleClear}
      />
    </div>
  );
}
