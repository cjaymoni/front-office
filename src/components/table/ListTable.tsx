import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";

export const ListTable = (props: {
  data: Array<any>;
  columns: any;
  globalFilterFields: any;
}) => {
  const [products, setProducts] = useState<Array<any>>([]);
  const [columns, setColumns] = useState<any>([]);
  const [filters, setFilters] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [globalFilterFields, setGlobalFilterFields] = useState([]);

  const dt = useRef(null);
  // const dt = useRef<DataTable<any>>(null);

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const clearFilter = () => {
    if (dt && dt.current) {
      setGlobalFilterValue("");

      (dt.current as any).reset();
    }
  };
  const header = (
    <div className="flex justify-between">
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear"
        outlined
        onClick={clearFilter}
      />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={(e) => setGlobalFilterValue(e.target.value)}
          //   onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );

  useEffect(() => {
    setProducts(props.data);
    setColumns(props.columns);
    setGlobalFilterFields(props.globalFilterFields);
  }, [props]);
  return (
    <div className="m-auto p-2">
      <DataTable
        value={products}
        header={header}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        stripedRows
        dataKey="id"
        filters={filters}
        globalFilter={globalFilterValue}
        globalFilterFields={globalFilterFields}
        emptyMessage="No data found."
        responsiveLayout="stack"
        breakpoint="960px"
        ref={dt}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      >
        {columns.map((col: any, i: number) => (
          <Column
            key={i}
            field={col.field}
            header={col.header}
            body={col.body}
          />
        ))}
      </DataTable>
    </div>
  );
};
