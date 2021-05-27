import { Grid, IconButton, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import { ColDef, DataGrid, ValueFormatterParams } from "@material-ui/data-grid";
import React, { FunctionComponent, useState, useEffect } from "react";
import { Doc } from "./Types";

export const DocList: FunctionComponent<{ search: string | undefined, setSelection: (v: string) => void, setEdit: (v: Doc) => void }> = (props) => {

  const [rows, setRows] = useState<Doc[] | null>(null);

  useEffect(() => {
    fetch("/api/list.py" + (props.search !== undefined ? ("?search=" + encodeURI(props.search ?? "")) : ""))
      .then(res => res.json())
      .then(setRows,
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => { setRows([]) }
      )
  }, [props.search]);

  const cols: ColDef[] = [
    {
      field: "path", headerName: "Aktion", width: 160,
      renderCell: (params: ValueFormatterParams) =>
        (<>
          <IconButton onClick={() => params.value && props.setSelection(params.value?.toString())}><Icon>pageview</Icon></IconButton>
          <IconButton onClick={() => params.value && window.open("/api/download.py?path=" + params.value?.toString())}><Icon>download</Icon></IconButton>
          <IconButton onClick={() => params.value && props.setEdit(params.data as Doc)}><Icon>edit</Icon></IconButton>
        </>)
    },
    { field: "correspondent", headerName: "Korrepondent", width: 160 },
    { field: "subject", headerName: "Betreff", width: 400 },
    { field: "date", headerName: "Datum", type: "date", width: 150 }];

  return <DataGrid rows={rows ?? []} columns={cols} />;
}