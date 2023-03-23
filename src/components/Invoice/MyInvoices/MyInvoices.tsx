import { trimByteString, truncateString } from "@jackcom/reachduck";
import { useIndexerClient } from "@jackcom/reachduck/lib/networks/ALGO.indexer";
import { get } from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  Form,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Row,
  Spinner,
  Table,
  Tooltip,
} from "react-bootstrap";
import CsvDownloader from "react-csv-downloader";
import { Datas } from "react-csv-downloader/dist/esm/lib/csv";
import { FlexColumn } from "../../Common/Containers";
import InvoiceModal from "../../../components/Invoice/InvoiceModal";
import store, { addNotification } from "../../../state";
import {
  defaultArg,
  InvoiceStatuses,
  maxAlgorandArgumentLength,
} from "../../../utils";

const TableWrapper = styled.div`
  margin-top: 16px;
  background: #1e2d58;
  background: var(--algocloud-card-bg-color);
  box-shadow: 0 0 0 1px var(--card-border);
  width: 100%;
  border-radius: 5px;
`;

const TableHeader = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 1rem;
  border-bottom-style: solid;
  border-width: 1px;
  border-color: var(--border-var) !important;
`;

const abortController = new AbortController();

const MyInvoices = () => {
  const defaultInvoices: Map<string, any[]> = new Map<string, any[]>([
    [Object.keys(InvoiceStatuses)[0], []],
    [Object.keys(InvoiceStatuses)[1], []],
    [Object.keys(InvoiceStatuses)[2], []],
  ]);
  const gState = store.getState();
  const { appId, address } = gState;
  const [exportLoading, setExportLoading] = useState(false);
  const [clickedInvoice, setClickedInvoice] = useState<any>();
  const [invoices, setInvoices] = useState<Map<string, any[]>>(defaultInvoices);
  const indexer = useIndexerClient();
  const initialFromDate = getLastYearDate(new Date())
    .toISOString()
    .slice(0, 10);
  const initialToDate = new Date().toISOString().slice(0, 10);
  const unpaidIndex = Object.values(InvoiceStatuses)[0];
  const paidIndex = Object.values(InvoiceStatuses)[1];
  const canceledIndex = Object.values(InvoiceStatuses)[2];
  const rowStyles = ["unpaidRow", "paidRow", "canceledRow"];

  useEffect(() => {
    const onRefreshTable = () =>
      refreshInvoicesTable(initialFromDate, initialToDate);
    const unsubRefreshTable = store.subscribeToKeys(onRefreshTable, [
      "refreshInvoicesTable",
    ]);
    return function unsubAll() {
      unsubRefreshTable();
      abortController.abort();
    };
  });

  useEffect(() => {
    if (indexer) {
      try {
        store.loading(true);
        if (appId) {
          getApplicationTransactions(initialFromDate, initialToDate);
        }
      } catch (e) {
        addNotification(`❌ ${e}`);
        console.log("Error during application transactions query: ", e);
      } finally {
        store.loading(false);
      }
    }
    return () => abortController.abort();
  }, [indexer]);

  const isEmptyInvoices = () => {
    const invArrs = [...invoices.values()];
    for (let i = 0; i < invArrs.length; i += 1) {
      const arr = invArrs[i];
      if (arr && arr.length > 0) {
        return false;
      }
    }
    return true;
  };

  const getFilename = () => `${initialFromDate}_${initialToDate}`;

  const asyncExportCsv = async () => {
    setExportLoading(true);
    return new Promise((resolve) => {
      const gridData: Datas = [];
      try {
        for (const entry of invoices.entries()) {
          const [status, invoicesArray] = entry;
          [unpaidIndex, paidIndex, canceledIndex].forEach((s) => {
            if (status === Object.keys(InvoiceStatuses)[s]) {
              for (const k in invoicesArray) {
                if (k !== undefined) {
                  const invoice = invoicesArray[k];
                  const invoiceInfo = getInvoiceInfo(invoice);
                  const invoiceItems = getInvoiceItems(invoice);
                  const items: string[] = [];
                  for (let i = 0; i < invoiceItems.length; i += 1) {
                    const it = invoiceItems[i];
                    items.push(
                      `${it.name} -> ${it.description}: ${it.quantity}x${
                        it.price
                      }${getInvoiceCurrency(invoice)}`
                    );
                  }
                  if (invoiceInfo && invoiceItems) {
                    gridData.push(getCsvObject(invoice, invoiceInfo, items));
                  }
                }
              }
            }
          });
        }
      } catch (e) {
        console.log(`CSV export error: ${e}`);
        addNotification(`❌ Error during CSV export!`);
      }
      resolve(gridData);
    });
  };

  const getCsvColumns = () => [
    {
      id: "status",
      displayName: "Status",
    },
    {
      id: "sn",
      displayName: "Serial number",
    },
    {
      id: "creationDate",
      displayName: "Creation date",
    },
    {
      id: "dueDate",
      displayName: "Due date",
    },
    {
      id: "fromName",
      displayName: "From name",
    },
    {
      id: "fromAddress",
      displayName: "From address",
    },
    {
      id: "fromEmail",
      displayName: "From email",
    },
    {
      id: "fromAlgoAddress",
      displayName: "From ALGO Address",
    },
    {
      id: "toName",
      displayName: "To name",
    },
    {
      id: "toAddress",
      displayName: "To address",
    },
    {
      id: "toEmail",
      displayName: "To email",
    },
    {
      id: "toAlgoAddress",
      displayName: "To ALGO Address",
    },
    {
      id: "items",
      displayName: "Items",
    },
    {
      id: "price",
      displayName: "Price",
    },
    {
      id: "note",
      displayName: "Note",
    },
  ];

  const getCsvObject = (
    invoice: any,
    invoiceInfo: any,
    items: string[]
  ): any => ({
    status: getInvoiceStatusLabel(invoice),
    sn: getInvoiceSerial(invoice),
    creationDate: invoiceInfo.creationDate,
    dueDate: invoiceInfo.dueDate,
    fromName: invoiceInfo.billFrom,
    fromAddress: invoiceInfo.billFromAddress,
    fromEmail: invoiceInfo.billFromEmail,
    fromAlgoAddress: invoiceInfo.billFromAlgoAddress,
    toName: invoiceInfo.billTo,
    toAddress: invoiceInfo.billToAddress,
    toEmail: invoiceInfo.billToEmail,
    toAlgoAddress: invoiceInfo.billToAlgoAddress,
    items: items.join(" | "),
    price: `${getInvoiceCurrency(invoice)} ${getInvoiceAmount(invoice)}`,
    note: invoiceInfo.note,
  });

  function getLastYearDate(currentDate: Date) {
    const lastYearDate = new Date(currentDate);
    lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
    return lastYearDate;
  }

  const closeModal = () => setClickedInvoice(null);

  const getSumHeaderClass = (index: number) => {
    if (index === 0) {
      return "unpaidSumHeader";
    }
    if (index === 1) {
      return "paidSumHeader";
    }
    return "canceledSumHeader";
  };

  const getInvoicesByIndex = (index: number) => {
    const key = Object.keys(InvoiceStatuses)[index];
    return invoices.get(key);
  };

  const getInvoiceStatusLabel = (invoiceObj: any) => {
    if (invoiceObj) {
      const serial = getInvoiceSerial(invoiceObj);
      if (serial !== undefined && serial !== null) {
        return Object.keys(InvoiceStatuses)[
          parseInt(invoiceObj[serial!].s, 10)
        ];
      }
    }
    console.log("Cannot find invoice status: ", invoiceObj);
    return null;
  };

  const getInvoiceStatusIndex = (invoiceObj: any) => {
    if (invoiceObj) {
      const serial = getInvoiceSerial(invoiceObj);
      if (serial !== undefined && serial !== null) {
        return parseInt(invoiceObj[serial!].s, 10);
      }
    }
    console.log("Cannot find invoice status index: ", invoiceObj);
    return null;
  };

  const getInvoiceSerial = (invoiceObj: any) => {
    if (invoiceObj) {
      return Object.keys(invoiceObj)[0];
    }
    console.log("Cannot find invoice serial: ", invoiceObj);
    return null;
  };

  const getInvoiceInfo = (invoiceObj: any) => {
    if (invoiceObj) {
      const serial = getInvoiceSerial(invoiceObj);
      if (serial) {
        const billFromArr = invoiceObj[serial].f;
        const billToArr = invoiceObj[serial].t;
        const datesArr = invoiceObj[serial].d;
        const note = invoiceObj[serial].n;
        if (
          billFromArr &&
          billToArr &&
          datesArr &&
          note !== undefined &&
          billFromArr.length === 4 &&
          billToArr.length === 4 &&
          datesArr.length === 2
        ) {
          return {
            billFrom: billFromArr[0].trim(),
            billFromAddress: billFromArr[1].trim(),
            billFromEmail: billFromArr[2].trim(),
            billFromAlgoAddress: billFromArr[3].trim(),
            billTo: billToArr[0].trim(),
            billToAddress: billToArr[1].trim(),
            billToEmail: billToArr[2].trim(),
            billToAlgoAddress: billToArr[3].trim(),
            creationDate: datesArr[0].trim(),
            dueDate: datesArr[1].trim(),
            note: note.trim(),
          };
        }
        console.log("The invoice is malformed: ", invoiceObj);
      }
    } else {
      console.log("This invoice is malformed: ", invoiceObj);
    }
    return null;
  };

  const getInvoiceItems = (invoiceObj: any) => {
    if (invoiceObj) {
      const serial = getInvoiceSerial(invoiceObj);
      if (serial && invoiceObj[serial].i) {
        return invoiceObj[serial].i;
      }
      console.log("Cannot find invoice items: ", invoiceObj);
    } else {
      console.log("Cannot find invoice items: ", invoiceObj);
    }
    return null;
  };

  const getInvoiceCurrency = (invoiceObj: any) => {
    if (invoiceObj) {
      const serial = getInvoiceSerial(invoiceObj);
      if (serial && invoiceObj[serial].p && invoiceObj[serial].p.length === 2) {
        return invoiceObj[serial].p[0];
      }
      console.log("Cannot find currency info: ", invoiceObj);
    } else {
      console.log("Cannot find currency info: ", invoiceObj);
    }
    return null;
  };

  const getInvoiceAmount = (invoiceObj: any) => {
    if (invoiceObj) {
      const serial = getInvoiceSerial(invoiceObj);
      if (serial && invoiceObj[serial].p && invoiceObj[serial].p.length === 2) {
        return invoiceObj[serial].p[1];
      }
      console.log("Cannot find amount info: ", invoiceObj);
    } else {
      console.log("Cannot find amount info: ", invoiceObj);
    }
    return null;
  };

  const getHealth = async () => {
    try {
      const health = await indexer.makeHealthCheck().do();
      if (get(health, "errors", false)) {
        showApiErrorNotification(health);
        return false;
      }
      return true;
    } catch (e) {
      addNotification(`❌ Error during indexer health check!`);
      console.log("----- Healt check ERROR:", e);
      return false;
    }
  };

  const getApplicationTransactions = async (
    fromDate: string,
    toDate: string
  ) => {
    const isHealthy = await new Promise(async (resolve, reject) => {
      const healthStatus = await getHealth();
      resolve(healthStatus);
      abortController.signal.addEventListener("abort", () => reject());
    });

    if (isHealthy) {
      const transactionsFetchSuccess = await new Promise(
        async (resolve, reject) => {
          try {
            const resp = await indexer
              .searchForTransactions()
              .applicationID(appId as number)
              .beforeTime(`${toDate}T23:59:59.999Z`)
              .afterTime(`${fromDate}T00:00:00.000Z`)
              .do();
            if (!get(resp, "transactions", false)) {
              showApiErrorNotification(resp);
              addNotification(`❌ Error during transactions query!`);
            } else {
              const transactions = resp.transactions;
              if (transactions.length > 0) {
                const invoicesMap = new Map<string, any[]>([
                  [Object.keys(InvoiceStatuses)[0], []],
                  [Object.keys(InvoiceStatuses)[1], []],
                  [Object.keys(InvoiceStatuses)[2], []],
                ]);
                for (let i = 0; i < transactions.length; i += 1) {
                  const t = transactions[i];
                  if (
                    get(t, "application-transaction.application-args", false) &&
                    t["application-transaction"]["application-args"].length ===
                      4 &&
                    t["application-transaction"]["application-args"][3] !==
                      defaultArg
                  ) {
                    const binary = atob(
                      t["application-transaction"]["application-args"][3]
                    );

                    const trimmedBinary = trimByteString(binary);

                    let originalJson = "";

                    /* Paid invoice transaction app arguments have trash characters before the base64 json string.
                 Currently I don't know a better solution to get rid of them. */
                    for (let z = 0; z < trimmedBinary.length; z += 1) {
                      try {
                        originalJson = decodeURIComponent(
                          escape(atob(trimmedBinary.substring(z)))
                        );
                        if (originalJson) {
                          break;
                        }
                      } catch {
                        // TODO find a better solution if possible
                      }
                    }

                    if (binary.length === maxAlgorandArgumentLength) {
                      if (originalJson) {
                        try {
                          const invoiceObj = JSON.parse(originalJson);
                          if (invoiceObj) {
                            const invoiceId = Object.keys(invoiceObj)[0];
                            const toAlgoAddress =
                              getInvoiceInfo(invoiceObj)?.billToAlgoAddress;

                            if (toAlgoAddress && toAlgoAddress === address) {
                              // Populate the map grouped by Paid, Unpaid, Canceled invoices
                              for (
                                let j = 0;
                                j < Object.values(InvoiceStatuses).length;
                                j += 1
                              ) {
                                // Populate the map grouped by invoice status.
                                const statusVal =
                                  Object.values(InvoiceStatuses)[j];
                                if (invoiceObj[invoiceId].s === statusVal) {
                                  invoicesMap
                                    .get([...invoicesMap.keys()][statusVal])
                                    ?.push(invoiceObj);
                                }
                              }
                            }
                          }
                        } catch (e) {
                          showParseErrorNotification(e);
                          addNotification(
                            `❌ Error during transactions query!`
                          );
                        }
                      } else {
                        addNotification(`❌ Error during transactions query!`);
                      }
                    }
                  }
                }
                /**
                 * Unpaid: Not in Paid or Canceled array.
                 * Paid: Every Paid status invoice is paid.
                 * Canceled: Not paid.
                 */
                const unpaidArray = invoicesMap.get(
                  [...invoicesMap.keys()][unpaidIndex]
                );
                const paidArray = invoicesMap.get(
                  [...invoicesMap.keys()][paidIndex]
                );
                const canceledArray = invoicesMap.get(
                  [...invoicesMap.keys()][canceledIndex]
                );

                // Sort the invoicesMap grouped arrays in descending order by Invoice Id.
                paidArray?.sort(
                  (a, b) =>
                    parseInt(Object.keys(b)[0], 10) -
                    parseInt(Object.keys(a)[0], 10)
                );
                unpaidArray?.sort(
                  (a, b) =>
                    parseInt(Object.keys(b)[0], 10) -
                    parseInt(Object.keys(a)[0], 10)
                );
                canceledArray?.sort(
                  (a, b) =>
                    parseInt(Object.keys(b)[0], 10) -
                    parseInt(Object.keys(a)[0], 10)
                );

                const updatedInvoicesMap = new Map<string, any[]>([
                  [Object.keys(InvoiceStatuses)[unpaidIndex], []],
                  [Object.keys(InvoiceStatuses)[paidIndex], []],
                  [Object.keys(InvoiceStatuses)[canceledIndex], []],
                ]);
                updatedInvoicesMap.set(
                  [...invoicesMap.keys()][paidIndex],
                  paidArray!
                );

                for (const entry of invoicesMap.entries()) {
                  const [status, invoicesArray] = entry;
                  if (status === Object.keys(InvoiceStatuses)[unpaidIndex]) {
                    for (const k in invoicesArray) {
                      if (k !== undefined) {
                        const invoice = invoicesArray[k];
                        if (
                          !(
                            isInvoicePaid(invoice, paidArray) ||
                            isInvoiceCanceled(invoice, canceledArray)
                          )
                        ) {
                          updatedInvoicesMap
                            .get([...invoicesMap.keys()][unpaidIndex])
                            ?.push(invoice);
                        }
                      }
                    }
                  } else if (
                    status === Object.keys(InvoiceStatuses)[canceledIndex]
                  ) {
                    for (const k in invoicesArray) {
                      if (k !== undefined) {
                        const invoice = invoicesArray[k];
                        if (invoice && !isInvoicePaid(invoice, paidArray)) {
                          updatedInvoicesMap
                            .get([...invoicesMap.keys()][canceledIndex])
                            ?.push(invoice);
                        }
                      }
                    }
                  }
                }
                addNotification(
                  `💡 Your invoices have been loaded successfully.`
                );
                setInvoices(updatedInvoicesMap);
              } else {
                showNoInvoicesNotification();
              }
            }
            resolve(true);
          } catch (e) {
            console.log("Error during transactions query: ", e);
            addNotification(`❌ Error during transactions query!`);
            resolve(false);
          }
          abortController.signal.addEventListener("abort", () => reject());
        }
      );
      console.log("----- transactionsFetchSuccess:", transactionsFetchSuccess);
    }
  };

  const isInvoicePaid = (invoice: string, paidArray: any[] | undefined) => {
    if (invoice && paidArray) {
      const invoiceId = Object.keys(invoice)[0];
      for (const k in paidArray) {
        if (k) {
          const paidInvoice = paidArray[k];
          if (paidInvoice) {
            const paidInvoiceId = Object.keys(paidInvoice)[0];
            if (invoiceId === paidInvoiceId) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  const isInvoiceCanceled = (
    invoice: string,
    canceledArray: any[] | undefined
  ) => {
    if (invoice && canceledArray) {
      const invoiceId = Object.keys(invoice)[0];
      for (const k in canceledArray) {
        if (k) {
          const canceledInvoice = canceledArray[k];
          if (canceledInvoice) {
            const canceledInvoiceId = Object.keys(canceledInvoice)[0];
            if (invoiceId === canceledInvoiceId) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  const refreshInvoicesTable = (fromDate: string, toDate: string) => {
    try {
      store.loading(true);
      getApplicationTransactions(fromDate, toDate);
    } catch (err) {
      addNotification(`❌ ${err}`);
      console.log("Error during transactions query: ", err);
    } finally {
      store.loading(false);
    }
  };

  const showParseErrorNotification = (e: unknown) => {
    console.log("json body parse error: ", e);
    addNotification("❌ The response from the server is malformed!");
  };

  const showApiErrorNotification = (response: any) => {
    addNotification(
      "❌ Indexer API service is unavailable at the moment! Please, try to change the indexer."
    );
    if (get(response, "errors", false)) {
      console.log("errors: ", JSON.stringify(response.errors, null, 2));
    } else {
      console.log("No error logs were provided by Indexer.");
    }
  };

  const showNoInvoicesNotification = () => {
    addNotification("💡 You don't have any invoices.");
  };

  return appId ? (
    <FlexColumn className="commonParagraph myInvoicesParent" padded>
      {!isEmptyInvoices() ? (
        <Container>
          <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-inbox-tab"
                  data-toggle="pill"
                  data-target="#pills-inbox"
                  type="button"
                  role="tab"
                  aria-controls="pills-inbox"
                  aria-selected="true">
                  Inbox
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-details-tab"
                  data-toggle="pill"
                  data-target="#pills-details"
                  type="button"
                  role="tab"
                  aria-controls="pills-details"
                  aria-selected="false">
                  Details
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-guide-tab"
                  data-toggle="pill"
                  data-target="#pills-guide"
                  type="button"
                  role="tab"
                  aria-controls="pills-guide"
                  aria-selected="false">
                  Guide
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-inbox"
                role="tabpanel"
                aria-labelledby="pills-inbox-tab">
                <TableWrapper>
                  <TableHeader>
                    <h5 className="sc-pFZIQ ePBsdD">Recent Invoices</h5>
                    <a
                      className="btn btn-link no-padding"
                      href="/algorand/pools">
                      See All
                    </a>
                  </TableHeader>
                  <div className="table-responsive">
                    <Table className="table-hover table table-striped mt-2">
                      <thead className="thead-invoicer">
                        <tr>
                          <th>#</th>
                          <th>Due date</th>
                          <th>Address</th>
                          <th>Amount</th>
                          <th>Pay</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[unpaidIndex, paidIndex, canceledIndex].map(
                          (statusIndex) =>
                            getInvoicesByIndex(statusIndex)?.map(
                              (invoice: any, index) => (
                                <tr
                                  className={rowStyles[statusIndex]}
                                  key={`InvoiceRowKey_${statusIndex}_${index}`}>
                                  <td>{getInvoiceSerial(invoice)}</td>
                                  <td>{getInvoiceInfo(invoice)?.dueDate}</td>
                                  <td>
                                    <OverlayTrigger
                                      placement="bottom"
                                      overlay={
                                        <Tooltip
                                          id={`billFromAlgoAddress-tooltip_${statusIndex}_${index}`}>
                                          {
                                            getInvoiceInfo(invoice)
                                              ?.billFromAlgoAddress
                                          }
                                        </Tooltip>
                                      }>
                                      {({ ref, ...triggerHandler }) => (
                                        <div {...triggerHandler} ref={ref}>
                                          {getInvoiceInfo(invoice)
                                            ? truncateString(
                                                getInvoiceInfo(invoice)!
                                                  .billFromAlgoAddress
                                              )
                                            : ""}
                                        </div>
                                      )}
                                    </OverlayTrigger>
                                  </td>
                                  <td>{`${getInvoiceCurrency(
                                    invoice
                                  )} ${getInvoiceAmount(invoice)}`}</td>
                                  <td>
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        setClickedInvoice(invoice)
                                      }>
                                      Open
                                    </Button>
                                  </td>
                                </tr>
                              )
                            )
                        )}
                      </tbody>
                    </Table>
                  </div>
                </TableWrapper>
              </div>
              <div
                className="tab-pane fade"
                id="pills-details"
                role="tabpanel"
                aria-labelledby="pills-details-tab">
                <TableWrapper>
                  <TableHeader>
                    <h5 className="sc-pFZIQ ePBsdD">Invoice Status</h5>
                    <CsvDownloader
                      filename={getFilename()}
                      extension=".csv"
                      separator=";"
                      columns={getCsvColumns()}
                      datas={async () => {
                        const gridData: Datas =
                          (await asyncExportCsv()) as Datas;
                        setExportLoading(false);
                        return gridData;
                      }}>
                      <Button
                        className="btn export-btn btn-link"
                        disabled={!invoices}>
                        {(exportLoading ?? false) && (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                        {`${exportLoading ?? false ? " " : ""}Export CSV`}
                      </Button>
                    </CsvDownloader>
                  </TableHeader>

                  <div className="table-responsive invoicer-table-responsive">
                    <Table className="table-hover table table-striped mt-2">
                      <thead>
                        <tr>
                          {Object.keys(InvoiceStatuses).map((key, index) => (
                            <th
                              className={getSumHeaderClass(index)}
                              key={`InvoiceSumKey_${index}`}>
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {[...invoices.values()].map((invoiceArray, index) => (
                            <td
                              key={`InvoiceSumValueKey_${index}`}
                              style={{
                                fontWeight: "bold",
                                borderStyle: "solid",
                                borderWidth: "thin",
                              }}>
                              {invoiceArray.length}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </TableWrapper>
                <Form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    refreshInvoicesTable(
                      e.target.fromDate.value,
                      e.target.toDate.value
                    );
                  }}>
                  <ButtonToolbar
                    className="mb-3"
                    aria-label="Toolbar with Button groups">
                    <InputGroup>
                      <InputGroup.Text id="btnGroupAddon" className="dateLabel">
                        From date
                      </InputGroup.Text>
                      <FormControl
                        type="date"
                        name="fromDate"
                        defaultValue={initialFromDate}
                        aria-label="From date"
                        aria-describedby="btnGroupAddon"
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroup.Text
                        id="btnGroupAddon2"
                        className="dateLabel">
                        To date
                      </InputGroup.Text>
                      <FormControl
                        type="date"
                        name="toDate"
                        defaultValue={initialToDate}
                        aria-label="To date"
                        aria-describedby="btnGroupAddon2"
                      />
                    </InputGroup>
                    <Button variant="primary" type="submit">
                      Refresh
                    </Button>
                  </ButtonToolbar>
                </Form>
                <Row>
                  <Form
                    onSubmit={(e: any) => {
                      e.preventDefault();
                      refreshInvoicesTable(
                        e.target.fromDate.value,
                        e.target.toDate.value
                      );
                    }}>
                    <ButtonToolbar
                      className="mb-3"
                      aria-label="Toolbar with Button groups"></ButtonToolbar>

                    <ButtonToolbar
                      className="justify-content-between"
                      aria-label="Toolbar with Button groups">
                      <ButtonGroup aria-label="First group">
                        <ButtonGroup
                          className="ms-2"
                          aria-label="First group"></ButtonGroup>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Form>
                </Row>
              </div>
              <div
                className="tab-pane fade"
                id="pills-guide"
                role="tabpanel"
                aria-labelledby="pills-guide-tab">
                Coming Soon!
              </div>
            </div>
          </>

          {clickedInvoice && (
            <InvoiceModal
              showModal={clickedInvoice}
              closeModal={closeModal}
              invoiceStatus={getInvoiceStatusIndex(clickedInvoice)}
              serialNumber={getInvoiceSerial(clickedInvoice)}
              info={getInvoiceInfo(clickedInvoice)}
              invoiceItems={getInvoiceItems(clickedInvoice)}
              currency={getInvoiceCurrency(clickedInvoice)}
              total={getInvoiceAmount(clickedInvoice)}
            />
          )}
        </Container>
      ) : (
        <h1 className="h3 commonHeader">{`
        You don't have any invoices.
        `}</h1>
      )}
    </FlexColumn>
  ) : (
    <h1 className="h2 commonHeader">No connected contract!</h1>
  );
};

export default MyInvoices;
