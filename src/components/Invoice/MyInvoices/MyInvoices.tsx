import { truncateString } from "@jackcom/reachduck";
import { get } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import CsvDownloader from "react-csv-downloader";
import { Datas } from "react-csv-downloader/dist/esm/lib/csv";
import { Tooltip } from "react-tooltip";
import { Apis, fetchGraphQl } from "src/utils/requests";
import styled from "styled-components";
import InvoiceModal from "../../../components/Invoice/InvoiceModal";
import store, { addNotification } from "../../../state";
import { COMING_SOON, InvoiceStatuses } from "../../../utils";
import { FlexColumn } from "../../Common/Containers";

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
  const [selectedTab, setSelectedTab] = useState(0);
  const [exportLoading, setExportLoading] = useState(false);
  const [clickedInvoice, setClickedInvoice] = useState<any>();
  const [receivedInvoices, setReceivedInvoices] =
    useState<Map<string, any[]>>(defaultInvoices);
  const [sentInvoices, setSentInvoices] =
    useState<Map<string, any[]>>(defaultInvoices);
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
    return () => abortController.abort();
  }, []);

  const isEmptyInvoices = (invoices: Map<string, any[]>) => {
    const invArrs = [...invoices.values()];
    for (let i = 0; i < invArrs.length; i += 1) {
      const arr = invArrs[i];
      if (arr && arr.length > 0) {
        return false;
      }
    }
    return true;
  };

  function filterInvoicesByStatus(
    myInvoices: any,
    setMyInvoices: Dispatch<SetStateAction<Map<string, any[]>>>,
    successNotification: string,
    errorNotification: string
  ) {
    if (myInvoices.length > 0) {
      const invoicesMap = new Map<string, any[]>([
        [Object.keys(InvoiceStatuses)[0], []],
        [Object.keys(InvoiceStatuses)[1], []],
        [Object.keys(InvoiceStatuses)[2], []],
      ]);

      for (const invoice of myInvoices) {
        const invoicesArr = invoicesMap.get(
          Object.keys(InvoiceStatuses)[invoice.status]
        );
        if (invoicesArr) {
          invoicesArr.push(invoice);
        }
      }

      addNotification(successNotification);
      setMyInvoices(invoicesMap);
    } else {
      showNoInvoicesNotification(errorNotification);
    }
  }

  const getFilename = () => `${initialFromDate}_${initialToDate}`;

  const asyncExportCsv = async () => {
    setExportLoading(true);
    return new Promise((resolve) => {
      const gridData: Datas = [];
      try {
        for (const entry of sentInvoices.entries()) {
          const [status, invoicesArray] = entry;
          [unpaidIndex, paidIndex, canceledIndex].forEach((s) => {
            if (status === Object.keys(InvoiceStatuses)[s]) {
              for (const k in invoicesArray) {
                if (k !== undefined) {
                  const invoice = invoicesArray[k];
                  const invoiceInfo = getInvoiceInfo(invoice);
                  const invoiceItems = getInvoiceItems(invoice);
                  const items: string[] = [];
                  if (invoiceItems?.length) {
                    for (let i = 0; i < invoiceItems.length; i += 1) {
                      const it = invoiceItems[i];
                      items.push(
                        `${it.name} -> ${it.description}: ${it.quantity}x${it.price}Ⱥ`
                      );
                    }
                    if (invoiceInfo && invoiceItems) {
                      gridData.push(getCsvObject(invoice, invoiceInfo, items));
                    }
                  } else {
                    addNotification(`❌ Invoice doesn't have any items!`);
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
      id: "issueDate",
      displayName: "Issue date",
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
    issueDate: invoiceInfo.issueDate,
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
    price: `Ⱥ ${getInvoiceAmount(invoice)}`,
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

  const getInvoiceSerial = (invoiceObj: any) => {
    if (invoiceObj?.invoiceNo) {
      return invoiceObj.invoiceNo;
    }
    console.log("Cannot find invoice serial: ", invoiceObj);
    return null;
  };

  const getInvoicesByIndex = (index: number, invoices: Map<string, any[]>) => {
    const key = Object.keys(InvoiceStatuses)[index];
    return invoices.get(key);
  };

  const getInvoiceStatusLabel = (invoiceObj: any) => {
    if (invoiceObj?.status !== undefined) {
      return Object.keys(InvoiceStatuses)[invoiceObj.status];
    }
    console.log("Cannot find invoice status: ", invoiceObj);
    return null;
  };

  const getInvoiceStatusIndex = (invoiceObj: any) => {
    if (invoiceObj?.status !== undefined) {
      return invoiceObj.status;
    }
    console.log("Cannot find invoice status index: ", invoiceObj);
    return null;
  };

  const getInvoiceInfo = (invoiceObj: any) => {
    if (invoiceObj) {
      const billFromObj = invoiceObj.fromData;
      const billToObj = invoiceObj.toData;
      const issueDate = invoiceObj.issueDate;
      const dueDate = invoiceObj.dueDate;
      const note = invoiceObj.note;
      if (
        billFromObj &&
        billToObj &&
        issueDate &&
        dueDate &&
        note !== undefined
      ) {
        return {
          billFrom: billFromObj.name.trim(),
          billFromAddress: billFromObj.billingAddress?.trim(),
          billFromEmail: billFromObj.email?.trim(),
          billFromAlgoAddress: billFromObj.algoAddressId.trim(),
          billTo: billToObj.name.trim(),
          billToAddress: billToObj.billingAddress?.trim(),
          billToEmail: billToObj.email?.trim(),
          billToAlgoAddress: billToObj.algoAddressId.trim(),
          issueDate: issueDate.slice(0, 10),
          dueDate: dueDate.slice(0, 10),
          note: note.trim(),
        };
      }
      console.log("The invoice is malformed: ", invoiceObj);
    } else {
      console.log("This invoice is malformed: ", invoiceObj);
    }
    return null;
  };

  const getInvoiceItems = (invoiceObj: any) => {
    if (invoiceObj?.items?.nodes?.length) {
      return invoiceObj.items.nodes;
    } else {
      console.log("Cannot find invoice items: ", invoiceObj);
    }
    return null;
  };

  const getInvoiceAmount = (invoiceObj: any) => {
    if (invoiceObj?.priceData?.total !== undefined) {
      return invoiceObj.priceData.total;
    } else {
      console.log("Cannot find amount info: ", invoiceObj);
    }
    return null;
  };

  const getApplicationTransactions = async (
    fromDate: string,
    toDate: string
  ) => {
    const transactionsFetchSuccess = await new Promise(
      async (resolve, reject) => {
        try {
          const receivedInvoicesResp = await fetchGraphQl(
            Apis.GetReceivedInvoices,
            {
              address: address.toLocaleLowerCase(),
              fromDate: fromDate,
              toDate: toDate,
            }
          );
          const sentInvoicesResp = await fetchGraphQl(Apis.GetSentInvoices, {
            address: address.toLocaleLowerCase(),
            fromDate: fromDate,
            toDate: toDate,
          });
          if (
            !receivedInvoicesResp?.invoices?.nodes ||
            !sentInvoicesResp?.invoices?.nodes
          ) {
            showApiErrorNotification(receivedInvoicesResp);
            addNotification(`❌ Error during transactions query!`);
          } else {
            filterInvoicesByStatus(
              receivedInvoicesResp.invoices.nodes,
              setReceivedInvoices,
              "`💡 Received invoices loaded successfully.`",
              "💡 No new received invoices."
            );
            filterInvoicesByStatus(
              sentInvoicesResp.invoices.nodes,
              setSentInvoices,
              "`💡 Sent invoices loaded successfully.`",
              "💡 No new sent invoices."
            );
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
  };

  console.log("sent invs:", sentInvoices);

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

  const showApiErrorNotification = (response: any) => {
    addNotification(
      "❌ SubQuery service is unavailable at the moment! Please, try try again later."
    );
    if (get(response, "errors", false)) {
      console.log("errors: ", JSON.stringify(response.errors, null, 2));
    } else {
      console.log("No error logs were provided by Indexer.");
    }
  };

  const showNoInvoicesNotification = (message: string) => {
    addNotification(message);
  };

  const DateRangeForm = (
    <Form
      onSubmit={(e: any) => {
        e.preventDefault();
        refreshInvoicesTable(e.target.fromDate.value, e.target.toDate.value);
      }}>
      <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
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
          <InputGroup.Text id="btnGroupAddon2" className="dateLabel">
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
  );
  return appId ? (
    <FlexColumn className="commonParagraph myInvoicesParent" padded>
      <Container>
        <>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link${selectedTab === 0 ? " active" : ""}`}
                id="pills-inbox-tab"
                onClick={() => setSelectedTab(0)}
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
                className={`nav-link${selectedTab === 1 ? " active" : ""}`}
                id="pills-details-tab"
                onClick={() => setSelectedTab(1)}
                data-toggle="pill"
                data-target="#pills-details"
                type="button"
                role="tab"
                aria-controls="pills-details"
                aria-selected="false">
                Sent
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            {selectedTab === 0 && (
              <div
                className="tab-pane fade show active"
                id="pills-inbox"
                role="tabpanel"
                aria-labelledby="pills-inbox-tab">
                <TableWrapper>
                  <TableHeader>
                    <h5 className="sc-pFZIQ ePBsdD">Recent Invoices</h5>
                    {DateRangeForm}
                    <a
                      className="btn btn-link no-padding text-decoration-none"
                      data-tooltip-id={"seeAll-tooltip"}
                      data-tooltip-content={COMING_SOON}
                      data-tooltip-place="top"
                      data-tooltip-variant="info">
                      See All
                    </a>
                    <Tooltip id={"seeAll-tooltip"} />
                  </TableHeader>
                  <div className="table-responsive">
                    <Table className="invoicesTable table-hover table table-striped mt-2">
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
                            getInvoicesByIndex(
                              statusIndex,
                              receivedInvoices
                            )?.map((invoice: any, index) => (
                              <tr
                                className={rowStyles[statusIndex]}
                                key={`InvoiceRowKey_${statusIndex}_${index}`}>
                                <td>{getInvoiceSerial(invoice)}</td>
                                <td>{getInvoiceInfo(invoice)?.dueDate}</td>
                                <td>
                                  <a
                                    data-tooltip-id={`billFromAlgoAddress-tooltip_${statusIndex}_${index}`}
                                    data-tooltip-content={
                                      getInvoiceInfo(invoice)
                                        ?.billFromAlgoAddress
                                    }
                                    data-tooltip-place="bottom"
                                    data-tooltip-variant="info">
                                    {getInvoiceInfo(invoice)
                                      ? truncateString(
                                          getInvoiceInfo(invoice)!
                                            .billFromAlgoAddress
                                        )
                                      : ""}
                                  </a>
                                  <Tooltip
                                    id={`billFromAlgoAddress-tooltip_${statusIndex}_${index}`}
                                  />
                                </td>
                                <td>{`Ⱥ ${getInvoiceAmount(invoice)}`}</td>
                                <td>
                                  <Button
                                    variant="primary"
                                    onClick={() => setClickedInvoice(invoice)}>
                                    Open
                                  </Button>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </Table>
                  </div>
                </TableWrapper>
              </div>
            )}
            {selectedTab === 1 && (
              <div
                className="tab-pane fade show active"
                id="pills-details"
                role="tabpanel"
                aria-labelledby="pills-details-tab">
                <TableWrapper>
                  <TableHeader>
                    <h5 className="sc-pFZIQ ePBsdD">Invoice Status</h5>
                    {DateRangeForm}
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
                        className="btn export-btn text-decoration-none"
                        disabled={!sentInvoices}>
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
                    <Table className="table-hover table mt-2">
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
                          {[...sentInvoices.values()].map(
                            (invoiceArray, index) => (
                              <td
                                key={`InvoiceSumValueKey_${index}`}
                                style={{
                                  fontWeight: "bold",
                                  borderStyle: "solid",
                                  borderWidth: "thin",
                                }}>
                                {invoiceArray.length}
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </TableWrapper>
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
                      aria-label="Toolbar with Button groups"
                    />

                    <ButtonToolbar
                      className="justify-content-between"
                      aria-label="Toolbar with Button groups">
                      <ButtonGroup aria-label="First group">
                        <ButtonGroup
                          className="ms-2"
                          aria-label="First group"
                        />
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Form>
                </Row>
              </div>
            )}
          </div>
        </>

        {clickedInvoice && (
          <InvoiceModal
            showModal={!!clickedInvoice}
            closeModal={closeModal}
            invoiceStatus={getInvoiceStatusIndex(clickedInvoice)}
            serialNumber={getInvoiceSerial(clickedInvoice)}
            info={getInvoiceInfo(clickedInvoice)}
            invoiceItems={getInvoiceItems(clickedInvoice)}
            currency={"Ⱥ"}
            total={getInvoiceAmount(clickedInvoice)}
          />
        )}
      </Container>
    </FlexColumn>
  ) : (
    <h1 className="h2 commonHeader">No connected contract!</h1>
  );
};

export default MyInvoices;
