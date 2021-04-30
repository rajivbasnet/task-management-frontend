import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const TableBase = ({ columns, sortColumn, onSort, data }) => {
  return (
      <div>
        <table className="table table-hover table-striped small">
        <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
        <TableBody columns={columns} data={data} />
        </table>
    </div>
  );
};

export default TableBase;