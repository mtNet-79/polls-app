import { screen, waitFor, within } from "@testing-library/react";
// import PollContainer from "../../components/PollContainer";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import App from "../../Components/App";
import { renderWithProviders } from "./test-utils";
import userEvent from "@testing-library/user-event";

// import { formatDate } from "../../utils/helpers";

//unit tests
test("renders / take snapshot", async () => {
  const user = userEvent.setup();
  const {container} =  renderWithProviders(<App />, {
    route: "/",
    authedUser: "mthornton",
  });

  await waitFor(
    () => expect(screen.getByText(/new polls/i)).toBeInTheDocument(),
    {
      timeout: 2000,
    }
  );
  
  //all unanswered polls are present

  const dashboardList = screen.getAllByRole('list')[2]
  const pollBoxes = within(dashboardList).getAllByRole("listitem");

  expect(pollBoxes.length).toBeGreaterThan(0);

  const pollBox = pollBoxes[0];
  expect(
    within(pollBox).getByRole("button", { name: /show poll/i })
  ).toBeInTheDocument();

  await user.click(within(pollBox).getByRole("button", { name: /show poll/i }));


  expect(screen.getByRole('heading', { name: /poll by/i })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: /avatar of /i })).toBeInTheDocument()
  const buttons = screen.getAllByRole('button', { name: /click/i })
  expect(buttons.length).toBe(2);
  expect(container).toMatchSnapshot();

  //TODO:click canswer

  await user.click(buttons[0])
});
