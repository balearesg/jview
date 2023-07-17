import * as React from "react";
import { JView } from "jview/jview.code";
export function Table({manager}) {

  const value = {
    dataHead: [
      { label: "Nombre", id: "1" },
      { label: "Nombre del negocio", id: "2" },
    ],
    entries: manager.collection.items,
    keys: ["name", "businessName"],
    rows: manager.limit,
    total: manager.collection.total,
    pagerNext: true,
    onNext: manager.next,
    onPrev: manager.prev,
    title: "Listado de compañías"
  };

  return (
    <div className="table">
      <JView {...value} />
    </div>
  );
}
