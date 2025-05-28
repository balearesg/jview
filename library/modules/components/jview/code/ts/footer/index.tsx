import React from "react";
import { useJViewContext } from "../context";
import { SelectEntries } from "./select-entries";
import { Pager } from "./pager";

export function Footer() {
  const { total, showSelect, texts, current, rows, pages, entries, loading, state, totalElements } =
    useJViewContext();
  const rowsJView = rows ?? 5;
  const from = React.useMemo(() => (current - 1) * rowsJView + 1, [rowsJView, current]);
  const to = React.useMemo(() => from + rowsJView - 1, [rowsJView, from]);
  const totalShowed = totalElements || total;
  const showing: string = `${texts.showing} ${from} ${texts.to} ${to > totalShowed ? totalShowed : to
    } ${texts.of} ${totalShowed} ${texts.items}`;
  const isFooter = React.useMemo(() => (total >= 5 && showSelect), [total, rowsJView]);

  const isLoading = loading || state.controller?.fetching

  if (!pages) return null;
  const cls = `content-pager ${isLoading ? "content-pager__loading" : ""}`;

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
