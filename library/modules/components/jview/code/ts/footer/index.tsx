import React from "react";
import { useJViewContext } from "../context";
import { SelectEntries } from "./select-entries";
import { Pager } from "./pager";

export function Footer() {
  const { total, showSelect, texts, current, rows, pages, entries, loading, state } =
    useJViewContext();
  const from = (current - 1) * rows + 1;
  const to = from + rows - 1;
  const showing: string = `${texts.showing} ${from} ${texts.to} ${to > total ? total : to
    } ${texts.of} ${total} ${texts.items}`;
  const rowsJView = rows ?? 5;
  const isFooter = React.useMemo(() => (total >= 5 && showSelect), [total, rowsJView]);
  const isLoading = loading || state.controller.fetching

  if (!pages) return null;
  const cls = `content-pager ${isLoading ? "content-pager__loading" : ""}`
  return (
    <div className={cls}>
      {!!isFooter && (
        <div className="footer-jivew">
          {showSelect && <SelectEntries />}
          {!!entries.length && showing}
        </div>
      )}
      <Pager />
    </div>
  );
}
