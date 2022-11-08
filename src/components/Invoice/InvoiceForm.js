import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { algoValidate } from "../../currencies/algo";
import store, { addNotification } from "../../state";
import {
  APP_INDEXER_KEY,
  DEFAULT_INDEXER,
  Indexers,
  InvoiceStatuses,
  isFixed,
  newItemLength,
} from "../../utils";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";

const InvoiceForm = () => {
  const getInitialLengthCounter = () => {
    // We subtract the initial state value lengths. (status, fromDate, toDate, currency, fromAlgoAddress, toAlgoAddress, total)
    return maxJsonLength - 1 - 10 - 10 - 1 - 58 - 58 - 4;
  };

  const gState = store.getState();
  const { address, maxJsonLength } = gState;
  const defaultInvoiceItems = [
    {
      id: 0,
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ];
  const now = new Date();
  const [invoiceItems, setInvoiceItems] = useState(defaultInvoiceItems);
  const [isOpen, setOpen] = useState(false);
  const [currency, setCurrency] = useState("Ⱥ");
  const [currentDate, setCurrentDate] = useState(now);
  const [dueDate, setDueDate] = useState("");
  const [billFromAlgoAddress, setBillFromAlgoAddress] = useState(address);
  const [billToAlgoAddress, setBillToAlgoAddress] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billFromEmail, setBillFromEmail] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [note, setNote] = useState("");
  const [total, setTotal] = useState("0.00");
  const [lengthCounter, setLengthCounter] = useState(
    getInitialLengthCounter(now)
  );

  useEffect(() => {
    const onReset = () => {
      setInvoiceItems(defaultInvoiceItems);
      const now = new Date();
      setOpen(false);
      setCurrency("Ⱥ");
      setCurrentDate(now);
      setDueDate("");
      setBillFromAlgoAddress(address);
      setBillToAlgoAddress("");
      setBillTo("");
      setBillToEmail("");
      setBillToAddress("");
      setBillFrom("");
      setBillFromEmail("");
      setBillFromAddress("");
      setNote("");
      setTotal("0.00");
      setLengthCounter(getInitialLengthCounter(now));
    };
    const unsubReset = store.subscribeToKeys(onReset, ["reset"]);
    return function unsubAll() {
      unsubReset();
    };
  });

  useEffect(() => {
    handleCalculateTotal();
  }, [invoiceItems]);

  const handleRowDel = (items) => {
    var index = invoiceItems.indexOf(items);
    const updatedInvoiceItems = [...invoiceItems];
    updatedInvoiceItems.splice(index, 1);
    setInvoiceItems(updatedInvoiceItems);
    setLengthCounter(lengthCounter + newItemLength);
  };

  const handleAddEvent = (evt) => {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var items = {
      id: id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    const updatedInvoiceItems = [...invoiceItems];
    updatedInvoiceItems.push(items);
    setInvoiceItems(updatedInvoiceItems);
    setLengthCounter(lengthCounter - newItemLength);
  };

  const handleCalculateTotal = () => {
    var subTotal = 0;
    invoiceItems.map(function (item) {
      subTotal += parseFloat(item.price) * item.quantity;
    });
    setTotal(subTotal.toFixed(2));
  };

  const onItemizedItemEdit = (evt) => {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    var itemsArr = invoiceItems.slice();
    var newItems = itemsArr.map(function (items) {
      for (var key in items) {
        if (key == item.name && items.id == item.id) {
          const itemKey = items[key].toString();
          setLengthCounter(
            lengthCounter + (itemKey.length - item.value.length)
          );
          if (["quantity", "price"].includes(item.name)) {
            if ("quantity" === item.name) {
              items[key] = parseInt(item.value || "0");
            } else if ("price" === item.name) {
              items[key] = item.value || "0";
            }
          } else {
            items[key] = item.value;
          }
        }
      }
      return items;
    });
    setInvoiceItems(newItems);
  };

  const editField = (event) => {
    if (event.target.name === "billFromAlgoAddress") {
      setBillFromAlgoAddress(event.target.value);
    } else if (event.target.name === "billToAlgoAddress") {
      setBillToAlgoAddress(event.target.value);
    } else if (event.target.name === "billFrom") {
      setBillFrom(event.target.value);
    } else if (event.target.name === "billTo") {
      setBillTo(event.target.value);
    } else if (event.target.name === "billToAddress") {
      setBillToAddress(event.target.value);
    } else if (event.target.name === "billToEmail") {
      setBillToEmail(event.target.value);
    } else if (event.target.name === "billFrom") {
      setBillFrom(event.target.value);
    } else if (event.target.name === "billFromAddress") {
      setBillFromAddress(event.target.value);
    } else if (event.target.name === "billFromEmail") {
      setBillFromEmail(event.target.value);
    } else if (event.target.name === "dueDate") {
      setDueDate(event.target.value);
    } else if (event.target.name === "note") {
      setNote(event.target.value);
    }
    setLengthCounter(
      lengthCounter +
        (event.target.attributes["oldvalue"].value.length -
          event.target.value.length)
    );
    event.target.setAttribute("oldvalue", event.target.value);
  };

  const onIndexerChange = (selectedOption) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(APP_INDEXER_KEY, selectedOption.indexer);
      window.location.reload();
    }
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    const isTotalFloat = isFixed(total.toString().trim());
    const isItemPricesFloat =
      invoiceItems.find((item) => !isFixed(item.price.toString().trim())) ===
      undefined;
    if (isTotalFloat && isItemPricesFloat) {
      setOpen(true);
    } else {
      if (!isTotalFloat) {
        addNotification("❌ Total is not a float value!");
      }
      if (!isItemPricesFloat) {
        addNotification("❌ Not all Item Prices are float values!");
      }
    }
  };

  const closeModal = (event) => setOpen(false);

  const formatInvoiceItemValues = () => {
    return invoiceItems.map((item) => {
      const newItem = {
        id: item.id,
        name: item.name,
        description: item.description,
        price: parseFloat(item.price.toString().trim()),
        quantity: item.quantity,
      };
      return newItem;
    });
  };

  const getInfo = () => {
    return {
      billFrom: billFrom.trim(),
      billFromAddress: billFromAddress.trim(),
      billFromEmail: billFromEmail.trim(),
      billFromAlgoAddress: billFromAlgoAddress.trim(),
      billTo: billTo.trim(),
      billToAddress: billToAddress.trim(),
      billToEmail: billToEmail.trim(),
      billToAlgoAddress: billToAlgoAddress.trim(),
      creationDate: currentDate.toISOString().slice(0, 10),
      dueDate: dueDate.trim(),
      note: note.trim(),
    };
  };

  return (
    <Form className="InvoiceForm" onSubmit={openModal}>
      <Row>
        <Col lg={9}>
          <Card className="p-4 p-xl-5 my-3">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="text-start mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">
                      {currentDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    oldvalue={""}
                    value={dueDate}
                    name={"dueDate"}
                    onChange={(event) => editField(event)}
                    style={{
                      maxWidth: "170px",
                    }}
                    required="required"
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">
                  Remaining&nbsp;Characters:&nbsp;
                </span>
                <span
                  className="length-counter"
                  style={{
                    maxWidth: "70px",
                    color: lengthCounter < 0 ? "red" : "",
                  }}>
                  {lengthCounter}
                </span>
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder={"Algorand address"}
                  rows={3}
                  oldvalue={""}
                  value={billToAlgoAddress}
                  type="text"
                  name="billToAlgoAddress"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  required="required"
                  isInvalid={
                    billToAlgoAddress && !algoValidate(billToAlgoAddress.trim())
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Algorand address.
                </Form.Control.Feedback>
                <Form.Control
                  placeholder={"Who is this invoice to?"}
                  rows={3}
                  oldvalue={""}
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  required="required"
                />
                <Form.Control
                  placeholder={"Email address (optional)"}
                  oldvalue={""}
                  value={billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                />
                <Form.Control
                  placeholder={"Billing address (optional)"}
                  oldvalue={""}
                  value={billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  onChange={(event) => editField(event)}
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder={"Algorand address"}
                  rows={3}
                  oldvalue={billFromAlgoAddress}
                  value={billFromAlgoAddress}
                  type="text"
                  name="billFromAlgoAddress"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  required="required"
                  isInvalid={
                    billFromAlgoAddress &&
                    !algoValidate(billFromAlgoAddress.trim())
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Algorand address.
                </Form.Control.Feedback>
                <Form.Control
                  placeholder={"Who is this invoice from?"}
                  rows={3}
                  oldvalue={""}
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  required="required"
                />
                <Form.Control
                  placeholder={"Email address (optional)"}
                  oldvalue={""}
                  value={billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                />
                <Form.Control
                  placeholder={"Billing address (optional)"}
                  oldvalue={""}
                  value={billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  onChange={(event) => editField(event)}
                />
              </Col>
            </Row>
            <InvoiceItem
              invoiceItems={invoiceItems}
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{
                    fontSize: "1.125rem",
                  }}>
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {currency}
                    {total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="note"
              oldvalue={""}
              value={note}
              onChange={(event) => editField(event)}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col lg={3} className="invoicer-sidebar-row">
          <div className="pt-md-3 pt-xl-4">
            <Button
              variant="primary"
              type="submit"
              className="d-block w-100"
              disabled={lengthCounter < 0}>
              Review Invoice
            </Button>
            {isOpen && (
              <InvoiceModal
                showModal={isOpen}
                closeModal={closeModal}
                invoiceStatus={InvoiceStatuses.Unpaid}
                serialNumber={null}
                info={getInfo()}
                invoiceItems={formatInvoiceItemValues()}
                currency={currency.trim()}
                total={parseFloat(total.toString().trim())}
              />
            )}
            <Form.Group className="mt-3">
              <Form.Label className="fw-bold mb-0">Indexer:</Form.Label>
              <Form.Select
                onChange={(event) =>
                  onIndexerChange({
                    indexer: event.target.value,
                  })
                }
                value={localStorage.getItem(APP_INDEXER_KEY) ?? DEFAULT_INDEXER}
                className="btn btn-light my-1"
                aria-label="Change Indexer">
                <option value={`${Indexers.AlgoExplorer}`}>
                  {Indexers.AlgoExplorer}
                </option>
                <option value={`${Indexers.AlgoNode}`}>
                  {Indexers.AlgoNode}
                </option>
              </Form.Select>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
