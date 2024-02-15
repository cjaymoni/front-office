/* eslint-disable */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";

export const ListTable = (props: {
  data: Array<any>;
  columns: any;
  globalFilterFields: any;
  exportedFileName?: string;
}) => {
  const [products, setProducts] = useState<Array<any>>([]);
  const [columns, setColumns] = useState<any>([]);
  const [filters, setFilters] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [buttonFilterValue, setButtonFilterValue] = useState("");
  const [globalFilterFields, setGlobalFilterFields] = useState([]);
  const [dates, setDates] = useState(null);
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

  const exportColumns = props.columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));
  exportColumns.pop();
  /* eslint-disable */

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        // @ts-ignore
        const doc = new jsPDF.default(0, 0);
        // @ts-ignore
        doc.autoTable(exportColumns, products);
        doc.save(`${props.exportedFileName}.pdf`);
      });
    });
  };
  const buttonOptions = columns.map((item) => {
    return { label: item.header, value: item.field };
  });
  buttonOptions.pop();
  const header = (
    <div className="w-full flex flex-col space-y-3">
      <div className="flex flex-row">
        <div className="w-full grid  ">
          <SelectButton
            value={buttonFilterValue}
            onChange={(e) => setButtonFilterValue(e.target.value)}
            optionLabel="label"
            options={buttonOptions}
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          />
        </div>
        <Calendar
          value={dates}
          onChange={(e) => setDates(e.value)}
          selectionMode="range"
          readOnlyInput
          showButtonBar
          placeholder="Select Date Range"
          className="w-1/2 bg-white h-[80%]"
          showIcon
        />
      </div>

      <div className="w-full flex sm:justify-end gap-2 h-12">
        <form className="flex justify-between items-center space-x-2 border rounded-lg p-2 bg-slate-200 w-full">
          <div className="flex space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              className="flex w-4/5 outline-none appearance-none placeholder-gray-500 bg-inherit text-gray-500 "
              type="text"
              placeholder="Search"
              value={globalFilterValue}
              onChange={(e) => setGlobalFilterValue(e.target.value)}
            />
          </div>

          <Button
            className="flex justify-end h-10"
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            onClick={clearFilter}
          />
        </form>

        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          onClick={exportPdf}
          tooltip="Export as PDF"
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
    </div>
  );

  useEffect(() => {
    setProducts(props.data);
    setColumns(props.columns);
    setGlobalFilterFields(props.globalFilterFields);
  }, [props]);

  return (
    <div className="m-auto">
      <Divider
        style={{
          height: "0.05rem",
          marginBottom: "-15px",
          backgroundColor: "#808080",
          opacity: 0.2,
        }}
      />
      <DataTable
        className="p-4"
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
