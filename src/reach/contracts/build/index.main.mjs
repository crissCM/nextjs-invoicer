// Automatically generated with Reach 0.1.13 (88e48902)
/* eslint-disable */
export const _version = '0.1.13';
export const _versionHash = '0.1.13 (88e48902)';
export const _backendVersion = 27;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  
  return {
    infos: {
      },
    views: {
      3: [ctc0, ctc1, ctc1]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Admin(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Admin expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Admin expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '943'));
  const ctc2 = stdlib.T_Struct([['invoiceJson', ctc1]]);
  const ctc3 = stdlib.T_Tuple([ctc2]);
  const ctc4 = stdlib.T_Tuple([]);
  const ctc5 = stdlib.T_Address;
  const ctc6 = stdlib.T_UInt;
  const ctc7 = stdlib.T_Tuple([ctc5, ctc6, ctc2]);
  const ctc8 = stdlib.T_Data({
    User_createInvoice0_46: ctc3,
    User_getInvoiceNumber0_46: ctc4,
    User_payInvoice0_46: ctc7
    });
  
  
  const v256 = 'Contract initialized!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ';
  const v257 = {
    message: v256
    };
  stdlib.protect(ctc0, await interact.log(v257), {
    at: './src/reach/contracts/index.rsh:34:17:application',
    fs: ['at ./src/reach/contracts/index.rsh:33:13:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:33:17:function exp)'],
    msg: 'log',
    who: 'Admin'
    });
  
  const txn1 = await (ctc.sendrecv({
    args: [],
    evt_cnt: 0,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:39:9:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:39:9:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [], secs: v260, time: v259, didSend: v27, from: v258 } = txn1;
      
      ;
      
      const v269 = stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:53:37:decimal', stdlib.UInt_max, '1');
      const v270 = v259;
      const v273 = stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:31:9:after expr stmt semicolon', stdlib.UInt_max, '0');
      
      if (await (async () => {
        
        return true;})()) {
        sim_r.isHalt = false;
        }
      else {
        sim_r.txns.push({
          kind: 'from',
          to: v258,
          tok: undefined /* Nothing */
          });
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        }
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v260, time: v259, didSend: v27, from: v258 } = txn1;
  ;
  const v263 = 'Contract deployed!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ';
  const v264 = {
    message: v263
    };
  stdlib.protect(ctc0, await interact.notifyComplete(v264), {
    at: './src/reach/contracts/index.rsh:42:28:application',
    fs: ['at ./src/reach/contracts/index.rsh:41:13:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:41:17:function exp)'],
    msg: 'notifyComplete',
    who: 'Admin'
    });
  
  let v269 = stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:53:37:decimal', stdlib.UInt_max, '1');
  let v270 = v259;
  let v273 = stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:31:9:after expr stmt semicolon', stdlib.UInt_max, '0');
  
  let txn2 = txn1;
  while (await (async () => {
    
    return true;})()) {
    const txn3 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 2,
      out_tys: [ctc8],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v331], secs: v333, time: v332, didSend: v191, from: v330 } = txn3;
    switch (v331[0]) {
      case 'User_createInvoice0_46': {
        const v334 = v331[1];
        undefined /* setApiDetails */;
        ;
        await txn3.getOutput('User_createInvoice', 'v269', ctc6, v269);
        const v356 = stdlib.safeAdd(v269, stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:89:27:decimal', stdlib.UInt_max, '1'));
        const cv269 = v356;
        const cv270 = v332;
        const cv273 = v273;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
        txn2 = txn3;
        continue;
        break;
        }
      case 'User_getInvoiceNumber0_46': {
        const v383 = v331[1];
        undefined /* setApiDetails */;
        ;
        await txn3.getOutput('User_getInvoiceNumber', 'v269', ctc6, v269);
        const cv269 = v269;
        const cv270 = v332;
        const cv273 = v273;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
        txn2 = txn3;
        continue;
        break;
        }
      case 'User_payInvoice0_46': {
        const v432 = v331[1];
        undefined /* setApiDetails */;
        const v441 = v432[stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:60:9:spread', stdlib.UInt_max, '1')];
        const v444 = stdlib.add(v273, v441);
        ;
        const v464 = v432[stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:60:9:spread', stdlib.UInt_max, '0')];
        const v470 = stdlib.sub(v444, v441);
        ;
        await txn3.getOutput('User_payInvoice', 'v269', ctc6, v269);
        const cv269 = v269;
        const cv270 = v332;
        const cv273 = v470;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
        txn2 = txn3;
        continue;
        break;
        }
      }
    
    }
  ;
  return;
  
  
  };
export async function Invoicer(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Invoicer expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Invoicer expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '943'));
  const ctc2 = stdlib.T_Struct([['invoiceJson', ctc1]]);
  const ctc3 = stdlib.T_Tuple([ctc2]);
  const ctc4 = stdlib.T_Tuple([]);
  const ctc5 = stdlib.T_Address;
  const ctc6 = stdlib.T_UInt;
  const ctc7 = stdlib.T_Tuple([ctc5, ctc6, ctc2]);
  const ctc8 = stdlib.T_Data({
    User_createInvoice0_46: ctc3,
    User_getInvoiceNumber0_46: ctc4,
    User_payInvoice0_46: ctc7
    });
  
  
  const txn1 = await (ctc.recv({
    didSend: false,
    evt_cnt: 0,
    funcNum: 0,
    out_tys: [],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [], secs: v260, time: v259, didSend: v27, from: v258 } = txn1;
  ;
  const v267 = 'Invoicer connected!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ';
  const v268 = {
    message: v267
    };
  stdlib.protect(ctc0, await interact.notifyComplete(v268), {
    at: './src/reach/contracts/index.rsh:48:28:application',
    fs: ['at ./src/reach/contracts/index.rsh:47:16:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:47:20:function exp)'],
    msg: 'notifyComplete',
    who: 'Invoicer'
    });
  
  let v269 = stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:53:37:decimal', stdlib.UInt_max, '1');
  let v270 = v259;
  let v273 = stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:31:9:after expr stmt semicolon', stdlib.UInt_max, '0');
  
  let txn2 = txn1;
  while (await (async () => {
    
    return true;})()) {
    const txn3 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 2,
      out_tys: [ctc8],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v331], secs: v333, time: v332, didSend: v191, from: v330 } = txn3;
    switch (v331[0]) {
      case 'User_createInvoice0_46': {
        const v334 = v331[1];
        undefined /* setApiDetails */;
        ;
        await txn3.getOutput('User_createInvoice', 'v269', ctc6, v269);
        const v356 = stdlib.safeAdd(v269, stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:89:27:decimal', stdlib.UInt_max, '1'));
        const cv269 = v356;
        const cv270 = v332;
        const cv273 = v273;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
        txn2 = txn3;
        continue;
        break;
        }
      case 'User_getInvoiceNumber0_46': {
        const v383 = v331[1];
        undefined /* setApiDetails */;
        ;
        await txn3.getOutput('User_getInvoiceNumber', 'v269', ctc6, v269);
        const cv269 = v269;
        const cv270 = v332;
        const cv273 = v273;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
        txn2 = txn3;
        continue;
        break;
        }
      case 'User_payInvoice0_46': {
        const v432 = v331[1];
        undefined /* setApiDetails */;
        const v441 = v432[stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:60:9:spread', stdlib.UInt_max, '1')];
        const v444 = stdlib.add(v273, v441);
        ;
        const v464 = v432[stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:60:9:spread', stdlib.UInt_max, '0')];
        const v470 = stdlib.sub(v444, v441);
        ;
        await txn3.getOutput('User_payInvoice', 'v269', ctc6, v269);
        const cv269 = v269;
        const cv270 = v332;
        const cv273 = v470;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
        txn2 = txn3;
        continue;
        break;
        }
      }
    
    }
  ;
  return;
  
  
  };
export async function _User_createInvoice3(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _User_createInvoice3 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _User_createInvoice3 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '943'));
  const ctc3 = stdlib.T_Struct([['invoiceJson', ctc2]]);
  const ctc4 = stdlib.T_Tuple([ctc3]);
  const ctc5 = stdlib.T_Tuple([]);
  const ctc6 = stdlib.T_Tuple([ctc0, ctc1, ctc3]);
  const ctc7 = stdlib.T_Data({
    User_createInvoice0_46: ctc4,
    User_getInvoiceNumber0_46: ctc5,
    User_payInvoice0_46: ctc6
    });
  const ctc8 = stdlib.T_Null;
  
  
  const [v258, v269, v273] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [ctc0, ctc1, ctc1]);
  const v310 = stdlib.protect(ctc4, await interact.in(), {
    at: './src/reach/contracts/index.rsh:1:23:application',
    fs: ['at ./src/reach/contracts/index.rsh:80:23:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:80:23:function exp)', 'at ./src/reach/contracts/index.rsh:53:35:application call to "runUser_createInvoice0_46" (defined at: ./src/reach/contracts/index.rsh:78:9:function exp)', 'at ./src/reach/contracts/index.rsh:53:35:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:53:35:function exp)'],
    msg: 'in',
    who: 'User_createInvoice'
    });
  const v321 = ['User_createInvoice0_46', v310];
  
  const txn1 = await (ctc.sendrecv({
    args: [v258, v269, v273, v321],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc7],
    pay: [stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:86:14:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v331], secs: v333, time: v332, didSend: v191, from: v330 } = txn1;
      
      switch (v331[0]) {
        case 'User_createInvoice0_46': {
          const v334 = v331[1];
          sim_r.txns.push({
            kind: 'api',
            who: "User_createInvoice"
            });
          ;
          const v349 = await txn1.getOutput('User_createInvoice', 'v269', ctc1, v269);
          
          const v356 = stdlib.safeAdd(v269, stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:89:27:decimal', stdlib.UInt_max, '1'));
          const v670 = v356;
          const v672 = v273;
          sim_r.isHalt = false;
          
          break;
          }
        case 'User_getInvoiceNumber0_46': {
          const v383 = v331[1];
          
          break;
          }
        case 'User_payInvoice0_46': {
          const v432 = v331[1];
          
          break;
          }
        }
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc1, ctc1, ctc7],
    waitIfNotPresent: false
    }));
  const {data: [v331], secs: v333, time: v332, didSend: v191, from: v330 } = txn1;
  switch (v331[0]) {
    case 'User_createInvoice0_46': {
      const v334 = v331[1];
      undefined /* setApiDetails */;
      ;
      const v349 = await txn1.getOutput('User_createInvoice', 'v269', ctc1, v269);
      if (v191) {
        stdlib.protect(ctc8, await interact.out(v334, v349), {
          at: './src/reach/contracts/index.rsh:79:7:application',
          fs: ['at ./src/reach/contracts/index.rsh:79:7:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:79:7:function exp)', 'at ./src/reach/contracts/index.rsh:88:15:application call to "notify" (defined at: ./src/reach/contracts/index.rsh:87:19:function exp)', 'at ./src/reach/contracts/index.rsh:87:19:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:87:19:function exp)'],
          msg: 'out',
          who: 'User_createInvoice'
          });
        }
      else {
        }
      
      const v356 = stdlib.safeAdd(v269, stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:89:27:decimal', stdlib.UInt_max, '1'));
      const v670 = v356;
      const v672 = v273;
      return;
      
      break;
      }
    case 'User_getInvoiceNumber0_46': {
      const v383 = v331[1];
      return;
      break;
      }
    case 'User_payInvoice0_46': {
      const v432 = v331[1];
      return;
      break;
      }
    }
  
  
  };
export async function _User_getInvoiceNumber3(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _User_getInvoiceNumber3 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _User_getInvoiceNumber3 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Tuple([]);
  const ctc3 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '943'));
  const ctc4 = stdlib.T_Struct([['invoiceJson', ctc3]]);
  const ctc5 = stdlib.T_Tuple([ctc4]);
  const ctc6 = stdlib.T_Tuple([ctc0, ctc1, ctc4]);
  const ctc7 = stdlib.T_Data({
    User_createInvoice0_46: ctc5,
    User_getInvoiceNumber0_46: ctc2,
    User_payInvoice0_46: ctc6
    });
  const ctc8 = stdlib.T_Null;
  
  
  const [v258, v269, v273] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [ctc0, ctc1, ctc1]);
  const v277 = stdlib.protect(ctc2, await interact.in(), {
    at: './src/reach/contracts/index.rsh:1:23:application',
    fs: ['at ./src/reach/contracts/index.rsh:56:9:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:56:9:function exp)', 'at ./src/reach/contracts/index.rsh:53:35:application call to "runUser_getInvoiceNumber0_46" (defined at: ./src/reach/contracts/index.rsh:56:9:function exp)', 'at ./src/reach/contracts/index.rsh:53:35:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:53:35:function exp)'],
    msg: 'in',
    who: 'User_getInvoiceNumber'
    });
  const v281 = ['User_getInvoiceNumber0_46', v277];
  
  const txn1 = await (ctc.sendrecv({
    args: [v258, v269, v273, v281],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc7],
    pay: [stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:56:9:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v331], secs: v333, time: v332, didSend: v191, from: v330 } = txn1;
      
      switch (v331[0]) {
        case 'User_createInvoice0_46': {
          const v334 = v331[1];
          
          break;
          }
        case 'User_getInvoiceNumber0_46': {
          const v383 = v331[1];
          sim_r.txns.push({
            kind: 'api',
            who: "User_getInvoiceNumber"
            });
          ;
          const v408 = await txn1.getOutput('User_getInvoiceNumber', 'v269', ctc1, v269);
          
          const v682 = v269;
          const v684 = v273;
          sim_r.isHalt = false;
          
          break;
          }
        case 'User_payInvoice0_46': {
          const v432 = v331[1];
          
          break;
          }
        }
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc1, ctc1, ctc7],
    waitIfNotPresent: false
    }));
  const {data: [v331], secs: v333, time: v332, didSend: v191, from: v330 } = txn1;
  switch (v331[0]) {
    case 'User_createInvoice0_46': {
      const v334 = v331[1];
      return;
      break;
      }
    case 'User_getInvoiceNumber0_46': {
      const v383 = v331[1];
      undefined /* setApiDetails */;
      ;
      const v408 = await txn1.getOutput('User_getInvoiceNumber', 'v269', ctc1, v269);
      if (v191) {
        stdlib.protect(ctc8, await interact.out(v383, v408), {
          at: './src/reach/contracts/index.rsh:56:10:application',
          fs: ['at ./src/reach/contracts/index.rsh:56:10:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:56:10:function exp)', 'at ./src/reach/contracts/index.rsh:57:13:application call to "notify" (defined at: ./src/reach/contracts/index.rsh:56:42:function exp)', 'at ./src/reach/contracts/index.rsh:56:42:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:56:42:function exp)'],
          msg: 'out',
          who: 'User_getInvoiceNumber'
          });
        }
      else {
        }
      
      const v682 = v269;
      const v684 = v273;
      return;
      
      break;
      }
    case 'User_payInvoice0_46': {
      const v432 = v331[1];
      return;
      break;
      }
    }
  
  
  };
export async function _User_payInvoice3(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _User_payInvoice3 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _User_payInvoice3 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '943'));
  const ctc3 = stdlib.T_Struct([['invoiceJson', ctc2]]);
  const ctc4 = stdlib.T_Tuple([ctc0, ctc1, ctc3]);
  const ctc5 = stdlib.T_Tuple([ctc3]);
  const ctc6 = stdlib.T_Tuple([]);
  const ctc7 = stdlib.T_Data({
    User_createInvoice0_46: ctc5,
    User_getInvoiceNumber0_46: ctc6,
    User_payInvoice0_46: ctc4
    });
  const ctc8 = stdlib.T_Null;
  
  
  const [v258, v269, v273] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [ctc0, ctc1, ctc1]);
  const v285 = stdlib.protect(ctc4, await interact.in(), {
    at: './src/reach/contracts/index.rsh:1:23:application',
    fs: ['at ./src/reach/contracts/index.rsh:62:42:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:62:42:function exp)', 'at ./src/reach/contracts/index.rsh:53:35:application call to "runUser_payInvoice0_46" (defined at: ./src/reach/contracts/index.rsh:60:9:function exp)', 'at ./src/reach/contracts/index.rsh:53:35:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:53:35:function exp)'],
    msg: 'in',
    who: 'User_payInvoice'
    });
  const v287 = v285[stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:1:23:application', stdlib.UInt_max, '1')];
  const v295 = stdlib.gt(v287, stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:66:22:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v295, {
    at: './src/reach/contracts/index.rsh:63:15:application',
    fs: ['at ./src/reach/contracts/index.rsh:62:42:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:62:42:function exp)', 'at ./src/reach/contracts/index.rsh:62:42:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:62:42:function exp)', 'at ./src/reach/contracts/index.rsh:53:35:application call to "runUser_payInvoice0_46" (defined at: ./src/reach/contracts/index.rsh:60:9:function exp)', 'at ./src/reach/contracts/index.rsh:53:35:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:53:35:function exp)'],
    msg: null,
    who: 'User_payInvoice'
    });
  const v306 = ['User_payInvoice0_46', v285];
  
  const txn1 = await (ctc.sendrecv({
    args: [v258, v269, v273, v306],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc7],
    pay: [v287, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v331], secs: v333, time: v332, didSend: v191, from: v330 } = txn1;
      
      switch (v331[0]) {
        case 'User_createInvoice0_46': {
          const v334 = v331[1];
          
          break;
          }
        case 'User_getInvoiceNumber0_46': {
          const v383 = v331[1];
          
          break;
          }
        case 'User_payInvoice0_46': {
          const v432 = v331[1];
          sim_r.txns.push({
            kind: 'api',
            who: "User_payInvoice"
            });
          const v441 = v432[stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:60:9:spread', stdlib.UInt_max, '1')];
          const v444 = stdlib.add(v273, v441);
          sim_r.txns.push({
            amt: v441,
            kind: 'to',
            tok: undefined /* Nothing */
            });
          const v464 = v432[stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:60:9:spread', stdlib.UInt_max, '0')];
          const v470 = stdlib.sub(v444, v441);
          sim_r.txns.push({
            kind: 'from',
            to: v464,
            tok: undefined /* Nothing */
            });
          const v471 = await txn1.getOutput('User_payInvoice', 'v269', ctc1, v269);
          
          const v694 = v269;
          const v696 = v470;
          sim_r.isHalt = false;
          
          break;
          }
        }
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc1, ctc1, ctc7],
    waitIfNotPresent: false
    }));
  const {data: [v331], secs: v333, time: v332, didSend: v191, from: v330 } = txn1;
  switch (v331[0]) {
    case 'User_createInvoice0_46': {
      const v334 = v331[1];
      return;
      break;
      }
    case 'User_getInvoiceNumber0_46': {
      const v383 = v331[1];
      return;
      break;
      }
    case 'User_payInvoice0_46': {
      const v432 = v331[1];
      undefined /* setApiDetails */;
      const v441 = v432[stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:60:9:spread', stdlib.UInt_max, '1')];
      const v444 = stdlib.add(v273, v441);
      ;
      const v464 = v432[stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:60:9:spread', stdlib.UInt_max, '0')];
      const v470 = stdlib.sub(v444, v441);
      ;
      const v471 = await txn1.getOutput('User_payInvoice', 'v269', ctc1, v269);
      if (v191) {
        stdlib.protect(ctc8, await interact.out(v432, v471), {
          at: './src/reach/contracts/index.rsh:61:7:application',
          fs: ['at ./src/reach/contracts/index.rsh:61:7:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:61:7:function exp)', 'at ./src/reach/contracts/index.rsh:74:15:application call to "notify" (defined at: ./src/reach/contracts/index.rsh:72:38:function exp)', 'at ./src/reach/contracts/index.rsh:72:38:application call to [unknown function] (defined at: ./src/reach/contracts/index.rsh:72:38:function exp)'],
          msg: 'out',
          who: 'User_payInvoice'
          });
        }
      else {
        }
      
      const v694 = v269;
      const v696 = v470;
      return;
      
      break;
      }
    }
  
  
  };
export async function User_createInvoice(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for User_createInvoice expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for User_createInvoice expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  if (step == 3) {return _User_createInvoice3(ctcTop, interact);}
  throw stdlib.apiStateMismatchError({ _stateSourceMap }, [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')], stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step))
  };
export async function User_getInvoiceNumber(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for User_getInvoiceNumber expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for User_getInvoiceNumber expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  if (step == 3) {return _User_getInvoiceNumber3(ctcTop, interact);}
  throw stdlib.apiStateMismatchError({ _stateSourceMap }, [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')], stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step))
  };
export async function User_payInvoice(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for User_payInvoice expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for User_payInvoice expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  if (step == 3) {return _User_payInvoice3(ctcTop, interact);}
  throw stdlib.apiStateMismatchError({ _stateSourceMap }, [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')], stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step))
  };
const _ALGO = {
  ABI: {
    impure: [`User_createInvoice((byte[943]))uint64`, `User_getInvoiceNumber()uint64`, `User_payInvoice(address,uint64,(byte[943]))uint64`, `_reachp_0((uint64))void`, `_reachp_2((uint64,(byte,byte[983])))void`],
    pure: [],
    sigs: [`User_createInvoice((byte[943]))uint64`, `User_getInvoiceNumber()uint64`, `User_payInvoice(address,uint64,(byte[943]))uint64`, `_reachp_0((uint64))void`, `_reachp_2((uint64,(byte,byte[983])))void`]
    },
  GlobalNumByteSlice: 2,
  GlobalNumUint: 0,
  LocalNumByteSlice: 0,
  LocalNumUint: 0,
  appApproval: `CCAGAAEIKAMgJgMBAAgAAAAAAAABDQAxGEEFdCpkSSJbNQEkWzUCKGSCBQQaI43dBKFMaqwEwDlIAATBlK2ZBP4HuTw2GgCOBQABAFkFMgUeBEEANhoBNQskryg0C1Alr1BQNQshBDQBEkRJVwAgNRFJIQVbNRAlWzUONAsiWzUMNAskgdgHWDUNgAQrv/EjNAwWUDQNULA0DIgFijQNIlWNAwUbBR4FIUL/p4DgBwAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANQtC+9E2GgE2GgIXNhoDNQs1DDUNJK+AAQI0DTQMFlA0C1BQUDULQvusKTQQFlCwNBAWNQQ0ECMIMgY1DzUQNBE0EBZQNA4WUCEEMgY1AjUBKExXADBnKjQBFjQCFlBnMRkiEkSIATo0A0AACoAEFR98dTQEULAjQyk0EBZQsDQQFjUEMgY1D0L/tDQLIQVbSTUMiADmNAw0C1cAIIgA2Ck0EBZQsDQQFjUEMgY0DjQMCDQMCTUONQ9C/4MxADURNAsXNQyABILEYf40DBZQsDQMiADDIzIGIjUONQ81EEL/XYgAj4GgjQY0Bgg1BjYaATULQv/GiAB7NhoBNQtC+tUiMTQSRIECMTUSRCIxNhJEIjE3EkSIAFuBMK8iIkL/LDEZIhJEQv9EIrIBI7IQsgeyCLOJQv7yQv8+NA0jgdcHWDULQv9ESIlMCUk1BjIJiAAliQlJQf/uSTUGiAAdiTEZgQUSRIgAOSIyCjIJiAA9Qv70IzUDibFC/60xFjQAIwhJNQAJRwI4BzIKEkQ4ECMSRDgIEkSJSSISTDQCEhFEiTQGNAdKD0H/nkL/prGyCUL/dQ==`,
  appApprovalMap: {
    0: `2`,
    1: `2`,
    10: `2`,
    100: `36`,
    1000: `79`,
    1001: `79`,
    1002: `79`,
    1003: `79`,
    1004: `79`,
    1005: `79`,
    1006: `79`,
    1007: `79`,
    1008: `79`,
    1009: `79`,
    101: `38`,
    1010: `79`,
    1011: `79`,
    1012: `79`,
    1013: `79`,
    1014: `79`,
    1015: `79`,
    1016: `79`,
    1017: `79`,
    1018: `79`,
    1019: `79`,
    102: `38`,
    1020: `79`,
    1021: `79`,
    1022: `79`,
    1023: `79`,
    1024: `79`,
    1025: `79`,
    1026: `79`,
    1027: `79`,
    1028: `79`,
    1029: `79`,
    103: `39`,
    1030: `79`,
    1031: `79`,
    1032: `79`,
    1033: `79`,
    1034: `79`,
    1035: `79`,
    1036: `79`,
    1037: `79`,
    1038: `79`,
    1039: `79`,
    104: `39`,
    1040: `79`,
    1041: `79`,
    1042: `79`,
    1043: `79`,
    1044: `79`,
    1045: `79`,
    1046: `79`,
    1047: `79`,
    1048: `79`,
    1049: `79`,
    105: `40`,
    1050: `79`,
    1051: `79`,
    1052: `79`,
    1053: `79`,
    1054: `79`,
    1055: `79`,
    1056: `79`,
    1057: `79`,
    1058: `79`,
    1059: `79`,
    106: `41`,
    1060: `79`,
    1061: `79`,
    1062: `79`,
    1063: `79`,
    1064: `79`,
    1065: `79`,
    1066: `79`,
    1067: `79`,
    1068: `79`,
    1069: `79`,
    107: `43`,
    1070: `79`,
    1071: `79`,
    1072: `79`,
    1073: `79`,
    1074: `79`,
    1075: `79`,
    1076: `79`,
    1077: `79`,
    1078: `79`,
    1079: `79`,
    108: `44`,
    1080: `79`,
    1081: `79`,
    1082: `79`,
    1083: `79`,
    1084: `79`,
    1085: `79`,
    1086: `79`,
    1087: `79`,
    1088: `79`,
    1089: `79`,
    109: `44`,
    1090: `79`,
    1091: `79`,
    1092: `79`,
    1093: `79`,
    1094: `79`,
    1095: `79`,
    1096: `79`,
    1097: `79`,
    1098: `79`,
    1099: `79`,
    11: `2`,
    110: `44`,
    1100: `79`,
    1101: `79`,
    1102: `79`,
    1103: `79`,
    1104: `79`,
    1105: `79`,
    1106: `79`,
    1107: `79`,
    1108: `79`,
    1109: `79`,
    111: `45`,
    1110: `79`,
    1111: `79`,
    1112: `79`,
    1113: `79`,
    1114: `79`,
    1115: `79`,
    1116: `79`,
    1117: `79`,
    1118: `79`,
    1119: `79`,
    112: `45`,
    1120: `79`,
    1121: `79`,
    1122: `79`,
    1123: `79`,
    1124: `79`,
    1125: `79`,
    1126: `79`,
    1127: `79`,
    1128: `79`,
    1129: `79`,
    113: `46`,
    1130: `79`,
    1131: `79`,
    1132: `79`,
    1133: `79`,
    1134: `79`,
    1135: `79`,
    1136: `79`,
    1137: `79`,
    1138: `79`,
    1139: `79`,
    114: `47`,
    1140: `79`,
    1141: `79`,
    1142: `79`,
    1143: `79`,
    1144: `79`,
    1145: `79`,
    1146: `79`,
    1147: `79`,
    1148: `79`,
    1149: `79`,
    115: `47`,
    1150: `79`,
    1151: `79`,
    1152: `79`,
    1153: `79`,
    1154: `79`,
    1155: `79`,
    1156: `79`,
    1157: `79`,
    1158: `79`,
    1159: `79`,
    116: `48`,
    1160: `79`,
    1161: `79`,
    1162: `79`,
    1163: `79`,
    1164: `79`,
    1165: `79`,
    1166: `79`,
    1167: `80`,
    1168: `80`,
    1169: `81`,
    117: `49`,
    1170: `81`,
    1171: `81`,
    1172: `83`,
    1173: `83`,
    1174: `83`,
    1175: `84`,
    1176: `84`,
    1177: `84`,
    1178: `85`,
    1179: `86`,
    118: `49`,
    1180: `86`,
    1181: `86`,
    1182: `87`,
    1183: `87`,
    1184: `88`,
    1185: `88`,
    1186: `89`,
    1187: `89`,
    1188: `91`,
    1189: `92`,
    119: `50`,
    1190: `93`,
    1191: `93`,
    1192: `93`,
    1193: `94`,
    1194: `94`,
    1195: `95`,
    1196: `95`,
    1197: `96`,
    1198: `97`,
    1199: `98`,
    12: `2`,
    120: `51`,
    1200: `98`,
    1201: `99`,
    1202: `100`,
    1203: `101`,
    1204: `102`,
    1205: `102`,
    1206: `103`,
    1207: `103`,
    1208: `103`,
    1209: `105`,
    121: `52`,
    1210: `106`,
    1211: `106`,
    1212: `107`,
    1213: `108`,
    1214: `109`,
    1215: `110`,
    1216: `110`,
    1217: `111`,
    1218: `112`,
    1219: `112`,
    122: `52`,
    1220: `113`,
    1221: `113`,
    1222: `114`,
    1223: `115`,
    1224: `116`,
    1225: `116`,
    1226: `117`,
    1227: `117`,
    1228: `118`,
    1229: `118`,
    123: `53`,
    1230: `121`,
    1231: `121`,
    1232: `122`,
    1233: `122`,
    1234: `123`,
    1235: `124`,
    1236: `125`,
    1237: `125`,
    1238: `126`,
    1239: `127`,
    124: `53`,
    1240: `128`,
    1241: `128`,
    1242: `129`,
    1243: `129`,
    1244: `131`,
    1245: `131`,
    1246: `132`,
    1247: `132`,
    1248: `133`,
    1249: `134`,
    125: `54`,
    1250: `135`,
    1251: `135`,
    1252: `135`,
    1253: `136`,
    1254: `137`,
    1255: `138`,
    1256: `138`,
    1257: `139`,
    1258: `140`,
    1259: `140`,
    126: `55`,
    1260: `141`,
    1261: `142`,
    1262: `143`,
    1263: `144`,
    1264: `144`,
    1265: `145`,
    1266: `146`,
    1267: `147`,
    1268: `149`,
    1269: `149`,
    127: `56`,
    1270: `149`,
    1271: `151`,
    1272: `151`,
    1273: `152`,
    1274: `152`,
    1275: `152`,
    1276: `154`,
    1277: `154`,
    1278: `154`,
    1279: `154`,
    128: `56`,
    1280: `154`,
    1281: `154`,
    1282: `155`,
    1283: `155`,
    1284: `156`,
    1285: `157`,
    1286: `159`,
    1287: `160`,
    1288: `162`,
    1289: `163`,
    129: `57`,
    1290: `163`,
    1291: `164`,
    1292: `165`,
    1293: `166`,
    1294: `167`,
    1295: `167`,
    1296: `168`,
    1297: `169`,
    1298: `169`,
    1299: `170`,
    13: `2`,
    130: `57`,
    1300: `170`,
    1301: `171`,
    1302: `171`,
    1303: `172`,
    1304: `172`,
    1305: `172`,
    1306: `174`,
    1307: `174`,
    1308: `175`,
    1309: `175`,
    131: `58`,
    1310: `176`,
    1311: `177`,
    1312: `178`,
    1313: `178`,
    1314: `179`,
    1315: `179`,
    1316: `179`,
    1317: `182`,
    1318: `182`,
    1319: `184`,
    132: `59`,
    1320: `184`,
    1321: `185`,
    1322: `185`,
    1323: `185`,
    1324: `186`,
    1325: `186`,
    1326: `186`,
    1327: `187`,
    1328: `188`,
    1329: `188`,
    133: `59`,
    1330: `189`,
    1331: `190`,
    1332: `191`,
    1333: `192`,
    1334: `192`,
    1335: `193`,
    1336: `194`,
    1337: `194`,
    1338: `195`,
    1339: `195`,
    134: `59`,
    1340: `196`,
    1341: `196`,
    1342: `197`,
    1343: `197`,
    1344: `198`,
    1345: `199`,
    1346: `199`,
    1347: `200`,
    1348: `201`,
    1349: `201`,
    135: `60`,
    1350: `202`,
    1351: `202`,
    1352: `203`,
    1353: `203`,
    1354: `203`,
    1355: `205`,
    1356: `205`,
    1357: `206`,
    1358: `206`,
    1359: `207`,
    136: `61`,
    1360: `207`,
    1361: `208`,
    1362: `209`,
    1363: `209`,
    1364: `210`,
    1365: `210`,
    1366: `210`,
    1367: `210`,
    1368: `210`,
    1369: `210`,
    137: `61`,
    1370: `211`,
    1371: `211`,
    1372: `212`,
    1373: `213`,
    1374: `214`,
    1375: `216`,
    1376: `216`,
    1377: `217`,
    1378: `217`,
    1379: `217`,
    138: `62`,
    1380: `218`,
    1381: `219`,
    1382: `219`,
    1383: `220`,
    1384: `221`,
    1385: `221`,
    1386: `222`,
    1387: `222`,
    1388: `223`,
    1389: `223`,
    139: `62`,
    1390: `224`,
    1391: `224`,
    1392: `224`,
    1393: `226`,
    1394: `226`,
    1395: `226`,
    1396: `227`,
    1397: `227`,
    1398: `227`,
    1399: `227`,
    14: `2`,
    140: `62`,
    1400: `229`,
    1401: `229`,
    1402: `230`,
    1403: `231`,
    1404: `231`,
    1405: `232`,
    1406: `232`,
    1407: `232`,
    1408: `233`,
    1409: `233`,
    141: `62`,
    1410: `234`,
    1411: `234`,
    1412: `234`,
    1413: `236`,
    1414: `236`,
    1415: `236`,
    1416: `237`,
    1417: `237`,
    1418: `237`,
    1419: `238`,
    142: `62`,
    1420: `238`,
    1421: `239`,
    1422: `239`,
    1423: `239`,
    1424: `241`,
    1425: `242`,
    1426: `242`,
    1427: `243`,
    1428: `244`,
    1429: `245`,
    143: `62`,
    1430: `245`,
    1431: `246`,
    1432: `246`,
    1433: `247`,
    1434: `248`,
    1435: `249`,
    1436: `250`,
    1437: `250`,
    1438: `251`,
    1439: `252`,
    144: `63`,
    1440: `253`,
    1441: `254`,
    1442: `254`,
    1443: `255`,
    1444: `256`,
    1445: `257`,
    1446: `257`,
    1447: `257`,
    1448: `258`,
    1449: `258`,
    145: `63`,
    1450: `259`,
    1451: `260`,
    1452: `261`,
    1453: `262`,
    1454: `262`,
    1455: `262`,
    1456: `264`,
    1457: `264`,
    1458: `265`,
    1459: `266`,
    146: `64`,
    1460: `267`,
    1461: `269`,
    1462: `269`,
    1463: `269`,
    1464: `271`,
    1465: `272`,
    1466: `272`,
    1467: `273`,
    1468: `274`,
    1469: `274`,
    147: `65`,
    1470: `275`,
    1471: `275`,
    1472: `276`,
    1473: `276`,
    1474: `277`,
    1475: `278`,
    1476: `280`,
    1477: `280`,
    1478: `280`,
    1479: `282`,
    148: `66`,
    1480: `282`,
    1481: `282`,
    1482: `284`,
    1483: `284`,
    1484: `285`,
    1485: `286`,
    1486: `286`,
    1487: `286`,
    1488: `287`,
    1489: `288`,
    149: `66`,
    1490: `288`,
    1491: `289`,
    1492: `289`,
    1493: `289`,
    1494: `291`,
    1495: `292`,
    1496: `294`,
    1497: `295`,
    1498: `296`,
    1499: `297`,
    15: `2`,
    150: `67`,
    1500: `297`,
    1501: `298`,
    1502: `298`,
    1503: `299`,
    1504: `299`,
    1505: `299`,
    1506: `300`,
    1507: `302`,
    1508: `303`,
    1509: `304`,
    151: `68`,
    1510: `304`,
    1511: `304`,
    1512: `305`,
    1513: `306`,
    1514: `306`,
    1515: `307`,
    1516: `307`,
    1517: `307`,
    1518: `308`,
    1519: `310`,
    152: `70`,
    1520: `310`,
    1521: `311`,
    1522: `311`,
    1523: `312`,
    1524: `313`,
    1525: `315`,
    1526: `315`,
    1527: `315`,
    1528: `317`,
    1529: `318`,
    153: `70`,
    1530: `318`,
    1531: `319`,
    1532: `319`,
    1533: `320`,
    1534: `320`,
    1535: `320`,
    1536: `321`,
    1537: `321`,
    1538: `321`,
    1539: `323`,
    154: `71`,
    1540: `324`,
    1541: `324`,
    1542: `325`,
    1543: `327`,
    1544: `328`,
    1545: `328`,
    1546: `328`,
    1547: `331`,
    1548: `331`,
    1549: `332`,
    155: `71`,
    1550: `332`,
    1551: `333`,
    1552: `334`,
    1553: `335`,
    1554: `336`,
    1555: `336`,
    1556: `337`,
    1557: `338`,
    1558: `338`,
    1559: `339`,
    156: `71`,
    1560: `339`,
    1561: `340`,
    1562: `340`,
    1563: `341`,
    1564: `342`,
    1565: `343`,
    1566: `343`,
    1567: `344`,
    1568: `345`,
    1569: `346`,
    157: `72`,
    1570: `347`,
    1571: `347`,
    1572: `348`,
    1573: `349`,
    1574: `350`,
    1575: `352`,
    1576: `353`,
    1577: `354`,
    1578: `355`,
    1579: `356`,
    158: `72`,
    1580: `356`,
    1581: `357`,
    1582: `358`,
    1583: `359`,
    1584: `360`,
    1585: `362`,
    1586: `362`,
    1587: `363`,
    1588: `363`,
    1589: `364`,
    159: `73`,
    1590: `365`,
    1591: `366`,
    1592: `366`,
    1593: `366`,
    1594: `367`,
    1595: `367`,
    1596: `367`,
    1597: `369`,
    1598: `370`,
    1599: `370`,
    16: `2`,
    160: `74`,
    1600: `371`,
    161: `75`,
    162: `75`,
    163: `75`,
    164: `75`,
    165: `75`,
    166: `75`,
    167: `75`,
    168: `75`,
    169: `76`,
    17: `2`,
    170: `76`,
    171: `76`,
    172: `79`,
    173: `79`,
    174: `79`,
    175: `79`,
    176: `79`,
    177: `79`,
    178: `79`,
    179: `79`,
    18: `2`,
    180: `79`,
    181: `79`,
    182: `79`,
    183: `79`,
    184: `79`,
    185: `79`,
    186: `79`,
    187: `79`,
    188: `79`,
    189: `79`,
    19: `2`,
    190: `79`,
    191: `79`,
    192: `79`,
    193: `79`,
    194: `79`,
    195: `79`,
    196: `79`,
    197: `79`,
    198: `79`,
    199: `79`,
    2: `2`,
    20: `2`,
    200: `79`,
    201: `79`,
    202: `79`,
    203: `79`,
    204: `79`,
    205: `79`,
    206: `79`,
    207: `79`,
    208: `79`,
    209: `79`,
    21: `2`,
    210: `79`,
    211: `79`,
    212: `79`,
    213: `79`,
    214: `79`,
    215: `79`,
    216: `79`,
    217: `79`,
    218: `79`,
    219: `79`,
    22: `2`,
    220: `79`,
    221: `79`,
    222: `79`,
    223: `79`,
    224: `79`,
    225: `79`,
    226: `79`,
    227: `79`,
    228: `79`,
    229: `79`,
    23: `4`,
    230: `79`,
    231: `79`,
    232: `79`,
    233: `79`,
    234: `79`,
    235: `79`,
    236: `79`,
    237: `79`,
    238: `79`,
    239: `79`,
    24: `4`,
    240: `79`,
    241: `79`,
    242: `79`,
    243: `79`,
    244: `79`,
    245: `79`,
    246: `79`,
    247: `79`,
    248: `79`,
    249: `79`,
    25: `5`,
    250: `79`,
    251: `79`,
    252: `79`,
    253: `79`,
    254: `79`,
    255: `79`,
    256: `79`,
    257: `79`,
    258: `79`,
    259: `79`,
    26: `5`,
    260: `79`,
    261: `79`,
    262: `79`,
    263: `79`,
    264: `79`,
    265: `79`,
    266: `79`,
    267: `79`,
    268: `79`,
    269: `79`,
    27: `5`,
    270: `79`,
    271: `79`,
    272: `79`,
    273: `79`,
    274: `79`,
    275: `79`,
    276: `79`,
    277: `79`,
    278: `79`,
    279: `79`,
    28: `6`,
    280: `79`,
    281: `79`,
    282: `79`,
    283: `79`,
    284: `79`,
    285: `79`,
    286: `79`,
    287: `79`,
    288: `79`,
    289: `79`,
    29: `7`,
    290: `79`,
    291: `79`,
    292: `79`,
    293: `79`,
    294: `79`,
    295: `79`,
    296: `79`,
    297: `79`,
    298: `79`,
    299: `79`,
    3: `2`,
    30: `8`,
    300: `79`,
    301: `79`,
    302: `79`,
    303: `79`,
    304: `79`,
    305: `79`,
    306: `79`,
    307: `79`,
    308: `79`,
    309: `79`,
    31: `9`,
    310: `79`,
    311: `79`,
    312: `79`,
    313: `79`,
    314: `79`,
    315: `79`,
    316: `79`,
    317: `79`,
    318: `79`,
    319: `79`,
    32: `10`,
    320: `79`,
    321: `79`,
    322: `79`,
    323: `79`,
    324: `79`,
    325: `79`,
    326: `79`,
    327: `79`,
    328: `79`,
    329: `79`,
    33: `11`,
    330: `79`,
    331: `79`,
    332: `79`,
    333: `79`,
    334: `79`,
    335: `79`,
    336: `79`,
    337: `79`,
    338: `79`,
    339: `79`,
    34: `11`,
    340: `79`,
    341: `79`,
    342: `79`,
    343: `79`,
    344: `79`,
    345: `79`,
    346: `79`,
    347: `79`,
    348: `79`,
    349: `79`,
    35: `12`,
    350: `79`,
    351: `79`,
    352: `79`,
    353: `79`,
    354: `79`,
    355: `79`,
    356: `79`,
    357: `79`,
    358: `79`,
    359: `79`,
    36: `13`,
    360: `79`,
    361: `79`,
    362: `79`,
    363: `79`,
    364: `79`,
    365: `79`,
    366: `79`,
    367: `79`,
    368: `79`,
    369: `79`,
    37: `14`,
    370: `79`,
    371: `79`,
    372: `79`,
    373: `79`,
    374: `79`,
    375: `79`,
    376: `79`,
    377: `79`,
    378: `79`,
    379: `79`,
    38: `14`,
    380: `79`,
    381: `79`,
    382: `79`,
    383: `79`,
    384: `79`,
    385: `79`,
    386: `79`,
    387: `79`,
    388: `79`,
    389: `79`,
    39: `15`,
    390: `79`,
    391: `79`,
    392: `79`,
    393: `79`,
    394: `79`,
    395: `79`,
    396: `79`,
    397: `79`,
    398: `79`,
    399: `79`,
    4: `2`,
    40: `16`,
    400: `79`,
    401: `79`,
    402: `79`,
    403: `79`,
    404: `79`,
    405: `79`,
    406: `79`,
    407: `79`,
    408: `79`,
    409: `79`,
    41: `18`,
    410: `79`,
    411: `79`,
    412: `79`,
    413: `79`,
    414: `79`,
    415: `79`,
    416: `79`,
    417: `79`,
    418: `79`,
    419: `79`,
    42: `18`,
    420: `79`,
    421: `79`,
    422: `79`,
    423: `79`,
    424: `79`,
    425: `79`,
    426: `79`,
    427: `79`,
    428: `79`,
    429: `79`,
    43: `18`,
    430: `79`,
    431: `79`,
    432: `79`,
    433: `79`,
    434: `79`,
    435: `79`,
    436: `79`,
    437: `79`,
    438: `79`,
    439: `79`,
    44: `18`,
    440: `79`,
    441: `79`,
    442: `79`,
    443: `79`,
    444: `79`,
    445: `79`,
    446: `79`,
    447: `79`,
    448: `79`,
    449: `79`,
    45: `18`,
    450: `79`,
    451: `79`,
    452: `79`,
    453: `79`,
    454: `79`,
    455: `79`,
    456: `79`,
    457: `79`,
    458: `79`,
    459: `79`,
    46: `18`,
    460: `79`,
    461: `79`,
    462: `79`,
    463: `79`,
    464: `79`,
    465: `79`,
    466: `79`,
    467: `79`,
    468: `79`,
    469: `79`,
    47: `18`,
    470: `79`,
    471: `79`,
    472: `79`,
    473: `79`,
    474: `79`,
    475: `79`,
    476: `79`,
    477: `79`,
    478: `79`,
    479: `79`,
    48: `18`,
    480: `79`,
    481: `79`,
    482: `79`,
    483: `79`,
    484: `79`,
    485: `79`,
    486: `79`,
    487: `79`,
    488: `79`,
    489: `79`,
    49: `18`,
    490: `79`,
    491: `79`,
    492: `79`,
    493: `79`,
    494: `79`,
    495: `79`,
    496: `79`,
    497: `79`,
    498: `79`,
    499: `79`,
    5: `2`,
    50: `18`,
    500: `79`,
    501: `79`,
    502: `79`,
    503: `79`,
    504: `79`,
    505: `79`,
    506: `79`,
    507: `79`,
    508: `79`,
    509: `79`,
    51: `18`,
    510: `79`,
    511: `79`,
    512: `79`,
    513: `79`,
    514: `79`,
    515: `79`,
    516: `79`,
    517: `79`,
    518: `79`,
    519: `79`,
    52: `18`,
    520: `79`,
    521: `79`,
    522: `79`,
    523: `79`,
    524: `79`,
    525: `79`,
    526: `79`,
    527: `79`,
    528: `79`,
    529: `79`,
    53: `18`,
    530: `79`,
    531: `79`,
    532: `79`,
    533: `79`,
    534: `79`,
    535: `79`,
    536: `79`,
    537: `79`,
    538: `79`,
    539: `79`,
    54: `18`,
    540: `79`,
    541: `79`,
    542: `79`,
    543: `79`,
    544: `79`,
    545: `79`,
    546: `79`,
    547: `79`,
    548: `79`,
    549: `79`,
    55: `18`,
    550: `79`,
    551: `79`,
    552: `79`,
    553: `79`,
    554: `79`,
    555: `79`,
    556: `79`,
    557: `79`,
    558: `79`,
    559: `79`,
    56: `18`,
    560: `79`,
    561: `79`,
    562: `79`,
    563: `79`,
    564: `79`,
    565: `79`,
    566: `79`,
    567: `79`,
    568: `79`,
    569: `79`,
    57: `18`,
    570: `79`,
    571: `79`,
    572: `79`,
    573: `79`,
    574: `79`,
    575: `79`,
    576: `79`,
    577: `79`,
    578: `79`,
    579: `79`,
    58: `18`,
    580: `79`,
    581: `79`,
    582: `79`,
    583: `79`,
    584: `79`,
    585: `79`,
    586: `79`,
    587: `79`,
    588: `79`,
    589: `79`,
    59: `18`,
    590: `79`,
    591: `79`,
    592: `79`,
    593: `79`,
    594: `79`,
    595: `79`,
    596: `79`,
    597: `79`,
    598: `79`,
    599: `79`,
    6: `2`,
    60: `18`,
    600: `79`,
    601: `79`,
    602: `79`,
    603: `79`,
    604: `79`,
    605: `79`,
    606: `79`,
    607: `79`,
    608: `79`,
    609: `79`,
    61: `18`,
    610: `79`,
    611: `79`,
    612: `79`,
    613: `79`,
    614: `79`,
    615: `79`,
    616: `79`,
    617: `79`,
    618: `79`,
    619: `79`,
    62: `18`,
    620: `79`,
    621: `79`,
    622: `79`,
    623: `79`,
    624: `79`,
    625: `79`,
    626: `79`,
    627: `79`,
    628: `79`,
    629: `79`,
    63: `18`,
    630: `79`,
    631: `79`,
    632: `79`,
    633: `79`,
    634: `79`,
    635: `79`,
    636: `79`,
    637: `79`,
    638: `79`,
    639: `79`,
    64: `18`,
    640: `79`,
    641: `79`,
    642: `79`,
    643: `79`,
    644: `79`,
    645: `79`,
    646: `79`,
    647: `79`,
    648: `79`,
    649: `79`,
    65: `18`,
    650: `79`,
    651: `79`,
    652: `79`,
    653: `79`,
    654: `79`,
    655: `79`,
    656: `79`,
    657: `79`,
    658: `79`,
    659: `79`,
    66: `18`,
    660: `79`,
    661: `79`,
    662: `79`,
    663: `79`,
    664: `79`,
    665: `79`,
    666: `79`,
    667: `79`,
    668: `79`,
    669: `79`,
    67: `18`,
    670: `79`,
    671: `79`,
    672: `79`,
    673: `79`,
    674: `79`,
    675: `79`,
    676: `79`,
    677: `79`,
    678: `79`,
    679: `79`,
    68: `19`,
    680: `79`,
    681: `79`,
    682: `79`,
    683: `79`,
    684: `79`,
    685: `79`,
    686: `79`,
    687: `79`,
    688: `79`,
    689: `79`,
    69: `19`,
    690: `79`,
    691: `79`,
    692: `79`,
    693: `79`,
    694: `79`,
    695: `79`,
    696: `79`,
    697: `79`,
    698: `79`,
    699: `79`,
    7: `2`,
    70: `19`,
    700: `79`,
    701: `79`,
    702: `79`,
    703: `79`,
    704: `79`,
    705: `79`,
    706: `79`,
    707: `79`,
    708: `79`,
    709: `79`,
    71: `20`,
    710: `79`,
    711: `79`,
    712: `79`,
    713: `79`,
    714: `79`,
    715: `79`,
    716: `79`,
    717: `79`,
    718: `79`,
    719: `79`,
    72: `20`,
    720: `79`,
    721: `79`,
    722: `79`,
    723: `79`,
    724: `79`,
    725: `79`,
    726: `79`,
    727: `79`,
    728: `79`,
    729: `79`,
    73: `20`,
    730: `79`,
    731: `79`,
    732: `79`,
    733: `79`,
    734: `79`,
    735: `79`,
    736: `79`,
    737: `79`,
    738: `79`,
    739: `79`,
    74: `20`,
    740: `79`,
    741: `79`,
    742: `79`,
    743: `79`,
    744: `79`,
    745: `79`,
    746: `79`,
    747: `79`,
    748: `79`,
    749: `79`,
    75: `20`,
    750: `79`,
    751: `79`,
    752: `79`,
    753: `79`,
    754: `79`,
    755: `79`,
    756: `79`,
    757: `79`,
    758: `79`,
    759: `79`,
    76: `20`,
    760: `79`,
    761: `79`,
    762: `79`,
    763: `79`,
    764: `79`,
    765: `79`,
    766: `79`,
    767: `79`,
    768: `79`,
    769: `79`,
    77: `20`,
    770: `79`,
    771: `79`,
    772: `79`,
    773: `79`,
    774: `79`,
    775: `79`,
    776: `79`,
    777: `79`,
    778: `79`,
    779: `79`,
    78: `20`,
    780: `79`,
    781: `79`,
    782: `79`,
    783: `79`,
    784: `79`,
    785: `79`,
    786: `79`,
    787: `79`,
    788: `79`,
    789: `79`,
    79: `20`,
    790: `79`,
    791: `79`,
    792: `79`,
    793: `79`,
    794: `79`,
    795: `79`,
    796: `79`,
    797: `79`,
    798: `79`,
    799: `79`,
    8: `2`,
    80: `20`,
    800: `79`,
    801: `79`,
    802: `79`,
    803: `79`,
    804: `79`,
    805: `79`,
    806: `79`,
    807: `79`,
    808: `79`,
    809: `79`,
    81: `20`,
    810: `79`,
    811: `79`,
    812: `79`,
    813: `79`,
    814: `79`,
    815: `79`,
    816: `79`,
    817: `79`,
    818: `79`,
    819: `79`,
    82: `20`,
    820: `79`,
    821: `79`,
    822: `79`,
    823: `79`,
    824: `79`,
    825: `79`,
    826: `79`,
    827: `79`,
    828: `79`,
    829: `79`,
    83: `22`,
    830: `79`,
    831: `79`,
    832: `79`,
    833: `79`,
    834: `79`,
    835: `79`,
    836: `79`,
    837: `79`,
    838: `79`,
    839: `79`,
    84: `24`,
    840: `79`,
    841: `79`,
    842: `79`,
    843: `79`,
    844: `79`,
    845: `79`,
    846: `79`,
    847: `79`,
    848: `79`,
    849: `79`,
    85: `24`,
    850: `79`,
    851: `79`,
    852: `79`,
    853: `79`,
    854: `79`,
    855: `79`,
    856: `79`,
    857: `79`,
    858: `79`,
    859: `79`,
    86: `24`,
    860: `79`,
    861: `79`,
    862: `79`,
    863: `79`,
    864: `79`,
    865: `79`,
    866: `79`,
    867: `79`,
    868: `79`,
    869: `79`,
    87: `25`,
    870: `79`,
    871: `79`,
    872: `79`,
    873: `79`,
    874: `79`,
    875: `79`,
    876: `79`,
    877: `79`,
    878: `79`,
    879: `79`,
    88: `25`,
    880: `79`,
    881: `79`,
    882: `79`,
    883: `79`,
    884: `79`,
    885: `79`,
    886: `79`,
    887: `79`,
    888: `79`,
    889: `79`,
    89: `27`,
    890: `79`,
    891: `79`,
    892: `79`,
    893: `79`,
    894: `79`,
    895: `79`,
    896: `79`,
    897: `79`,
    898: `79`,
    899: `79`,
    9: `2`,
    90: `28`,
    900: `79`,
    901: `79`,
    902: `79`,
    903: `79`,
    904: `79`,
    905: `79`,
    906: `79`,
    907: `79`,
    908: `79`,
    909: `79`,
    91: `29`,
    910: `79`,
    911: `79`,
    912: `79`,
    913: `79`,
    914: `79`,
    915: `79`,
    916: `79`,
    917: `79`,
    918: `79`,
    919: `79`,
    92: `30`,
    920: `79`,
    921: `79`,
    922: `79`,
    923: `79`,
    924: `79`,
    925: `79`,
    926: `79`,
    927: `79`,
    928: `79`,
    929: `79`,
    93: `30`,
    930: `79`,
    931: `79`,
    932: `79`,
    933: `79`,
    934: `79`,
    935: `79`,
    936: `79`,
    937: `79`,
    938: `79`,
    939: `79`,
    94: `31`,
    940: `79`,
    941: `79`,
    942: `79`,
    943: `79`,
    944: `79`,
    945: `79`,
    946: `79`,
    947: `79`,
    948: `79`,
    949: `79`,
    95: `32`,
    950: `79`,
    951: `79`,
    952: `79`,
    953: `79`,
    954: `79`,
    955: `79`,
    956: `79`,
    957: `79`,
    958: `79`,
    959: `79`,
    96: `33`,
    960: `79`,
    961: `79`,
    962: `79`,
    963: `79`,
    964: `79`,
    965: `79`,
    966: `79`,
    967: `79`,
    968: `79`,
    969: `79`,
    97: `34`,
    970: `79`,
    971: `79`,
    972: `79`,
    973: `79`,
    974: `79`,
    975: `79`,
    976: `79`,
    977: `79`,
    978: `79`,
    979: `79`,
    98: `35`,
    980: `79`,
    981: `79`,
    982: `79`,
    983: `79`,
    984: `79`,
    985: `79`,
    986: `79`,
    987: `79`,
    988: `79`,
    989: `79`,
    99: `36`,
    990: `79`,
    991: `79`,
    992: `79`,
    993: `79`,
    994: `79`,
    995: `79`,
    996: `79`,
    997: `79`,
    998: `79`,
    999: `79`
    },
  appClear: `CA==`,
  appClearMap: {
    },
  companionInfo: null,
  extraPages: 0,
  stateKeys: 1,
  stateSize: 48,
  unsupported: [],
  version: 13,
  warnings: []
  };
const _ETH = {
  ABI: `[{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"}],"internalType":"struct T7","name":"v719","type":"tuple"}],"stateMutability":"payable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"msg","type":"uint256"}],"name":"ReachError","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"}],"indexed":false,"internalType":"struct T7","name":"_a","type":"tuple"}],"name":"_reach_e0","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"components":[{"internalType":"enum _enum_T5","name":"which","type":"uint8"},{"components":[{"components":[{"components":[{"internalType":"bytes32","name":"elem0","type":"bytes32"},{"internalType":"bytes32","name":"elem1","type":"bytes32"},{"internalType":"bytes32","name":"elem2","type":"bytes32"},{"internalType":"bytes32","name":"elem3","type":"bytes32"},{"internalType":"bytes32","name":"elem4","type":"bytes32"},{"internalType":"bytes32","name":"elem5","type":"bytes32"},{"internalType":"bytes32","name":"elem6","type":"bytes32"},{"internalType":"bytes32","name":"elem7","type":"bytes32"},{"internalType":"bytes32","name":"elem8","type":"bytes32"},{"internalType":"bytes32","name":"elem9","type":"bytes32"},{"internalType":"bytes32","name":"elem10","type":"bytes32"},{"internalType":"bytes32","name":"elem11","type":"bytes32"},{"internalType":"bytes32","name":"elem12","type":"bytes32"},{"internalType":"bytes32","name":"elem13","type":"bytes32"},{"internalType":"bytes32","name":"elem14","type":"bytes32"},{"internalType":"bytes32","name":"elem15","type":"bytes32"},{"internalType":"bytes32","name":"elem16","type":"bytes32"},{"internalType":"bytes32","name":"elem17","type":"bytes32"},{"internalType":"bytes32","name":"elem18","type":"bytes32"},{"internalType":"bytes32","name":"elem19","type":"bytes32"},{"internalType":"bytes32","name":"elem20","type":"bytes32"},{"internalType":"bytes32","name":"elem21","type":"bytes32"},{"internalType":"bytes32","name":"elem22","type":"bytes32"},{"internalType":"bytes32","name":"elem23","type":"bytes32"},{"internalType":"bytes32","name":"elem24","type":"bytes32"},{"internalType":"bytes32","name":"elem25","type":"bytes32"},{"internalType":"bytes32","name":"elem26","type":"bytes32"},{"internalType":"bytes32","name":"elem27","type":"bytes32"},{"internalType":"bytes32","name":"elem28","type":"bytes32"},{"internalType":"bytes15","name":"elem29","type":"bytes15"}],"internalType":"struct T0","name":"invoiceJson","type":"tuple"}],"internalType":"struct T1","name":"elem0","type":"tuple"}],"internalType":"struct T2","name":"_User_createInvoice0_46","type":"tuple"},{"internalType":"bool","name":"_User_getInvoiceNumber0_46","type":"bool"},{"components":[{"internalType":"address payable","name":"elem0","type":"address"},{"internalType":"uint256","name":"elem1","type":"uint256"},{"components":[{"components":[{"internalType":"bytes32","name":"elem0","type":"bytes32"},{"internalType":"bytes32","name":"elem1","type":"bytes32"},{"internalType":"bytes32","name":"elem2","type":"bytes32"},{"internalType":"bytes32","name":"elem3","type":"bytes32"},{"internalType":"bytes32","name":"elem4","type":"bytes32"},{"internalType":"bytes32","name":"elem5","type":"bytes32"},{"internalType":"bytes32","name":"elem6","type":"bytes32"},{"internalType":"bytes32","name":"elem7","type":"bytes32"},{"internalType":"bytes32","name":"elem8","type":"bytes32"},{"internalType":"bytes32","name":"elem9","type":"bytes32"},{"internalType":"bytes32","name":"elem10","type":"bytes32"},{"internalType":"bytes32","name":"elem11","type":"bytes32"},{"internalType":"bytes32","name":"elem12","type":"bytes32"},{"internalType":"bytes32","name":"elem13","type":"bytes32"},{"internalType":"bytes32","name":"elem14","type":"bytes32"},{"internalType":"bytes32","name":"elem15","type":"bytes32"},{"internalType":"bytes32","name":"elem16","type":"bytes32"},{"internalType":"bytes32","name":"elem17","type":"bytes32"},{"internalType":"bytes32","name":"elem18","type":"bytes32"},{"internalType":"bytes32","name":"elem19","type":"bytes32"},{"internalType":"bytes32","name":"elem20","type":"bytes32"},{"internalType":"bytes32","name":"elem21","type":"bytes32"},{"internalType":"bytes32","name":"elem22","type":"bytes32"},{"internalType":"bytes32","name":"elem23","type":"bytes32"},{"internalType":"bytes32","name":"elem24","type":"bytes32"},{"internalType":"bytes32","name":"elem25","type":"bytes32"},{"internalType":"bytes32","name":"elem26","type":"bytes32"},{"internalType":"bytes32","name":"elem27","type":"bytes32"},{"internalType":"bytes32","name":"elem28","type":"bytes32"},{"internalType":"bytes15","name":"elem29","type":"bytes15"}],"internalType":"struct T0","name":"invoiceJson","type":"tuple"}],"internalType":"struct T1","name":"elem2","type":"tuple"}],"internalType":"struct T4","name":"_User_payInvoice0_46","type":"tuple"}],"internalType":"struct T5","name":"elem1","type":"tuple"}],"indexed":false,"internalType":"struct T6","name":"_a","type":"tuple"}],"name":"_reach_e2","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"v0","type":"uint256"}],"name":"_reach_oe_v269","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"components":[{"components":[{"internalType":"bytes32","name":"elem0","type":"bytes32"},{"internalType":"bytes32","name":"elem1","type":"bytes32"},{"internalType":"bytes32","name":"elem2","type":"bytes32"},{"internalType":"bytes32","name":"elem3","type":"bytes32"},{"internalType":"bytes32","name":"elem4","type":"bytes32"},{"internalType":"bytes32","name":"elem5","type":"bytes32"},{"internalType":"bytes32","name":"elem6","type":"bytes32"},{"internalType":"bytes32","name":"elem7","type":"bytes32"},{"internalType":"bytes32","name":"elem8","type":"bytes32"},{"internalType":"bytes32","name":"elem9","type":"bytes32"},{"internalType":"bytes32","name":"elem10","type":"bytes32"},{"internalType":"bytes32","name":"elem11","type":"bytes32"},{"internalType":"bytes32","name":"elem12","type":"bytes32"},{"internalType":"bytes32","name":"elem13","type":"bytes32"},{"internalType":"bytes32","name":"elem14","type":"bytes32"},{"internalType":"bytes32","name":"elem15","type":"bytes32"},{"internalType":"bytes32","name":"elem16","type":"bytes32"},{"internalType":"bytes32","name":"elem17","type":"bytes32"},{"internalType":"bytes32","name":"elem18","type":"bytes32"},{"internalType":"bytes32","name":"elem19","type":"bytes32"},{"internalType":"bytes32","name":"elem20","type":"bytes32"},{"internalType":"bytes32","name":"elem21","type":"bytes32"},{"internalType":"bytes32","name":"elem22","type":"bytes32"},{"internalType":"bytes32","name":"elem23","type":"bytes32"},{"internalType":"bytes32","name":"elem24","type":"bytes32"},{"internalType":"bytes32","name":"elem25","type":"bytes32"},{"internalType":"bytes32","name":"elem26","type":"bytes32"},{"internalType":"bytes32","name":"elem27","type":"bytes32"},{"internalType":"bytes32","name":"elem28","type":"bytes32"},{"internalType":"bytes15","name":"elem29","type":"bytes15"}],"internalType":"struct T0","name":"invoiceJson","type":"tuple"}],"internalType":"struct T1","name":"v702","type":"tuple"}],"name":"User_createInvoice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"User_getInvoiceNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address payable","name":"v714","type":"address"},{"internalType":"uint256","name":"v715","type":"uint256"},{"components":[{"components":[{"internalType":"bytes32","name":"elem0","type":"bytes32"},{"internalType":"bytes32","name":"elem1","type":"bytes32"},{"internalType":"bytes32","name":"elem2","type":"bytes32"},{"internalType":"bytes32","name":"elem3","type":"bytes32"},{"internalType":"bytes32","name":"elem4","type":"bytes32"},{"internalType":"bytes32","name":"elem5","type":"bytes32"},{"internalType":"bytes32","name":"elem6","type":"bytes32"},{"internalType":"bytes32","name":"elem7","type":"bytes32"},{"internalType":"bytes32","name":"elem8","type":"bytes32"},{"internalType":"bytes32","name":"elem9","type":"bytes32"},{"internalType":"bytes32","name":"elem10","type":"bytes32"},{"internalType":"bytes32","name":"elem11","type":"bytes32"},{"internalType":"bytes32","name":"elem12","type":"bytes32"},{"internalType":"bytes32","name":"elem13","type":"bytes32"},{"internalType":"bytes32","name":"elem14","type":"bytes32"},{"internalType":"bytes32","name":"elem15","type":"bytes32"},{"internalType":"bytes32","name":"elem16","type":"bytes32"},{"internalType":"bytes32","name":"elem17","type":"bytes32"},{"internalType":"bytes32","name":"elem18","type":"bytes32"},{"internalType":"bytes32","name":"elem19","type":"bytes32"},{"internalType":"bytes32","name":"elem20","type":"bytes32"},{"internalType":"bytes32","name":"elem21","type":"bytes32"},{"internalType":"bytes32","name":"elem22","type":"bytes32"},{"internalType":"bytes32","name":"elem23","type":"bytes32"},{"internalType":"bytes32","name":"elem24","type":"bytes32"},{"internalType":"bytes32","name":"elem25","type":"bytes32"},{"internalType":"bytes32","name":"elem26","type":"bytes32"},{"internalType":"bytes32","name":"elem27","type":"bytes32"},{"internalType":"bytes32","name":"elem28","type":"bytes32"},{"internalType":"bytes15","name":"elem29","type":"bytes15"}],"internalType":"struct T0","name":"invoiceJson","type":"tuple"}],"internalType":"struct T1","name":"v716","type":"tuple"}],"name":"User_payInvoice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"_reachCreationTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_reachCurrentState","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_reachCurrentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"components":[{"internalType":"enum _enum_T5","name":"which","type":"uint8"},{"components":[{"components":[{"components":[{"internalType":"bytes32","name":"elem0","type":"bytes32"},{"internalType":"bytes32","name":"elem1","type":"bytes32"},{"internalType":"bytes32","name":"elem2","type":"bytes32"},{"internalType":"bytes32","name":"elem3","type":"bytes32"},{"internalType":"bytes32","name":"elem4","type":"bytes32"},{"internalType":"bytes32","name":"elem5","type":"bytes32"},{"internalType":"bytes32","name":"elem6","type":"bytes32"},{"internalType":"bytes32","name":"elem7","type":"bytes32"},{"internalType":"bytes32","name":"elem8","type":"bytes32"},{"internalType":"bytes32","name":"elem9","type":"bytes32"},{"internalType":"bytes32","name":"elem10","type":"bytes32"},{"internalType":"bytes32","name":"elem11","type":"bytes32"},{"internalType":"bytes32","name":"elem12","type":"bytes32"},{"internalType":"bytes32","name":"elem13","type":"bytes32"},{"internalType":"bytes32","name":"elem14","type":"bytes32"},{"internalType":"bytes32","name":"elem15","type":"bytes32"},{"internalType":"bytes32","name":"elem16","type":"bytes32"},{"internalType":"bytes32","name":"elem17","type":"bytes32"},{"internalType":"bytes32","name":"elem18","type":"bytes32"},{"internalType":"bytes32","name":"elem19","type":"bytes32"},{"internalType":"bytes32","name":"elem20","type":"bytes32"},{"internalType":"bytes32","name":"elem21","type":"bytes32"},{"internalType":"bytes32","name":"elem22","type":"bytes32"},{"internalType":"bytes32","name":"elem23","type":"bytes32"},{"internalType":"bytes32","name":"elem24","type":"bytes32"},{"internalType":"bytes32","name":"elem25","type":"bytes32"},{"internalType":"bytes32","name":"elem26","type":"bytes32"},{"internalType":"bytes32","name":"elem27","type":"bytes32"},{"internalType":"bytes32","name":"elem28","type":"bytes32"},{"internalType":"bytes15","name":"elem29","type":"bytes15"}],"internalType":"struct T0","name":"invoiceJson","type":"tuple"}],"internalType":"struct T1","name":"elem0","type":"tuple"}],"internalType":"struct T2","name":"_User_createInvoice0_46","type":"tuple"},{"internalType":"bool","name":"_User_getInvoiceNumber0_46","type":"bool"},{"components":[{"internalType":"address payable","name":"elem0","type":"address"},{"internalType":"uint256","name":"elem1","type":"uint256"},{"components":[{"components":[{"internalType":"bytes32","name":"elem0","type":"bytes32"},{"internalType":"bytes32","name":"elem1","type":"bytes32"},{"internalType":"bytes32","name":"elem2","type":"bytes32"},{"internalType":"bytes32","name":"elem3","type":"bytes32"},{"internalType":"bytes32","name":"elem4","type":"bytes32"},{"internalType":"bytes32","name":"elem5","type":"bytes32"},{"internalType":"bytes32","name":"elem6","type":"bytes32"},{"internalType":"bytes32","name":"elem7","type":"bytes32"},{"internalType":"bytes32","name":"elem8","type":"bytes32"},{"internalType":"bytes32","name":"elem9","type":"bytes32"},{"internalType":"bytes32","name":"elem10","type":"bytes32"},{"internalType":"bytes32","name":"elem11","type":"bytes32"},{"internalType":"bytes32","name":"elem12","type":"bytes32"},{"internalType":"bytes32","name":"elem13","type":"bytes32"},{"internalType":"bytes32","name":"elem14","type":"bytes32"},{"internalType":"bytes32","name":"elem15","type":"bytes32"},{"internalType":"bytes32","name":"elem16","type":"bytes32"},{"internalType":"bytes32","name":"elem17","type":"bytes32"},{"internalType":"bytes32","name":"elem18","type":"bytes32"},{"internalType":"bytes32","name":"elem19","type":"bytes32"},{"internalType":"bytes32","name":"elem20","type":"bytes32"},{"internalType":"bytes32","name":"elem21","type":"bytes32"},{"internalType":"bytes32","name":"elem22","type":"bytes32"},{"internalType":"bytes32","name":"elem23","type":"bytes32"},{"internalType":"bytes32","name":"elem24","type":"bytes32"},{"internalType":"bytes32","name":"elem25","type":"bytes32"},{"internalType":"bytes32","name":"elem26","type":"bytes32"},{"internalType":"bytes32","name":"elem27","type":"bytes32"},{"internalType":"bytes32","name":"elem28","type":"bytes32"},{"internalType":"bytes15","name":"elem29","type":"bytes15"}],"internalType":"struct T0","name":"invoiceJson","type":"tuple"}],"internalType":"struct T1","name":"elem2","type":"tuple"}],"internalType":"struct T4","name":"_User_payInvoice0_46","type":"tuple"}],"internalType":"struct T5","name":"elem1","type":"tuple"}],"internalType":"struct T6","name":"v722","type":"tuple"}],"name":"_reachp_2","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]`,
  Bytecode: `0x60806200183190813803601f1980601f83011683019360018060401b0392848610848711176200032357808592604097885283396020918291810103126200033957845193818501858110858211176200032357865251845243600355620000666200033e565b5060049360ff8554166200030c577f87b51d26f290dc1fb530aed45f92ac77d813efb7cccb67b06c40d875955dde87868051338152835185820152a1518015908115620002ff575b5015620002e85734620002d157620000c56200033e565b903382528082019060019586835243888501526060840193600093848652895195606087018781108a821117620002be578b52858752848701918683528b88019387855260018060a01b0390511680985251825251825260038555438955895195848701525189860152516060850152606084526080840184811087821117620002ab57885283519586116200029857600254908782811c921680156200028d575b838310146200027a5750601f81116200022e575b508093601f8611600114620001c657505091839491849394620001ba575b50501b916000199060031b1c1916176002555b516114bc9081620003758239f35b01519250388062000199565b600283528183209493928692918316915b88838310620002135750505010620001f9575b505050811b01600255620001ac565b015160001960f88460031b161c19169055388080620001ea565b858701518855909601959485019487935090810190620001d7565b60028352818320601f870160051c8101918388106200026f575b601f0160051c019087905b828110620002635750506200017b565b84815501879062000253565b909150819062000248565b634e487b7160e01b845260229052602483fd5b91607f169162000167565b634e487b7160e01b835260419052602482fd5b634e487b7160e01b845260418252602484fd5b634e487b7160e01b875260418552602487fd5b845163100960cb60e01b8152600981860152602490fd5b845163100960cb60e01b8152600881860152602490fd5b90506001541438620000ae565b855163100960cb60e01b8152600781870152602490fd5b634e487b7160e01b600052604160045260246000fd5b600080fd5b60405190608082016001600160401b0381118382101762000323576040526000606083828152826020820152826040820152015256fe608060408181526004918236101561001f575b505050361561001d57005b005b600092833560e01c9182631e93b0f1146106545750816330908d4d146104995781634c0e8855146103e657816383230757146103c7578163ab53f2c61461035b578163bb968e33146100d3575063bfef10391461007c5780610012565b816003193601126100cf57806020926100c66100966107fd565b80926100a0610ad9565b87810190600182515251151586825101526100b9610ad9565b9182525187820152610c60565b01519051908152f35b5080fd5b83836108203660031901126100cf576100ea6107fd565b928151906100f7826106aa565b80358252610800366023190112610357578251906001600160401b036080830181811184821017610344578552602435600381101561032d5783526103c0908160431936011261032d57855161014c816106db565b61015536610822565b8152602085015261040435801515810361032557848701526104003661042319011261032d57855192606084019182118483101761033157508552610424356001600160a01b038116810361032d578252610444356020830152366104631901126103295783516101c5816106db565b84516101d081610711565b6104643581526104843560208201526104a435868201526104c43560608201526104e43560808201526105043560a08201526105243560c08201526105443560e082015261056435610100820152610584356101208201526105a4356101408201526105c4356101608201526105e435610180820152610604356101a0820152610624356101c0820152610644356101e082015261066435610200820152610684356102208201526106a4356102408201526106c4356102608201526106e435610280820152610704356102a0820152610724356102c0820152610744356102e082015261076435610300820152610784356103208201526107a4356103408201526107c4356103608201526107e435610380820152610804356001600160881b031981168103610325576103a082015281528482015260608201526020828101919091529361031f91610c60565b51908152f35b8780fd5b8480fd5b8680fd5b634e487b7160e01b885260419052602487fd5b634e487b7160e01b875260418352602487fd5b8380fd5b5050346100cf57816003193601126100cf578154610377610748565b91805193849283526020828185015284518093850152815b8381106103b057505060608094508284010152601f80199101168101030190f35b80860182015187820160600152869450810161038f565b5050346100cf57816003193601126100cf576020906001549051908152f35b905061040036600319011261049557356001600160a01b0381811691829003610357576103c036604319011261035757906100c66060926020956104286107fd565b938492610433610a73565b91825288820160243581528883019061044b36610822565b8252895192610459846106aa565b610461610a73565b84528b84019461046f610a9b565b86525116835152518a8351015251888251015260028251525186825101526100b9610ad9565b8280fd5b82846103c0366003190112610651576104b06107fd565b9082516104bc816106db565b8351946104c886610711565b358552602435602080870191909152604435858701526064356060870152608435608087015260a43560a087015260c43560c087015260e43560e087015261010435610100870152610124356101208701526101443561014087015261016435610160870152610184356101808701526101a4356101a08701526101c4356101c08701526101e4356101e087015261020435610200870152610224356102208701526102443561024087015261026435610260870152610284356102808701526102a4356102a08701526102c4356102c08701526102e4356102e08701526103043561030087015261032435610320870152610344356103408701526103643561036087015261038435610380870152946103a4356001600160881b031981168103610357576103a0820152815283518593926100c692849261060a816106aa565b8751610615816106db565b61061d61097d565b815281528681019161062d610a9b565b835281515282825152518682510152610644610ad9565b9182525185820152610c60565b80fd5b8490346100cf57816003193601126100cf576020906003548152f35b90600182811c921680156106a0575b602083101461068a57565b634e487b7160e01b600052602260045260246000fd5b91607f169161067f565b604081019081106001600160401b038211176106c557604052565b634e487b7160e01b600052604160045260246000fd5b602081019081106001600160401b038211176106c557604052565b608081019081106001600160401b038211176106c557604052565b6103c081019081106001600160401b038211176106c557604052565b606081019081106001600160401b038211176106c557604052565b60405190600060025461075a81610670565b8085526001918083169081156107de5750600114610798575b5050829003601f01601f191682016001600160401b038111838210176106c557604052565b600260009081526020935091836000805160206114708339815191525b8385106107ca57505050508301013880610773565b8054888601830152930192849082016107b5565b919250506020925060ff191682850152151560051b8301013880610773565b6040519061080a826106f6565b60006060838281528260208201528260408201520152565b6103c0906043190112610978576040519061083c826106db565b6040518261084982610711565b60443582526064356020830152608435604083015260a435606083015260c435608083015260e43560a08301526101043560c08301526101243560e08301526101443561010083015261016435610120830152610184356101408301526101a4356101608301526101c4356101808301526101e4356101a0830152610204356101c0830152610224356101e08301526102443561020083015261026435610220830152610284356102408301526102a4356102608301526102c4356102808301526102e4356102a0830152610304356102c0830152610324356102e08301526103443561030083015261036435610320830152610384356103408301526103a4356103608301526103c4356103808301526103e4356001600160881b031981168103610978576103a083015252565b600080fd5b6040519061098a826106db565b604051826103c082016001600160401b038111838210176106c55760405260008083528060208401528060408401528060608401528060808401528060a08401528060c08401528060e08401528061010084015280610120840152806101408401528061016084015280610180840152806101a0840152806101c0840152806101e08401528061020084015280610220840152806102408401528061026084015280610280840152806102a0840152806102c0840152806102e084015280610300840152806103208401528061034084015280610360840152806103808401526103a083015252565b60405190610a808261072d565b8160008152600060208201526040610a9661097d565b910152565b60405190610aa8826106f6565b8160008152604051610ab9816106db565b610ac161097d565b81526020820152600060408201526060610a96610a73565b60405190610ae6826106aa565b81600081526020610a96610a9b565b51805182526020810151602083015260408101516040830152606081015160608301526080810151608083015260a081015160a083015260c081015160c083015260e081015160e0830152610100808201519083015261012080820151908301526101408082015190830152610160808201519083015261018080820151908301526101a080820151908301526101c080820151908301526101e08082015190830152610200808201519083015261022080820151908301526102408082015190830152610260808201519083015261028080820151908301526102a080820151908301526102c080820151908301526102e08082015190830152610300808201519083015261032080820151908301526103408082015190830152610360808201519083015261038080820151908301526103a0908160018060881b031991015116910152565b516003811015610c4a5790565b634e487b7160e01b600052602160045260246000fd5b60405191610c6d836106db565b610c75610a73565b8352600390816000540361145657610c8b610748565b926060848051810103126109785760405193610ca68561072d565b6020810151906001600160a01b0382168203610978576060918652604081015160208701520151604085015260ff6004541661143d5760405133815281516020820152602082015180519185831015610c4a57610d7360406060610840947fad58b59cfb05345accfad88e032dffe81010e7fdc0aafd0bab1919749e0afb909683860152610d3c60208201518387019051610af5565b808301511515610420860152015180516001600160a01b031661044085015260208101516104608501520151610480830190610af5565ba180518015908115611431575b501561141857610d936020820151610c3d565b83811015610c4a57610fc057509091925034610fa757600080516020611490833981519152602080850151604051908152a1602080840151910152610dd66107fd565b82516001600160a01b031681526020830151600193818501939291848111610f91578410610978576040906020830194855243828401520151926060820193845260405193610e248561072d565b6000855260208501916000835260408601936000855260018060a01b039051168096525182525182528260005543855560405193602085015251604084015251606083015260608252610e76826106f6565b8151916001600160401b0383116106c557610e92600254610670565b601f8111610f3b575b50602090601f8411600114610ed557938394918492600095610eca575b50501b92600019911b1c191617600255565b015193503880610eb8565b9190601f1984169260026000528460206000209460005b88828210610f2257505010610f08575b50505050811b01600255565b01519060f884600019921b161c1916905538808080610efc565b8486015188559096019560209485019488935001610eec565b6002600052600080516020611470833981519152601f850160051c81019160208610610f87575b601f0160051c019085905b828110610f7b575050610e9b565b60008155018590610f6d565b9091508190610f62565b634e487b7160e01b600052601160045260246000fd5b60405163100960cb60e01b8152600d6004820152602490fd5b610fcd6020820151610c3d565b9483861015610c4a5760019586036111aa5750503461119157600080516020611490833981519152602080850151604051908152a1604060208401519101526110146107fd565b60018060a01b0383511681526040602084015193602083019485524382840152015192606082019384526040519361104b8561072d565b6000855260208501916000835260408601936000855260018060a01b03905116809652518252518252826000554385556040519360208501525160408401525160608301526060825261109d826106f6565b8151916001600160401b0383116106c5576110b9600254610670565b601f811161113b575b50602090601f84116001146110f057938394918492600095610eca5750501b92600019911b1c191617600255565b9190601f1984169260026000528460206000209460005b8882821061112257505010610f085750505050811b01600255565b8486015188559096019560209485019488935001611107565b6002600052600080516020611470833981519152601f850160051c81019160208610611187575b601f0160051c019085905b82811061117b5750506110c2565b6000815501859061116d565b9091508190611162565b60405163100960cb60e01b8152600e6004820152602490fd5b92916111bc6020839796930151610c3d565b9583871015610c4a5760028097146111d8575b50505050505050565b60606020809201510151808652015134036113ff5760008080808751602060018060a01b03825116910151908282156113f6575bf1156113ea57600080516020611490833981519152602080840151604051908152a1606060208301519101526112406107fd565b9060018060a01b0381511682526020604081830151928285019384524382860152015194510151806060840195010384526040519361127e8561072d565b6000855260208501916000835260408601936000855260018060a01b0390511680965251825251825282600055438555604051936020850152516040840152516060830152606082526112d0826106f6565b8151916001600160401b0383116106c5576112eb8554610670565b601f811161139f575b50602090601f84116001146113385793839491849260009561132d575b50501b92600019911b1c19161790555b388080808080806111cf565b015193503880611311565b9190601f19841692866000528460206000209460005b888282106113865750501061136c575b50505050811b019055611321565b01519060f884600019921b161c191690553880808061135e565b848601518855909601956020948501948893500161134e565b856000526020600020601f850160051c810191602086106113e0575b601f0160051c019085905b8281106113d45750506112f4565b600081550185906113c6565b90915081906113bb565b6040513d6000823e3d90fd5b506108fc61120c565b60405163100960cb60e01b8152600f6004820152602490fd5b60405163100960cb60e01b8152600c6004820152602490fd5b90506001541438610d80565b60405163100960cb60e01b8152600b6004820152602490fd5b60405163100960cb60e01b8152600a6004820152602490fdfe405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace2c1d6f414005d8da7ff649d73d27d5cf4615af062dc2fcc76ee936c32917bb14a164736f6c6343000811000a`,
  BytecodeLen: 6193,
  version: 9,
  views: {
    }
  };
export const _stateSourceMap = {
  2: {
    at: './src/reach/contracts/index.rsh:95:11:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './src/reach/contracts/index.rsh:53:35:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Admin": Admin,
  "Invoicer": Invoicer,
  "User_createInvoice": User_createInvoice,
  "User_getInvoiceNumber": User_getInvoiceNumber,
  "User_payInvoice": User_payInvoice
  };
export const _APIs = {
  User: {
    createInvoice: User_createInvoice,
    getInvoiceNumber: User_getInvoiceNumber,
    payInvoice: User_payInvoice
    }
  };
