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
        {transactions.map((trans) => {
          return (
            <tr key={Math.random()}>
              {parseTransactionKey().map((item) => {
                const displayItem = trans[item];
                if (displayItem.toString().startsWith("165")) {
                  return (
                    <td key={item}>{parseCreateDateToMonth(displayItem)}</td>
                  );
                }
                return <td key={item}>{displayItem}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableLayout;
