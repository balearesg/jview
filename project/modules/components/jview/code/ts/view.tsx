import React, { useEffect, useMemo } from "react";
import { Empty } from "pragmate-ui/empty";
import { useJViewContext } from "./context";
import { ItemTable } from "./item";
import { Table } from "./table";
import { Grid } from "./grid";
import { Header } from "./header";
import { Loading } from "./loading";
import { Footer } from "./footer";
import { IconButton } from "pragmate-ui/icons";
export /*bundle*/ function View(): JSX.Element {
  const {
    dataHead,
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

  const heads: JSX.Element[] =
    dataHead &&
    dataHead.map((item): JSX.Element => {
      return (
        <th key={item.id}>
          <span className="arrow-order">
            {item.label}
            <IconButton icon="arrowDropDown" />
          </span>
        </th>
      );
    });

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
        <Table heads={header ?? heads} output={output} />
      );
    return entry;
  }, [pageEntries]);

  const cls: string =
    loading || state.controller.fetching
      ? "container-table container-table-fetching "
      : "container-table";

  return (
    <div>
      <Header />

      <div className={cls}>
        {!entries.length ? (
          <Empty
            className="empty-jview"
            text={textEmpty ?? texts.empty}
            icon="circle-exclamation"
          />
        ) : (
          control
        )}
        <Loading />
      </div>

      <Footer />
    </div>
  );
}
