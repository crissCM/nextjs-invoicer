import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

const InvoiceItem = ({
  invoiceItems,
  onItemizedItemEdit,
  onRowAdd,
  onRowDel,
  currency,
}) => {
  var itemTable = invoiceItems.map(function (item) {
    return (
      <ItemRow
        onItemizedItemEdit={onItemizedItemEdit}
        item={item}
        onDelEvent={onRowDel}
        key={item.id}
        currency={currency}
      />
    );
  });
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={(event) => onRowAdd(event)}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = ({ onItemizedItemEdit, item, onDelEvent, currency }) => {
  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: item.name,
            id: item.id,
            required: true,
          }}
        />
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description (optional)",
            value: item.description,
            id: item.id,
            required: false,
          }}
        />
      </td>
      <td className="InvoiceItemQtyField">
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: item.quantity,
            id: item.id,
            required: true,
          }}
        />
      </td>
      <td className="InvoiceItemPriceField">
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            presicion: 2,
            value: item.price,
            id: item.id,
            required: true,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={() => onDelEvent(item)}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
