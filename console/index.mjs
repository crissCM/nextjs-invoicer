/**
 * For contract testing purposes.
 * 1. Run Admin: reach run index admin
 * 2. Get the contract ID from the logs.
 * 3. Open a new terminal tab to connect with Invoicers.
 * 4. ctc = account.contract(backend, PASTE ID HERE);
 * 5. Run as many Invoicer participants as you wish: reach run index invoicer
 */

import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "./build/index.main.mjs";
const stdlib = loadStdlib(process.env);

/**
 * ARGS: admin or invoicer
 */

(async () => {
  const consoleArgs = process.argv.slice(2);
  const user = consoleArgs[0];

  const InvoiceStatuses = {
    Unpaid: 0,
    Paid: 1,
    Canceled: 2,
  };

  const isAdmin = () => user === "admin";
  const isInvoicer = () => user === "invoicer";

  const startingBalance = stdlib.parseCurrency(80);

  const [account] = await stdlib.newTestAccounts(1, startingBalance);

  let ctc = null;
  if (isAdmin()) {
    ctc = account.contract(backend);
  } else {
    ctc = account.contract(backend, 3); // Change this to actual contract ID!
  }

  const CommonInteract = (Who) => ({
    notifyComplete: async (log) => {
      console.log(`${Who} notifyComplete `, log);
      const info = await ctc.getInfo();
      console.log("APP ID: ", info);
      // const contractAddress = await ctc.getContractAddress();
      // console.log("ContractAddress: ", contractAddress);
    },
    log: (log) => {
      console.log(`${Who} log InvoiceData `, log);
    },
  });

  const InvoicerInteract = (Who) => ({
    ...CommonInteract(Who),
  });

  const AdminInteract = (Who) => ({
    ...CommonInteract(Who),
  });

  if (isAdmin()) {
    await Promise.all([ctc.p.Admin({ ...AdminInteract("Admin") })]);
  } else {
    ctc.p.Invoicer({ ...InvoicerInteract("Invoicer") });
    await new Promise((r) => setTimeout(r, 3000));
    let nt = await stdlib.getNetworkTime();
    let currentInvoiceNumber = await ctc.a.User.getInvoiceNumber();
    console.log("getInvoiceNumber API result: ", currentInvoiceNumber);
    let createInvoiceApiResult = await ctc.a.User.createInvoice({
      invoiceJson: "asd " + nt,
    });
    console.log("createInvoiceApiResult: ", createInvoiceApiResult);
    ctc.p.Invoicer({ ...InvoicerInteract("Invoicer") });
    await new Promise((r) => setTimeout(r, 3000));
    nt = await stdlib.getNetworkTime();
    currentInvoiceNumber = await ctc.a.User.getInvoiceNumber();
    console.log("getInvoiceNumber API result: ", currentInvoiceNumber);
    createInvoiceApiResult = await ctc.a.User.createInvoice({
      invoiceJson: "asd " + nt,
    });
    console.log("createInvoiceApiResult: ", createInvoiceApiResult);
    ctc.p.Invoicer({ ...InvoicerInteract("Invoicer") });
    await new Promise((r) => setTimeout(r, 3000));
    nt = await stdlib.getNetworkTime();
    currentInvoiceNumber = await ctc.a.User.getInvoiceNumber();
    console.log("getInvoiceNumber API result: ", currentInvoiceNumber);
    createInvoiceApiResult = await ctc.a.User.createInvoice({
      invoiceJson: "asd " + nt,
    });
    console.log("createInvoiceApiResult: ", createInvoiceApiResult);
  }
})();
