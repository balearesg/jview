import * as React from "react";
import { Table } from "./table";
import { useBinder } from "jview/hooks"
import { LoadingPage } from 'jview/loading-page'
import { Manager } from "../manager";
export /*bundle*/
  function Page({ store: manager }: { store: Manager }): JSX.Element {

  const [state, setState] = React.useState({});
  useBinder([manager], () => setState({}));
//  if (!manager.ready) return <LoadingPage />;

  return (
    <div className="page__container">

      <section className="container__table">
        <Table manager={manager} />
      </section>
    </div>
  );
}
