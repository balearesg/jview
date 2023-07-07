import * as React from "react";
import { JView } from "project/jview";
export function Table() {
  const data = Array.from(Array(100)).map((_, index) => {
    return {
      import: `lorem ipsum ${index + 1}`,
      description: `lorem ipsum ${index + 1}`,
      id: "1",
    };
  });

  const value = {
    dataHead: [
      { label: "nombre", id: "1" },
      { label: "cuit", id: "2" },
      { label: "calle", id: "3" },
      { label: "numero", id: "4" },
      { label: "cod.postal", id: "5" },
      { label: "localidad", id: "6" },
    ],
    entries: data,
    keys: ["nombre", "cuit", "calle", "number", "cod.postal", "localidad"],
    rows: 6,
    total: data.length,
    pagerNext: true,
  };

  return (
    <div className="table">
      <JView {...value} />
    </div>
  );
}
