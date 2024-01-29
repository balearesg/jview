import React from "react";
import { useJViewContext } from "./context";
import { Header } from "./header";
import { Loading } from "./loading";
import { Footer } from "./footer";
import { customHooks } from "./hooks/custom-hooks";
import { LoadingPage } from '@bgroup/jview/loading-page'
import { Control } from "./control";

export /*bundle*/ function View(): JSX.Element {
  const { entries, state, loading, isVisibleHeader, } =
    useJViewContext();
  customHooks();

  if (!state.controller) return <LoadingPage content />;
  const isLoading = loading || state.controller.fetching
  let cls: string =
    isLoading && !entries.length
      ? "container-table container-table-fetching table-fetching "
      : "container-table";

  cls += !entries.length ? " container-table-empty" : "";
  cls += isLoading && !!entries.length ? " container-table-loading table-fetched" : ""
  cls += isVisibleHeader ? " not-hide-header" : ""
  return (
    <div className="jview-container">
      <Header />
      <div className={cls}>
        <Control />
        <Loading />
      </div>
      <Footer />
    </div>
  );
}
