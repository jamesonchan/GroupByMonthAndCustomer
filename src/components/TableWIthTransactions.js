import React from "react";
import TableLayout from "./TableLayout";

const getCustomerArrById = (itemValue) => {
  const res = [];
  itemValue.forEach((value, key) => {
    res.push({ key, value });
  });
  return res;
};

const mapCustomerIdArr = (customerIdArr) => {
  return customerIdArr.map((item) => {
    return (
      <div key={item.key}>
        <h2>Customer Id : {item.key}</h2>
        <TableLayout transactions={item.value} />
      </div>
    );
  });
};

const mapTransactions = (transactions) => {
  return transactions.map((item) => {
    const cutomerArr = getCustomerArrById(item.value);

    return (
      <div key={item.key}>
        <h1>{item.key}</h1>
        {mapCustomerIdArr(cutomerArr)}
      </div>
    );
  });
};

const TableWIthTransactions = ({ transactions }) => {
  return <>{mapTransactions(transactions)}</>;
};

export default TableWIthTransactions;
