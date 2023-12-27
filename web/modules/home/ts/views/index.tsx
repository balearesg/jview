import * as React from "react";
import { Table } from "./table";
import { useBinder } from "@bgroup/jview/hooks"
import { Select } from "@bgroup/jview/select"
import { Manager } from "../manager";
import { Ordering, IRef } from '@bgroup/jview/ordering';
import { Button } from 'pragmate-ui/components'
import { head } from "./keys";
export /*bundle*/
  function Page({ store: manager }: { store: Manager }): JSX.Element {
  const ref: React.MutableRefObject<IRef> = React.useRef<IRef>();
  const [state, setState] = React.useState({});
  useBinder([manager], () => setState({}));
  //  if (!manager.ready) return <LoadingPage />;
  const options = Array.from(Array(15)).map((_, i) => {
    return {
      value: i + 1,
      label: `Option ${i + 1}`
    }
  });
  const handleModal = () => ref.current.handleModal();
  const items = head.map(item => { return { ...item, key: item.id } })
  return (
    <div className="page__container">

      <section className="container__table">
        <Button onClick={handleModal} variant="primary">OPEN ORDERING</Button>
        <Ordering ref={ref} items={items} />
        <Select options={options} />
        <Table manager={manager} />
      </section>
    </div>
  );
}
