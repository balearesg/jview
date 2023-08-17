import React, { useEffect, useMemo } from "react";
import { Empty } from "pragmate-ui/empty";
import { useJViewContext } from "./context";
import { Pager } from "./pager";
import { ItemTable } from "./item";
import { Table } from "./table";
import { Grid } from "./grid";
import { Spinner } from "pragmate-ui/spinner";
import { Header } from "./header";
import config from "jview/config"
import { SelectEntries } from "./select-entries";
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
    showSelect,
    pages
  } = useJViewContext();

  const heads: JSX.Element[] =
    dataHead &&
    dataHead.map((item): JSX.Element => {
      return (
        <th key={item.id}>
          <span>{item.label}</span>
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

  const from = (current - 1) * rows + 1;
  const to = from + rows - 1;
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

  const cls: string = loading || state.controller.fetching
    ? "container-table container-table-fetching "
    : "container-table";
  const showing: string = `${texts.showing} ${from} ${texts.to} ${to > total ? total : to
    } ${texts.of} ${total} ${texts.items}`;
  const rowsJView = config.params.application.tables.rows
  const isFooter = (pages > 1) || (total >= rowsJView && showSelect)
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
        {(loading || state.controller.fetching) && (
          <div className="jview-fetching">
            <Spinner active type="primary" className="spinner" />
          </div>
        )}
      </div>

      <div className="content-pager ">
        {!!isFooter && <div className="footer-jivew">
          {total >= rowsJView && showSelect && <SelectEntries />}
          {!!entries.length && showing}
        </div>}
        <Pager />
      </div>
    </div>
  );
}
