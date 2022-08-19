import { faker } from "@faker-js/faker";

const numberOfcustomers = 5;
const numberOfRecords = 50;

const customers = new Array(numberOfcustomers).fill(0).map((_) => {
  return faker.datatype.uuid();
});

export const transactionMockData = new Array(numberOfRecords)
  .fill(0)
  .map((_) => {
    return {
      transactionId: faker.datatype.uuid(),
      customerId:
        customers[
          faker.datatype.number({ min: 0, max: numberOfcustomers - 1 })
        ],
      productId: faker.datatype.uuid(),
      price: faker.datatype.number({ max: 200, min: 1, precision: 0.01 }),
      createDate: faker.date.between("2022-05-01", "2022-07-30").getTime(),
    };
  });

export const fetchTransactionMockRecord = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res(transactionMockData);
    }, 2000);
  });

export const parseTransactionKey = () => {
  return Object.keys(transactionMockData[0]);
};

export const parseCreateDateToMonth = (createDate) => {
  return new Date(createDate).toLocaleString("en-US", { month: "long" });
};

export const sortTransactions = (transactions) => {
  return transactions.sort((a, b) => {
    return (
      new Date(a.createDate).getMonth() - new Date(b.createDate).getMonth()
    );
  });
};
