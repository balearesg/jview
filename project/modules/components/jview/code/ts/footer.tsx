import React from "react";
import { useJViewContext } from "./context";
import config from "jview/config";
import { SelectEntries } from "./select-entries";
import { Pager } from "./pager";

export function Footer() {
  const { total, showSelect, texts, current, rows, pages, entries } =
    useJViewContext();
  const from = (current - 1) * rows + 1;
  const to = from + rows - 1;
  const showing: string = `${texts.showing} ${from} ${texts.to} ${
    to > total ? total : to
  } ${texts.of} ${total} ${texts.items}`;
  const rowsJView = config.params.application.tables.rows;
  const isFooter = pages > 1 || (total >= rowsJView && showSelect);

  return (
    <div className="content-pager ">
      {!!isFooter && (
        <div className="footer-jivew">
          {total >= rowsJView && showSelect && <SelectEntries />}
          {!!entries.length && showing}
        </div>
      )}
      <Pager />
    </div>
  );
}
