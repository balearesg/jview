import React, { useEffect, useMemo } from "react";
import { Empty } from "pragmate-ui/empty";
import { useJViewContext } from "./context";
import { ItemTable } from "./item";
import { Table } from "./table";
import { Grid } from "./grid";
import { Header } from "./header";
import { Loading } from "./loading";
import { Footer } from "./footer";
import { Head } from "./head";
import { EmptyView } from "./empty-view";
export /*bundle*/ function View(): JSX.Element {
  const {
    entries,
    total,
    rows,
    setPages,
    current,
    state,
    item,
    rowProps,
    loading,
    view,
    texts,
    textEmpty,
    header,
  } = useJViewContext();

  useEffect(() => {
    if (total <= rows) setPages(1);
    else setPages(Math.ceil(total / rows));
  }, [total, rows]);
  let cropStart: number = current === 1 ? 0 : (current - 1) * rows;

  const pageEntries: any[] = state?.controller?.pager
    ? entries
    : entries.slice(cropStart, cropStart + rows);

  const Item = item ?? ItemTable;

  const control = useMemo(() => {
    const showedEntries = !!pageEntries.length ? pageEntries : entries;
    const output = showedEntries.map(
      (item, index: number): JSX.Element => (
        <Item item={item} key={index} {...rowProps} index={index} />
      )
    );
    const entry =
      view === "grid" ? (
        <Grid output={output} />
      ) : (
        <Table heads={header ?? <Head />} output={output} />
      );
    return entry;
  }, [pageEntries]);

  let cls: string =
    loading || state.controller.fetching
      ? "container-table container-table-fetching "
      : "container-table";

  cls+= !entries.length ? " container-table-empty" : "" 
     /*  const minHeight = entries.length * 100;
      console.log(minHeight);  */
  return (
    <div>
      <Header />

      <div className={cls}>
        {!entries.length ? (
          <EmptyView />
        ) : (
          control
        )}
        <Loading />
      </div>

      <Footer />
    </div>
  );
}
