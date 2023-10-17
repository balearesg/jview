import React from "react";
import { useJViewContext } from "../../context";
import { Actions } from "./actions";
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from "./format-date";
export function ItemTable({ item }): JSX.Element {
  const { keys } = useJViewContext();

  const entries = keys.map((key) => {
    if (typeof key === "object" && !!key.keys && Array.isArray(key.keys)) {
      let entry = item;
      key.keys.forEach((access) => {
        entry = entry[access];
      });
      if (key.type && key.type === "date") {
        const date = formatDate(entry);
        return (
          <td className="td-items" key={uuidv4()}>
            <span>{date ?? "Sin valor"}</span>
          </td>
        );
      }
      if (key.type && key.type === "slice") {
      
        const isString = entry && typeof entry === 'string';
        const length = 25;
        entry = isString
          ? entry.length > length ? `${entry.slice(0, length)}...` : entry
          : 'No posee información asociada';
        return (
          <td className="td-items" key={uuidv4()}>
            <span>{entry ?? "Sin valor"}</span>
          </td>
        );
      }
      return (
        <td className="td-items" key={uuidv4()}>
          <span>{entry ?? "Sin valor"}</span>
        </td>
      );
    }
    return (
      <td className="td-items" key={uuidv4()}>
        <span>{item[key] ?? "Sin valor"}</span>
      </td>
    );
  });
  return (
    <tr>
      {entries}
      <Actions item={item} />
    </tr>
  );
}
