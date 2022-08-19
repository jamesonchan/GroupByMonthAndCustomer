import { useEffect, useMemo, useState } from "react";
import "./App.css";
import TableWIthTransactions from "./components/TableWIthTransactions";
import { fetchTransactionMockRecord } from "./services/transaction.api";

const filterByMonth = (transactions, trans) => {
  return transactions.filter((item) => {
    return (
      new Date(item.createDate).getMonth() ===
      new Date(trans.createDate).getMonth()
    );
  });
};

const filterByCustomerId = (filterByMonthArr, trans) => {
  return filterByMonthArr.filter((item) => {
    return item.customerId === trans.customerId;
  });
};

function App() {
  const [transactions, setTransactions] = useState([]);

  // map strcuture : {july : {customerId :[{}]...}, June : {customerId : [{}]... }}
  const parseTransactions = useMemo(() => {
    const map = new Map();
    const res = [];
    // get months on outer map
    transactions.forEach((trans) => {
      const tempMap = new Map();
      const filterByMonthArr = filterByMonth(transactions, trans);

      // get customerId on inner map
      filterByMonthArr.forEach((trans) => {
        const filterByCustomerIdArr = filterByCustomerId(
          filterByMonthArr,
          trans
        );
        // set inner map categorized by customerId
        tempMap.set(trans.customerId, filterByCustomerIdArr);
        // set outer map categorized by month
        map.set(
          new Date(trans.createDate).toLocaleString("en-US", {
            month: "long",
          }),
          tempMap
        );
      });
    });

    map.forEach((value, key) => {
      res.push({ key, value });
    });

    return res;
  }, [transactions]);

  useEffect(() => {
    fetchTransactionMockRecord().then((data) => {
      setTransactions(data);
    });
  }, []);

  return (
    <div className="App">
      <TableWIthTransactions transactions={parseTransactions} />
    </div>
  );
}

export default App;
