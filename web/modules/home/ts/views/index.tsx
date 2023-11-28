import * as React from "react";
import { Table } from "./table";
import { useBinder } from "@bggroup/jview/hooks"
import { LoadingPage } from '@bggroup/jview/loading-page';
import { Select } from "@bggroup/jview/select"
import { Manager } from "../manager";
export /*bundle*/
  function Page({ store: manager }: { store: Manager }): JSX.Element {

  const [state, setState] = React.useState({});
  useBinder([manager], () => setState({}));
  //  if (!manager.ready) return <LoadingPage />;
  const options = Array.from(Array(15)).map((_, i) => {

    return {
      value: i + 1,
      label: `Option ${i + 1}`
    }
  })
  return (
    <div className="page__container">

      <section className="container__table">
        <Select options={options} />
        <Table manager={manager} />
      </section>
    </div>
  );
}
