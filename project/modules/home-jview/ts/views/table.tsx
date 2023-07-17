import * as React from "react";
import { JView } from "@bg/jview/jview.code";
export function Table({manager}) {

  const value = {
    dataHead: [
      { label: "Marca", id: "1" },
      { label: "Categoría", id: "2" },
      { label: "UPC", id: "3" },
      { label: "ASIN", id: "4" },
    ],
    entries: manager.collection.items,
    keys: ["brand", "category", "upc", "asin",],
    rows: manager.limit,
    total: manager.collection.counters.total,
    pagerNext: true,
    onNext: manager.next,
    onPrev: manager.prev,
    title: "Listado de operaciones"
  };

  return (
    <div className="table">
      <JView {...value} />
    </div>
  );
}
