import React from "react";
import { useSearchContext } from "../context";
import { IconButton } from "pragmate-ui/icons";
import { Button } from "pragmate-ui/components";
import { Dates } from "./dates";
import { Items } from "./items";
export default function Filter() {
  const { setShow, show, ref, dialogTitle, texts, element } =
    useSearchContext();
  const cls: string = show ? "show" : "hide-fields";
  const textFilter: string = dialogTitle ?? texts.filter;
  const hide = () => setShow(false);
  return (
    <fieldset className={cls} ref={ref}>
      <div className="content-title">
        <span>{textFilter}</span>
        <IconButton icon="close" onClick={hide} />
      </div>
      <div className="content-inputs">
        <Dates />
        {element}
        <Items />
      </div>

      <Button variant="primary" type="submit">
        {texts.accept}
      </Button>
    </fieldset>
  );
}
