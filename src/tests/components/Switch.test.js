import { render, screen, waitFor, within } from "@testing-library/react";
import Switch from "../../components/Switch";
import "@testing-library/jest-dom";
import { renderWithProviders } from "./test-utils";

import App from "../../components/App";
import userEvent from "@testing-library/user-event";

test("has a checkbox for toggle / get snapshot", () => {
  const component = render(<Switch />);

  expect(screen.getByRole("checkbox")).toBeInTheDocument();

  expect(component).toMatchSnapshot();
});

test("toggle displays correct view", async () => {
  const user = userEvent.setup();
  const { store } = renderWithProviders(<App />, { authedUser: "mthornton" });

  await waitFor(
    () => expect(screen.getByText(/new polls/i)).toBeInTheDocument(),
    {
      timeout: 2000,
    }
  );

  //switch componenet displayed on root home page
  expect(screen.getByRole("checkbox")).toBeInTheDocument();

  //switch controlls the poll-container view
  //has only one poll container container all unanswered polls by defualt

  //all unanswered polls are present
  let dashboardList = screen.getAllByRole("list")[2];
  let polls = within(dashboardList).getAllByRole("listitem");
  const answeredPolls = Object.keys(
    store.getState().users[store.getState().authedUser].answers
  );
  const pollsCount = Object.keys(store.getState().polls).length;
  expect(polls.length).toBe(pollsCount - answeredPolls.length);

  await user.click(screen.getByRole("checkbox"));
  expect(screen.getByText(/answered polls/i)).toBeInTheDocument();
  expect(screen.queryByText(/new polls/i)).toBeNull();

  expect(screen.getByText("You have answered 0 polls")).toBeInTheDocument();

  await user.click(screen.getByRole("checkbox"));
  expect(screen.getByText(/new polls/i)).toBeInTheDocument();
  expect(polls.length).toBe(pollsCount - answeredPolls.length);
});
