import { useEffect, useMemo, useState } from "react";
import "./App.css";
import TableWIthTransactions from "./components/TableWIthTransactions";
import { useLoading } from "./hooks";
import {
  fetchTransactionMockRecord,
  parseCreateDateToMonth,
  sortTransactions,
} from "./services/transaction.api";

const filterByMonth = (transactions, trans) => {
  return transactions.filter((item) => {
    return (
      parseCreateDateToMonth(item.createDate) ===
      parseCreateDateToMonth(trans.createDate)
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
  const { isLoading, startLoading, stopLoading } = useLoading();

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
        map.set(parseCreateDateToMonth(trans.createDate), tempMap);
      });
    });

    map.forEach((value, key) => {
      res.push({ key, value });
    });

    return res;
  }, [transactions]);

  useEffect(() => {
    startLoading();
    fetchTransactionMockRecord().then((data) => {
      setTransactions(sortTransactions(data));
      stopLoading();
    });
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <TableWIthTransactions transactions={parseTransactions} />
      )}
    </div>
  );
}

export default App;
