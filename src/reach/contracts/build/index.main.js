// Automatically generated with Reach 0.1.10 (84dc282c)
/* eslint-disable */
export const _version = '0.1.10';
export const _versionHash = '0.1.10 (84dc282c)';
export const _backendVersion = 15;

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
  const ctc1 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '951'));
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
  
  
  const v256 = 'Contract initialized!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ';
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
          amt: v273,
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
  const v263 = 'Contract deployed!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ';
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
  
  while (await (async () => {
    
    return true;})()) {
    const txn2 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 2,
      out_tys: [ctc8],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v331], secs: v333, time: v332, didSend: v191, from: v330 } = txn2;
    switch (v331[0]) {
      case 'User_createInvoice0_46': {
        const v334 = v331[1];
        undefined /* setApiDetails */;
        ;
        await txn2.getOutput('User_createInvoice', 'v269', ctc6, v269);
        const v356 = stdlib.add(v269, stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:89:27:decimal', stdlib.UInt_max, '1'));
        const cv269 = v356;
        const cv270 = v332;
        const cv273 = v273;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
        continue;
        break;
        }
      case 'User_getInvoiceNumber0_46': {
        const v383 = v331[1];
        undefined /* setApiDetails */;
        ;
        await txn2.getOutput('User_getInvoiceNumber', 'v269', ctc6, v269);
        const cv269 = v269;
        const cv270 = v332;
        const cv273 = v273;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
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
        await txn2.getOutput('User_payInvoice', 'v269', ctc6, v269);
        const cv269 = v269;
        const cv270 = v332;
        const cv273 = v470;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
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
  const ctc1 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '951'));
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
  const v267 = 'Invoicer connected!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ';
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
  
  while (await (async () => {
    
    return true;})()) {
    const txn2 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 2,
      out_tys: [ctc8],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v331], secs: v333, time: v332, didSend: v191, from: v330 } = txn2;
    switch (v331[0]) {
      case 'User_createInvoice0_46': {
        const v334 = v331[1];
        undefined /* setApiDetails */;
        ;
        await txn2.getOutput('User_createInvoice', 'v269', ctc6, v269);
        const v356 = stdlib.add(v269, stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:89:27:decimal', stdlib.UInt_max, '1'));
        const cv269 = v356;
        const cv270 = v332;
        const cv273 = v273;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
        continue;
        break;
        }
      case 'User_getInvoiceNumber0_46': {
        const v383 = v331[1];
        undefined /* setApiDetails */;
        ;
        await txn2.getOutput('User_getInvoiceNumber', 'v269', ctc6, v269);
        const cv269 = v269;
        const cv270 = v332;
        const cv273 = v273;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
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
        await txn2.getOutput('User_payInvoice', 'v269', ctc6, v269);
        const cv269 = v269;
        const cv270 = v332;
        const cv273 = v470;
        
        v269 = cv269;
        v270 = cv270;
        v273 = cv273;
        
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
  const ctc2 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '951'));
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
          
          const v356 = stdlib.add(v269, stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:89:27:decimal', stdlib.UInt_max, '1'));
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
      
      const v356 = stdlib.add(v269, stdlib.checkedBigNumberify('./src/reach/contracts/index.rsh:89:27:decimal', stdlib.UInt_max, '1'));
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
  const ctc3 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '951'));
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
  const ctc2 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '951'));
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
            amt: v441,
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
  stdlib.assert(step == 3, 'API called in the wrong state. Currently in state: ' + step + ', expected:  [3]');
  if (step == 3) {return _User_createInvoice3(ctcTop, interact);}
  };
export async function User_getInvoiceNumber(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for User_getInvoiceNumber expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for User_getInvoiceNumber expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  stdlib.assert(step == 3, 'API called in the wrong state. Currently in state: ' + step + ', expected:  [3]');
  if (step == 3) {return _User_getInvoiceNumber3(ctcTop, interact);}
  };
export async function User_payInvoice(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for User_payInvoice expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for User_payInvoice expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  stdlib.assert(step == 3, 'API called in the wrong state. Currently in state: ' + step + ', expected:  [3]');
  if (step == 3) {return _User_payInvoice3(ctcTop, interact);}
  };
const _ALGO = {
  ABI: {
    impure: [`User_createInvoice((byte[951]))uint64`, `User_getInvoiceNumber()uint64`, `User_payInvoice(address,uint64,(byte[951]))uint64`],
    pure: [],
    sigs: [`User_createInvoice((byte[951]))uint64`, `User_getInvoiceNumber()uint64`, `User_payInvoice(address,uint64,(byte[951]))uint64`]
    },
  appApproval: `BiAJAAEC9+LS5wms1bGKCt8HKAMgJgMAAQAIAAAAAAAAAQ0iNQAxGEEB3ChkSSJbNQGBCFs1AjYaABdJQQBYIjUEIzUGSSUMQAAuSSEEDEAAFCEEEkQoNf+AAQE0/1AhBa9QQgBHJRJENhoBNf8pNP9QIQavUEIANIGT2uOGBxJENhoBNhoCUDYaA1A1/4ABAjT/UEIAFjYaAhc1BDYaAzYaARdJJAxAAL8kEkQhBzQBEkQ0BEkiEkw0AhIRRClkSTUDSUlXACA1/yEIWzX+IQZbNf1JNQU1/IAE5yOTUjT8ULA0/CJVSSMMQABjSSQMQABGJBJENPwjIQVYNfs0+yEIWzX6NPqIAQaxIrIBNPqyCCOyEDT7VwAgsgezKjT+FlCwNP4WNQc0/zT+MgY0/TT6CDT6CUIAWkgqNP4WULA0/hY1BzT/NP4yBjT9QgBDSCo0/hZQsDT+FjUHNP80/iMIMgY0/UIAKiISRCI0ARJENARJIhJMNAISEUSABF8Nq/qwgaCNBogAhjEAIzIGIkIAADX/Nf41/Uk1/DT9FlA0/xZQKUsBVwAwZ0ghBzUBMgY1AkIAHDEZgQUSRLEisgEisggjshAyCbIJMgqyB7NCAAUxGSISRCg0ARY0AhZQZzQGQQAKgAQVH3x1NAdQsDQASSMIMgQSRDEWEkQjQzEZIhJEQv/fIjUBIjUCQv/DNABJSiMINQA4BzIKEkQ4ECMSRDgIEkSJ`,
  appClear: `Bg==`,
  companionInfo: null,
  extraPages: 0,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 1,
  stateSize: 48,
  unsupported: [],
  version: 10,
  warnings: []
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T4",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T4",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "enum _enum_T11",
                    "name": "which",
                    "type": "uint8"
                  },
                  {
                    "components": [
                      {
                        "components": [
                          {
                            "components": [
                              {
                                "internalType": "bytes32",
                                "name": "elem0",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem1",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem2",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem3",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem4",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem5",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem6",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem7",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem8",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem9",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem10",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem11",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem12",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem13",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem14",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem15",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem16",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem17",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem18",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem19",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem20",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem21",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem22",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem23",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem24",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem25",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem26",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem27",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem28",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes23",
                                "name": "elem29",
                                "type": "bytes23"
                              }
                            ],
                            "internalType": "struct T6",
                            "name": "invoiceJson",
                            "type": "tuple"
                          }
                        ],
                        "internalType": "struct T7",
                        "name": "elem0",
                        "type": "tuple"
                      }
                    ],
                    "internalType": "struct T8",
                    "name": "_User_createInvoice0_46",
                    "type": "tuple"
                  },
                  {
                    "internalType": "bool",
                    "name": "_User_getInvoiceNumber0_46",
                    "type": "bool"
                  },
                  {
                    "components": [
                      {
                        "internalType": "address payable",
                        "name": "elem0",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "elem1",
                        "type": "uint256"
                      },
                      {
                        "components": [
                          {
                            "components": [
                              {
                                "internalType": "bytes32",
                                "name": "elem0",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem1",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem2",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem3",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem4",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem5",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem6",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem7",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem8",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem9",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem10",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem11",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem12",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem13",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem14",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem15",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem16",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem17",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem18",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem19",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem20",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem21",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem22",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem23",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem24",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem25",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem26",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem27",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem28",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes23",
                                "name": "elem29",
                                "type": "bytes23"
                              }
                            ],
                            "internalType": "struct T6",
                            "name": "invoiceJson",
                            "type": "tuple"
                          }
                        ],
                        "internalType": "struct T7",
                        "name": "elem2",
                        "type": "tuple"
                      }
                    ],
                    "internalType": "struct T10",
                    "name": "_User_payInvoice0_46",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct T11",
                "name": "v331",
                "type": "tuple"
              }
            ],
            "internalType": "struct T12",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T13",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e2",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "v0",
        "type": "uint256"
      }
    ],
    "name": "_reach_oe_v269",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "elem0",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem1",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem2",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem3",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem4",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem5",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem6",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem7",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem8",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem9",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem10",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem11",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem12",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem13",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem14",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem15",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem16",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem17",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem18",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem19",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem20",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem21",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem22",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem23",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem24",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem25",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem26",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem27",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem28",
                "type": "bytes32"
              },
              {
                "internalType": "bytes23",
                "name": "elem29",
                "type": "bytes23"
              }
            ],
            "internalType": "struct T6",
            "name": "invoiceJson",
            "type": "tuple"
          }
        ],
        "internalType": "struct T7",
        "name": "_a0",
        "type": "tuple"
      }
    ],
    "name": "User_createInvoice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "User_getInvoiceNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_a0",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_a1",
        "type": "uint256"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "elem0",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem1",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem2",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem3",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem4",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem5",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem6",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem7",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem8",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem9",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem10",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem11",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem12",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem13",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem14",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem15",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem16",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem17",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem18",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem19",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem20",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem21",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem22",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem23",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem24",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem25",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem26",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem27",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem28",
                "type": "bytes32"
              },
              {
                "internalType": "bytes23",
                "name": "elem29",
                "type": "bytes23"
              }
            ],
            "internalType": "struct T6",
            "name": "invoiceJson",
            "type": "tuple"
          }
        ],
        "internalType": "struct T7",
        "name": "_a2",
        "type": "tuple"
      }
    ],
    "name": "User_payInvoice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "enum _enum_T11",
                    "name": "which",
                    "type": "uint8"
                  },
                  {
                    "components": [
                      {
                        "components": [
                          {
                            "components": [
                              {
                                "internalType": "bytes32",
                                "name": "elem0",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem1",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem2",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem3",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem4",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem5",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem6",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem7",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem8",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem9",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem10",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem11",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem12",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem13",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem14",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem15",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem16",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem17",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem18",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem19",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem20",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem21",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem22",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem23",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem24",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem25",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem26",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem27",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem28",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes23",
                                "name": "elem29",
                                "type": "bytes23"
                              }
                            ],
                            "internalType": "struct T6",
                            "name": "invoiceJson",
                            "type": "tuple"
                          }
                        ],
                        "internalType": "struct T7",
                        "name": "elem0",
                        "type": "tuple"
                      }
                    ],
                    "internalType": "struct T8",
                    "name": "_User_createInvoice0_46",
                    "type": "tuple"
                  },
                  {
                    "internalType": "bool",
                    "name": "_User_getInvoiceNumber0_46",
                    "type": "bool"
                  },
                  {
                    "components": [
                      {
                        "internalType": "address payable",
                        "name": "elem0",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "elem1",
                        "type": "uint256"
                      },
                      {
                        "components": [
                          {
                            "components": [
                              {
                                "internalType": "bytes32",
                                "name": "elem0",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem1",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem2",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem3",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem4",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem5",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem6",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem7",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem8",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem9",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem10",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem11",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem12",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem13",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem14",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem15",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem16",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem17",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem18",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem19",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem20",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem21",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem22",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem23",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem24",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem25",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem26",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem27",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes32",
                                "name": "elem28",
                                "type": "bytes32"
                              },
                              {
                                "internalType": "bytes23",
                                "name": "elem29",
                                "type": "bytes23"
                              }
                            ],
                            "internalType": "struct T6",
                            "name": "invoiceJson",
                            "type": "tuple"
                          }
                        ],
                        "internalType": "struct T7",
                        "name": "elem2",
                        "type": "tuple"
                      }
                    ],
                    "internalType": "struct T10",
                    "name": "_User_payInvoice0_46",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct T11",
                "name": "v331",
                "type": "tuple"
              }
            ],
            "internalType": "struct T12",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T13",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m2",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x60806040526040516200151338038062001513833981016040819052620000269162000265565b600080554360035560408051338152825160208083019190915283015115158183015290517faf3102e4a96b239a2811210526ca19adcde1af3e2876a2c9a5886a5a887a2dcb9181900360600190a16200008334156007620000ef565b620000ba60408051606080820183526000828401818152835283519182018452808252602082810182905293820152909182015290565b80513390526020808201805160019052805143920191909152516000604090910152620000e78162000119565b50506200030d565b81620001155760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b62000147604051806060016040528060006001600160a01b0316815260200160008152602001600081525090565b8151516001600160a01b0316808252602080840180515182850190815290516040908101518186019081526003600055436001558151938401949094529051908201529051606082015260800160405160208183030381529060405260029080519060200190620001ba929190620001bf565b505050565b828054620001cd90620002d0565b90600052602060002090601f016020900481019282620001f157600085556200023c565b82601f106200020c57805160ff19168380011785556200023c565b828001600101855582156200023c579182015b828111156200023c5782518255916020019190600101906200021f565b506200024a9291506200024e565b5090565b5b808211156200024a57600081556001016200024f565b6000604082840312156200027857600080fd5b604080519081016001600160401b0381118282101715620002a957634e487b7160e01b600052604160045260246000fd5b6040528251815260208301518015158114620002c457600080fd5b60208201529392505050565b600181811c90821680620002e557607f821691505b602082108114156200030757634e487b7160e01b600052602260045260246000fd5b50919050565b6111f6806200031d6000396000f3fe60806040526004361061006e5760003560e01c8063ab53f2c61161004b578063ab53f2c6146100c3578063bfef1039146100e6578063c603f4db146100ee578063dd814e991461010157005b80631e93b0f1146100775780637b5381fb1461009b57806383230757146100ae57005b3661007557005b005b34801561008357600080fd5b506003545b6040519081526020015b60405180910390f35b6100756100a9366004610a41565b610114565b3480156100ba57600080fd5b50600154610088565b3480156100cf57600080fd5b506100d8610154565b604051610092929190610a5a565b6100886101f1565b6100886100fc366004610d11565b61025d565b61008861010f366004610d4d565b6102cd565b61013860405180606001604052806000815260200160008152602001600081525090565b61015061014a36849003840184610e07565b82610359565b5050565b60006060600054600280805461016990610ece565b80601f016020809104026020016040519081016040528092919081815260200182805461019590610ece565b80156101e25780601f106101b7576101008083540402835291602001916101e2565b820191906000526020600020905b8154815290600101906020018083116101c557829003601f168201915b50505050509050915091509091565b600061021760405180606001604052806000815260200160008152602001600081525090565b61021f6107d6565b6102276107f5565b6000604082015260018181905250604080516020808201909252828152908301526102528284610359565b505060200151919050565b600061028360405180606001604052806000815260200160008152602001600081525090565b61028b6107d6565b6102936107f5565b6040805160208082018352878252838101919091526000835281518082019092528282528301526102c48284610359565b50505192915050565b60006102f360405180606001604052806000815260200160008152602001600081525090565b6102fb6107d6565b6103036107f5565b60408051606080820183526001600160a01b038a16825260208083018a90528284018990529084019190915260028352815180820190925282825283015261034b8284610359565b505060400151949350505050565b610369600360005414600b61070e565b815161038490158061037d57508251600154145b600c61070e565b60008080556002805461039690610ece565b80601f01602080910402602001604051908101604052809291908181526020018280546103c290610ece565b801561040f5780601f106103e45761010080835404028352916020019161040f565b820191906000526020600020905b8154815290600101906020018083116103f257829003601f168201915b50505050508060200190518101906104279190610f19565b9050610431610824565b7f4f31aca22e36f59fd528f869622775b497700083223f718963ddd9aee483d4fe33856040516104629291906110da565b60405180910390a1600060208501515151600281111561048457610484610f03565b141561052e576104963415600861070e565b7f2c1d6f414005d8da7ff649d73d27d5cf4615af062dc2fcc76ee936c32917bb1482602001516040516104cb91815260200190565b60405180910390a1602082015183526104e2610837565b825181516001600160a01b039091169052602083015161050490600190611191565b60208083018051929092528151439101526040808501519151015261052881610733565b50610708565b600160208501515151600281111561054857610548610f03565b14156105e55761055a3415600961070e565b7f2c1d6f414005d8da7ff649d73d27d5cf4615af062dc2fcc76ee936c32917bb14826020015160405161058f91815260200190565b60405180910390a1602080830151908401526105a9610837565b825181516001600160a01b0390911690526020808401518183018051919091528051439201919091526040808501519151015261052881610733565b60026020850151515160028111156105ff576105ff610f03565b14156107085760208085015151606001518083520151610622903414600a61070e565b805180516020909101516040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610662573d6000803e3d6000fd5b507f2c1d6f414005d8da7ff649d73d27d5cf4615af062dc2fcc76ee936c32917bb14826020015160405161069891815260200190565b60405180910390a1602082015160408401526106b2610837565b825181516001600160a01b0390911690526020808401518183018051919091525143908201528251015160408401516106ec908290611191565b6106f691906111a9565b60208201516040015261052881610733565b50505050565b816101505760405163100960cb60e01b81526004810182905260240160405180910390fd5b610760604051806060016040528060006001600160a01b0316815260200160008152602001600081525090565b8151516001600160a01b03168082526020808401805151828501908152905160409081015181860190815260036000554360015581519384019490945290519082015290516060820152608001604051602081830303815290604052600290805190602001906107d192919061086a565b505050565b6040518060400160405280600081526020016107f06108ee565b905290565b60408051608081019091528060008152602001610810610901565b8152600060208201526040016107f0610914565b60405180602001604052806107f0610914565b60408051606080820183526000828401818152835283519182018452808252602082810182905293820152909182015290565b82805461087690610ece565b90600052602060002090601f01602090048101928261089857600085556108de565b82601f106108b157805160ff19168380011785556108de565b828001600101855582156108de579182015b828111156108de5782518255916020019190600101906108c3565b506108ea929150610933565b5090565b60405180602001604052806107f06107f5565b60405180602001604052806107f0610948565b60408051606081018252600080825260208201529081016107f0610948565b5b808211156108ea5760008155600101610934565b604080516103e081018252600060208201818152928201819052606082018190526080820181905260a0820181905260c0820181905260e08201819052610100820181905261012082018190526101408201819052610160820181905261018082018190526101a082018190526101c082018190526101e08201819052610200820181905261022082018190526102408201819052610260820181905261028082018190526102a082018190526102c082018190526102e08201819052610300820181905261032082018190526103408201819052610360820181905261038082018190526103a082018190526103c082015290815290565b60006108208284031215610a5457600080fd5b50919050565b82815260006020604081840152835180604085015260005b81811015610a8e57858101830151858201606001528201610a72565b81811115610aa0576000606083870101525b50601f01601f191692909201606001949350505050565b6040516020810167ffffffffffffffff81118282101715610ae857634e487b7160e01b600052604160045260246000fd5b60405290565b6040516103c0810167ffffffffffffffff81118282101715610ae857634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715610ae857634e487b7160e01b600052604160045260246000fd5b6040516080810167ffffffffffffffff81118282101715610ae857634e487b7160e01b600052604160045260246000fd5b803568ffffffffffffffffff1981168114610b9c57600080fd5b919050565b60006103c08284031215610bb457600080fd5b610bbc610ab7565b9050610bc6610aee565b823581526020808401359082015260408084013590820152606080840135908201526080808401359082015260a0808401359082015260c0808401359082015260e08084013590820152610100808401359082015261012080840135908201526101408084013590820152610160808401359082015261018080840135908201526101a080840135908201526101c080840135908201526101e08084013590820152610200808401359082015261022080840135908201526102408084013590820152610260808401359082015261028080840135908201526102a080840135908201526102c080840135908201526102e08084013590820152610300808401359082015261032080840135908201526103408084013590820152610360808401359082015261038080840135908201526103a0610d05818501610b82565b90820152815292915050565b60006103c08284031215610d2457600080fd5b610d2e8383610ba1565b9392505050565b6001600160a01b0381168114610d4a57600080fd5b50565b60008060006104008486031215610d6357600080fd5b8335610d6e81610d35565b925060208401359150610d848560408601610ba1565b90509250925092565b60006104008284031215610da057600080fd5b6040516060810181811067ffffffffffffffff82111715610dd157634e487b7160e01b600052604160045260246000fd5b6040529050808235610de281610d35565b815260208381013590820152610dfb8460408501610ba1565b60408201525092915050565b6000818303610820811215610e1b57600080fd5b610e23610b20565b83358152610800601f1983011215610e3a57600080fd5b610e42610ab7565b610e4a610b51565b602086013560038110610e5c57600080fd5b81526103c0603f1985011215610e7157600080fd5b610e79610ab7565b9350610e888760408801610ba1565b845283602082015261040086013593508315158414610ea657600080fd5b836040820152610eba876104208801610d8d565b606082015281526020820152949350505050565b600181811c90821680610ee257607f821691505b60208210811415610a5457634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b600060608284031215610f2b57600080fd5b6040516060810181811067ffffffffffffffff82111715610f5c57634e487b7160e01b600052604160045260246000fd5b6040528251610f6a81610d35565b8152602083810151908201526040928301519281019290925250919050565b8051805183526020808201519084015260408082015190840152606080820151908401526080808201519084015260a0808201519084015260c0808201519084015260e08082015190840152610100808201519084015261012080820151908401526101408082015190840152610160808201519084015261018080820151908401526101a080820151908401526101c080820151908401526101e08082015190840152610200808201519084015261022080820151908401526102408082015190840152610260808201519084015261028080820151908401526102a080820151908401526102c080820151908401526102e08082015190840152610300808201519084015261032080820151908401526103408082015190840152610360808201519084015261038080820151908401526103a09081015168ffffffffffffffffff1981168285015290610708565b6001600160a01b038381168252825160208084019190915283015151805161084084019291906003811061111e57634e487b7160e01b600052602160045260246000fd5b806040860152506020810151611138606086018251610f89565b506040818101511515610420860152606090910151805190921661044085015260208201516104608501520151611173610480840182610f89565b509392505050565b634e487b7160e01b600052601160045260246000fd5b600082198211156111a4576111a461117b565b500190565b6000828210156111bb576111bb61117b565b50039056fea2646970667358221220f426d5f967c0974b68472ff7d6189e33c052210bf8d94916e5d49205d1873ff064736f6c634300080c0033`,
  BytecodeLen: 5395,
  Which: `oD`,
  version: 7,
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
