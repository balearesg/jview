import React from "react";
import { useSearchContext } from "./context";
import { IconButton } from "pragmate-ui/icons";
import { Form as FormPUI } from "pragmate-ui/form";
import Filter from "./filter";
import { Buttons } from "./buttons";
export function Form(): JSX.Element {

  const [ isOnSubmited, setIsOnSubmited ] = React.useState(false);
  const { state, setShow, onSearch, placeholder, type, texts, handleChange } =
    useSearchContext();
  const handleSubmit = async (): Promise<void> => {
    setIsOnSubmited(true);
    if (onSearch) await onSearch(state);
    setShow(false);
  };
  return (
    <FormPUI
      onSubmit={handleSubmit}
      autoComplete="off"
      className="search-operations"
    >
      <div className="content-search">
        <IconButton icon="search" className="icon-search" type="submit" />
        <input
          type={type}
          placeholder={placeholder ?? texts.search}
          value={state.search}
          name="search"
          onChange={handleChange}
        />
         <Buttons isOnSubmited={isOnSubmited} setIsOnSubmited={setIsOnSubmited} />
      </div>
      <Filter />
    </FormPUI>
  );
}
