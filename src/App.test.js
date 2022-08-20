import { render, screen } from "@testing-library/react";
import App from "./App";
import * as Api from "./services/transaction.api";

// jest.mock("./services/transaction.api");
const mockData = [{ customerId: 1, createDate: 165733232 }];
Api.fetchTransactionMockRecord = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(mockData);
    }, 1000);
  });
};

describe("App", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("response from mock api", () => {
    expect.assertions(1);
    return Api.fetchTransactionMockRecord().then((data) => {
      expect(data).toBe(mockData);
    });
  });
});
