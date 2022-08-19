import React from "react";
import {
  parseCreateDateToMonth,
  parseTransactionKey,
} from "../services/transaction.api";

const TableLayout = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          {parseTransactionKey().map((header) => {
            return <th key={header}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {transactions.map((item) => {
          const { transactionId, customerId, productId, price, createDate } =
            item;
          return (
            <tr key={transactionId}>
              <td>{transactionId}</td>
              <td>{customerId}</td>
              <td>{productId}</td>
              <td>{price}</td>
              <td>{parseCreateDateToMonth(createDate)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableLayout;
