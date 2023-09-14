import React from "react";
import { Spinner } from "pragmate-ui/spinner";
import { useJViewContext } from "./context";

export function Loading(): JSX.Element {
  const {
    loading,
    state: {
      controller: { fetching },
    },
  } = useJViewContext();

  if (!fetching && !loading) return null;
  return (
    <div className="jview-fetching">
      <Spinner active type="primary" className="spinner" />
    </div>
  );
}
