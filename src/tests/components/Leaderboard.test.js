import { screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../../Components/App";
import { renderWithProviders } from "./test-utils";

test("should render leader table with all participant rankings/ with snapshot", async () => {
  const user = userEvent.setup();

  const { store, container } = renderWithProviders(<App />, {
    authedUser: "mthornton"
  });

  await waitFor(
    () =>
      expect(
        screen.getByRole("link", { name: /leaderboard/i })
      ).toBeInTheDocument(),
    {
      timeout: 2050,
    }
  );
  await user.click(screen.getByRole("link", { name: /leaderboard/i }));
 
  const table = screen.getByRole("table", {
    name: /leaderboard/i,
  });
  //header rows
  const headerRow = screen.getByRole("rowheader");
  expect(headerRow).toBeInTheDocument();
  expect(within(headerRow).getByText(/users/i)).toBeInTheDocument();
  expect(within(headerRow).getByText(/answered/i)).toBeInTheDocument();
  expect(within(headerRow).getByText(/created/i)).toBeInTheDocument();

  //participant rows
  const participants = Object.keys(store.getState().users).filter(
    (key) =>
      Object.keys(store.getState().users[key].answers).length !== 0 ||
      store.getState().users[key].polls.length !== 0
  );

  //participant rows
  const rows = within(table).getAllByRole("row");
  expect(rows.length).toBe(participants.length);

  expect(
    screen.getAllByRole("img", { name: /avatar of /i }).length
  ).toBe(2);

  //participants names are in the text
  expect(screen.getByText(participants[0])).toBeInTheDocument();

  //number of answer per participant is list in document
  expect(screen.getByText(Object.keys(store.getState().users[participants[0]].answers).length)).toBeInTheDocument()
  //number of polls posted by user is in document
  expect(screen.getByText(store.getState().users[participants[3]].polls.length)).toBeInTheDocument()

  expect(container).toMatchSnapshot();
});
