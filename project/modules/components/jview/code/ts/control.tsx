import React, { useMemo } from "react";
import { useJViewContext } from "./context";
import { EmptyView } from "./empty-view";
import { Grid } from "./grid";
import { Table } from "./table";

export function Control() {
  const { entries, rows, current, state, loading, view, ready } =
    useJViewContext();
  let cropStart: number = current === 1 ? 0 : (current - 1) * rows;

  const pageEntries: any[] = state?.controller?.pager
    ? entries
    : entries.slice(cropStart, cropStart + rows);
  const control = useMemo(() => {
    const entry = view === "grid" ? <Grid /> : <Table />;
    return entry;
  }, [pageEntries]);
  if (loading) return null;
  if (!entries.length) return <EmptyView />;
  return <>{control}</>;
}
