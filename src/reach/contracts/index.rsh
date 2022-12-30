"reach 0.1";

const bytesLength = 943;

const InvoiceStruct = Struct([["invoiceJson", Bytes(bytesLength)]]);

const LogObject = Object({ message: Bytes(bytesLength) });

const CommonInterface = {
  log: Fun([LogObject], Null),
  notifyComplete: Fun([LogObject], Null),
};

const InvoicerInterface = {
  ...CommonInterface,
};

const AdminInterface = {
  ...CommonInterface,
};

export const main = Reach.App(() => {
  const Admin = Participant("Admin", AdminInterface);
  const Invoicer = Participant("Invoicer", InvoicerInterface);
  const User = API("User", {
    getInvoiceNumber: Fun([], UInt),
    payInvoice: Fun([Address, UInt, InvoiceStruct], UInt),
    createInvoice: Fun([InvoiceStruct], UInt),
  });

  init();

  Admin.only(() => {
    interact.log({
      message: Bytes(bytesLength).pad("Contract initialized!"),
    });
  });

  Admin.publish();

  Admin.only(() => {
    interact.notifyComplete({
      message: Bytes(bytesLength).pad("Contract deployed!"),
    });
  });

  Invoicer.only(() => {
    interact.notifyComplete({
      message: Bytes(bytesLength).pad("Invoicer connected!"),
    });
  });

  const state = parallelReduce({ counter: 1 })
    .invariant(state.counter > 0)
    .while(true)
    .api(User.getInvoiceNumber, (notify) => {
      notify(state.counter);
      return { ...state, counter: state.counter };
    })
    .api(
      User.payInvoice,
      (recipient, amount, invoiceStruct) => {
        assume(
          recipient &&
            recipient != "" &&
            amount > 0 &&
            Object.has(invoiceStruct, "invoiceJson") &&
            invoiceStruct.invoiceJson != ""
        );
      },
      (_, amount, _) => amount,
      (recipient, amount, _, notify) => {
        transfer(amount).to(recipient);
        notify(state.counter);
        return { ...state, counter: state.counter };
      }
    )
    .api(
      User.createInvoice,
      (invoiceStruct) => {
        assume(
          Object.has(invoiceStruct, "invoiceJson") &&
            invoiceStruct.invoiceJson != ""
        );
      },
      (_) => 0,
      (_, notify) => {
        notify(state.counter);
        return { ...state, counter: state.counter + 1 };
      }
    );

  transfer(balance()).to(Admin);

  commit();

  exit();
});
