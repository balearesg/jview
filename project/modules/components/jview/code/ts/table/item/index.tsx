import React from "react";
import { useJViewContext } from "../../context";
import { Actions } from "./actions";

export function ItemTable({ item }): JSX.Element {
  const { keys } = useJViewContext();
 
  const entries = keys.map((key: string) => (
    <td className="td-items" key={key}>
      <span>{item[key] ?? "Sin valor"}</span>
    </td>
  ));
  return (
    <tr>
      {entries}
      <Actions item={item}/>
    </tr>
  );
}
