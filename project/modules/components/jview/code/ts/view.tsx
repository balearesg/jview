import React, { useEffect, useMemo, MouseEvent } from "react";
import { Empty } from "pragmate-ui/empty";
import { useJViewContext } from "./context";
import { Pager } from "./pager";
import { ItemTable } from "./item";
import { Table } from "./table";
import { Grid } from "./grid";
import { Spinner } from "pragmate-ui/spinner";
import { Button } from "pragmate-ui/form";

export /*bundle*/ function View(): JSX.Element {
  const {
    dataHead,
    entries,
    title,
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
    isSearch,
    search,
    create,
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
        <Table heads={heads} output={output} />
      );
    return entry;
  }, [pageEntries]);


  const cls: string = loading
    ? "container-table container-table-fetching "
    : "container-table";
  const showing: string = `${texts.showing} ${from} ${texts.to} ${
    to > total ? total : to
  } ${texts.of} ${total} ${texts.items}`;
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!create || !create.onClick || typeof create.onClick !== "function")
      return;
    create.onClick();
  };
  const clsHeader = !!create && !!create?.label ? "search-create " : "";
  return (
    <div>
      <header>
        {title && <h4>{title}:</h4>}
        <div className={clsHeader}>
          {isSearch && <Searchbar {...search} />}
          {!!create && (
            <Button
              onClick={handleClick}
              label={create.label}
              className="btn btn-primary create-button"
            />
          )}
        </div>
      </header>
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
            <Spinner className="spinner" />
          </div>
        )}
      </div>
      <div className="content-pager">
        {!!entries.length && showing}
        <Pager />
      </div>
    </div>
  );
}
