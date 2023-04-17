import { truncateString } from "@jackcom/reachduck";
import Color from "color";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Col,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { BiCloudDownload, BiPaperPlane } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { useAppSelector } from "src/store/hooks";
import { Apis, fetchGraphQl } from "src/utils/requests";
import store, { addNotification } from "../../state";
import {
  InvoiceStatuses,
  THEME,
  convertAlgoToMicro,
  encodeBase64FromBinary,
  isInvoiceValid,
  sendTransaction,
  truncString,
} from "../../utils";
import CryptoIcon from "../Reach/CryptoIcon";

const InvoiceModal = ({
  showModal,
  closeModal,
  invoiceStatus, // Current invoice status.
  serialNumber, // If not null that means we are showing an on-chain invoice.
  info,
  invoiceItems,
  currency,
  total,
}) => {
  /**
   * Check wheather we want to pay an invoice or create one and publish to the chain.
   * @returns true is we want to pay an invoice, false if we want to publish an invoice to the blockchain.
   */
  const isPayMode = () => serialNumber !== null;

  const { theme } = useAppSelector((state) => state.ui);
  const gState = store.getState();
  const { address, maxBytesLength, refreshInvoicesTable } = gState;
  const [invoiceNumber, setInvoiceNumber] = useState(serialNumber);
  const [downloadDisabled, setDownloadDisabled] = useState(!isPayMode());
  const [
    notificatonTransactionDialogVisible,
    setNotificatonTransactionDialogVisible,
  ] = useState(false);
  const [invStatus, setInvStatus] = useState(invoiceStatus);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (note) {
      setNotificatonTransactionDialogVisible(true);
    }
  }, [note]);

  const editField = (event) => {
    if (event.target.name === "inputNote") {
      setNote(event.target.value);
    }
  };

  const sendNotificatonTransaction = async (
    recipientAddress,
    algoAmount,
    note
  ) => {
    addNotification(
      `💡 Attempt to send ${algoAmount} Algo transaction with a note to the recipient.`
    );
    const txId = await sendTransaction(
      address,
      recipientAddress,
      convertAlgoToMicro(algoAmount),
      note
    );
    if (txId) {
      addNotification(`✅ Sent successfully!`);
      console.log(`Transaction ID: ${txId}`);
    } else {
      let errorMsg;
      if (txId === false) {
        errorMsg = "Session expired, please log in again.";
      } else {
        errorMsg = "An error happened during the transaction!";
      }
      addNotification(`❌ ${errorMsg}`);
    }
  };

  const formatInvoiceItemValues = () => {
    return invoiceItems.map((item) => {
      const newItem = {
        i: item.id,
        n: item.name,
        d: item.description,
        p: parseFloat(item.price.toString().trim()),
        q: item.quantity,
      };
      return newItem;
    });
  };

  const getInvoiceJson = (status, info, currency, total, invoiceItems) => {
    const jsonObj = {
      s: status,
      d: [info.creationDate, info.dueDate],
      f: [
        info.billFrom,
        info.billFromAddress,
        info.billFromEmail,
        info.billFromAlgoAddress,
      ],
      t: [
        info.billTo,
        info.billToAddress,
        info.billToEmail,
        info.billToAlgoAddress,
      ],
      i: formatInvoiceItemValues(),
      n: info.note,
      p: total,
    };
    return JSON.stringify(jsonObj);
  };

  const GenerateAndSendInvoice = async (invoiceJson) => {
    try {
      const resultArr = await getFixedJson(invoiceJson);
      if (resultArr.length === 2) {
        const [invoiceNum, fixedJson] = resultArr;
        const encodedJson = encodeBase64FromBinary(
          decodeURIComponent(encodeURIComponent(fixedJson))
        );
        console.log("----- encodedJson:", encodedJson);
        if (isInvoiceValid(encodedJson)) {
          await callCreateInvoiceApi(encodedJson);
          return invoiceNum;
        } else {
          const errorMsg = "Invoice json data exceeds the max character limit.";
          addNotification(`❌ ${errorMsg}`);
          console.log(errorMsg);
        }
      } else {
        const errorMsg =
          "An error happened during calling the getInvoiceNumber API!";
        addNotification(`❌ ${errorMsg}`);
        console.log(errorMsg);
      }
    } catch (e) {
      console.log("Error GenerateInvoice: ", e);
      addNotification(`❌ ${e}`);
    }
  };

  /**
   * Get the json extended with the invoice serial number.
   * @param invoiceJson Json to fix
   * @returns
   */
  const getFixedJson = async (invoiceJson) => {
    const globalState = store.getState();
    const { ctc, address } = globalState;
    let currentInvoiceNumber = serialNumber;
    if (!isPayMode()) {
      addNotification(
        `💡 Attempt to get the invoice serial number from the smart contract.`
      );
      const invoiceNumberResp = await fetchGraphQl(Apis.GetInvoicesNumber, {
        address: address.toLocaleLowerCase(),
      });
      if (invoiceNumberResp?.invoices) {
        currentInvoiceNumber = invoiceNumberResp.invoices.totalCount + 1;
        console.log("----- currentInvoiceNumber:", currentInvoiceNumber);
      }
      /*
        // You can get the global invoice count from the contract with this API.
        await ctc.a.User.getInvoiceNumber();
        currentInvoiceNumber = parseInt(currentInvoiceNumber._hex, 16);
        console.log("getInvoiceNumber API result: ", currentInvoiceNumber);
      */
    }
    const fixedJson = '{"' + currentInvoiceNumber + '":' + invoiceJson + "}";
    // console.log("Invoice JSON to publish: ", fixedJson);
    return [currentInvoiceNumber, fixedJson];
  };

  const DownloadCopy = (invoiceNumber) => {
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792],
      });
      pdf.internal.scaleFactor = 1;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${invoiceNumber}.pdf`);
    });
  };

  const callCreateInvoiceApi = async (fixedJson) => {
    const globalState = store.getState();
    const { ctc } = globalState;
    let createInvoiceApiResult;
    if (!isPayMode()) {
      addNotification(`💡 Attempt to publish the invoice to the blockchain.`);
      createInvoiceApiResult = await ctc.a.User.createInvoice({
        invoiceJson: fixedJson,
      });
    } else {
      addNotification(`💡 Attempt to pay the invoice.`);
      createInvoiceApiResult = await ctc.a.User.payInvoice(
        info.billFromAlgoAddress,
        convertAlgoToMicro(total),
        {
          invoiceJson: fixedJson,
        }
      );
    }
    console.log("createInvoice API result: ", createInvoiceApiResult);
  };

  return (
    <div>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <CloseButton
          className="TopRightCloseButton"
          onClick={closeModal}
          aria-label="Close"
          variant={`${theme === THEME.DARK ? "white" : "black"}`}
        />
        <div id="invoiceCapture">
          <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
            <div className="w-100">
              <h4 className="fw-bold my-2">
                {info.billFrom || "John Uberbacher"}
              </h4>
              {invoiceNumber && (
                <h6 className="fw-bold text-secondary mb-1">
                  Invoice #: {invoiceNumber}
                </h6>
              )}
            </div>
            <div className="text-end ms-4">
              <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
              <h5 className="fw-bold text-secondary">
                {" "}
                {currency} {total}
              </h5>
            </div>
          </div>
          <div className="p-4 bg-light">
            <Row className="mb-4">
              <Col md={4}>
                <div className="fw-bold">Billed to:</div>
                <div>{truncString(info.billTo) || ""}</div>
                <div>{truncString(info.billToAddress) || ""}</div>
                <div>{truncString(info.billToEmail) || ""}</div>
                <a
                  data-tooltip-id="billToAlgoAddress-tooltip"
                  data-tooltip-content={info.billToAlgoAddress}
                  data-tooltip-place="bottom"
                  data-tooltip-variant="info">
                  {truncateString(info.billToAlgoAddress) || ""}
                </a>
                <Tooltip id="billToAlgoAddress-tooltip" />
              </Col>
              <Col md={4}>
                <div className="fw-bold">Billed From:</div>
                <div>{truncString(info.billFrom) || ""}</div>
                <div>{truncString(info.billFromAddress) || ""}</div>
                <div>{truncString(info.billFromEmail) || ""}</div>
                <a
                  data-tooltip-id="billFromAlgoAddress-tooltip"
                  data-tooltip-content={info.billFromAlgoAddress}
                  data-tooltip-place="bottom"
                  data-tooltip-variant="info">
                  {truncateString(info.billFromAlgoAddress) || ""}
                </a>
                <Tooltip id="billFromAlgoAddress-tooltip" />
              </Col>
              <Col md={4}>
                <div className="fw-bold mt-2">Due Date:</div>
                <div>{info.dueDate || ""}</div>
              </Col>
            </Row>
            <Table className="mb-0">
              <thead>
                <tr>
                  <th>QTY</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end">PRICE</th>
                  <th className="text-end">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, i) => {
                  return (
                    <tr id={i} key={i}>
                      <td style={{ width: "70px" }}>{item.quantity}</td>
                      <td>
                        {truncString(
                          `${item.name}${
                            !!item.description ? ` - ${item.description}` : ""
                          }`,
                          60
                        )}
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {currency} {item.price}
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {currency} {item.price * item.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Table>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    TOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {currency} {total}
                  </td>
                </tr>
              </tbody>
            </Table>
            {info.note && (
              <div className="bg-light py-3 px-4 rounded">
                {truncString(info.note, 70)}
              </div>
            )}
          </div>
        </div>
        <div className="pb-4 px-4">
          <Row>
            {invStatus !== InvoiceStatuses.Paid && (
              <Col md={6}>
                {downloadDisabled && (
                  <Button
                    variant="primary"
                    className="d-block w-100"
                    onClick={async () => {
                      try {
                        store.loading(true);
                        const invoiceNumber = await GenerateAndSendInvoice(
                          getInvoiceJson(
                            isPayMode()
                              ? InvoiceStatuses.Paid
                              : InvoiceStatuses.Unpaid,
                            info,
                            currency,
                            total,
                            invoiceItems
                          )
                        );
                        if (invoiceNumber) {
                          setInvoiceNumber(invoiceNumber);
                          setDownloadDisabled(false);
                          if (isPayMode()) {
                            setInvStatus(InvoiceStatuses.Paid);
                            const message = "Invoice paid successfully!";
                            addNotification(`✅ ${message}`);
                            console.log(message);
                          } else {
                            const message =
                              "Invoice data published successfully!";
                            addNotification(`✅ ${message}`);
                            console.log(message);
                          }
                          store.refreshInvoicesTable(!refreshInvoicesTable);
                          setNote(
                            isPayMode()
                              ? `Invoice paid: #${invoiceNumber}`
                              : `You got an invoice: #${invoiceNumber}`
                          );
                        }
                      } catch (e) {
                        console.log("Error Send Invoice Button: ", e);
                        addNotification(`❌ ${e}`);
                      } finally {
                        store.loading(false);
                      }
                    }}>
                    {isPayMode() ? (
                      <CryptoIcon
                        symbol="algo"
                        color="black"
                        iconOnly={true}
                        size={18}
                        classNameArg="me-2"
                        styleArg={{
                          marginBottom: "-3px",
                        }}
                      />
                    ) : (
                      <BiPaperPlane
                        style={{
                          width: "15px",
                          height: "15px",
                          marginTop: "-3px",
                        }}
                        className="me-2"
                      />
                    )}
                    {`${isPayMode() ? "Pay" : "Send"} Invoice`}
                  </Button>
                )}
              </Col>
            )}
            <Col md={downloadDisabled ? 6 : 12}>
              <Button
                variant="outline-primary"
                className="d-block w-100 mt-3 mt-md-0"
                onClick={() => DownloadCopy(invoiceNumber)}
                disabled={downloadDisabled}>
                <BiCloudDownload
                  style={{ width: "16px", height: "16px", marginTop: "-3px" }}
                  className="me-2"
                />
                Download Copy
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
      <Modal
        style={{ background: Color("black").alpha(0.4).string() }}
        show={notificatonTransactionDialogVisible}
        centered>
        <Modal.Header>
          <Modal.Title>
            Do you want to send a notification to the recipient address?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Label htmlFor="inputNote">Note:</Form.Label>
          <Form.Control
            id="inputNote"
            name="inputNote"
            type="text"
            defaultValue={note}
            aria-describedby="noteHelpBlock"
            onChange={(event) => editField(event)}
            isInvalid={note && note.length > maxBytesLength}
          />
          <Form.Control.Feedback type="invalid">
            {`Character limit is ${maxBytesLength}.`}
          </Form.Control.Feedback>
          <Form.Text id="noteHelpBlock" muted>
            <span>A zero transaction will be sent with a note to:&nbsp;</span>
            <a
              data-tooltip-id="billToAlgoAddress-noti-tooltip"
              data-tooltip-content={info.billToAlgoAddress}
              data-tooltip-place="bottom"
              data-tooltip-variant="info">
              {truncateString(info.billToAlgoAddress) || ""}
            </a>
            <Tooltip id="billToAlgoAddress-noti-tooltip" />
          </Form.Text>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setNotificatonTransactionDialogVisible(false);
              setNote("");
            }}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              sendNotificatonTransaction(info.billToAlgoAddress, 0, note);
              setNotificatonTransactionDialogVisible(false);
              setNote("");
            }}>
            Yes, Send it!
          </Button>
        </Modal.Footer>
      </Modal>
      <hr className="mt-4 mb-3" />
    </div>
  );
};

export default InvoiceModal;
