import { screen, waitFor, within } from "@testing-library/react";

import App from "../../Components/App";

import { renderWithProviders } from "./test-utils";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

//unit tests
test("all elements are rendered", async () => {
  const { store, container } = renderWithProviders(<App />, {
    route: "/",
    authedUser: "mthornton",
  });

  await waitFor(
    () => expect(screen.getByText(/new polls/i)).toBeInTheDocument(),
    {
      timeout: 2000,
    }
  );

  //has naviagation
  //has all nav links present
  const homeLink = screen.getByRole("link", { name: /home/i });
  expect(homeLink).toBeInTheDocument();

  const leaderboardLink = screen.getByRole("link", { name: /leaderboard/i });
  expect(leaderboardLink).toBeInTheDocument();

  const newPollLink = screen.getByRole("link", { name: /post/i });
  expect(newPollLink).toBeInTheDocument();

  const avatar = screen.getByRole("img", { name: /icon/i });
  expect(avatar).toBeInTheDocument();

  //user is signed in
  const user = store.getState().authedUser;
  const authedUser = screen.getByText(user);
  expect(authedUser).toBeInTheDocument();

  const logoutLink = screen.getByRole("link", { name: /log out/i });
  expect(logoutLink).toBeInTheDocument();

  //from toggle switch sub component
  expect(screen.getByRole("checkbox")).toBeInTheDocument();

  const heading = screen.getByRole("heading", { name: /new polls/i });
  expect(heading).toBeInTheDocument();
  
  const pollsList = screen.getAllByRole("list")[2];
  expect(pollsList).toBeInTheDocument();

  //all unanswered polls are present
  const polls = within(pollsList).getAllByRole("listitem");
  const answeredPolls = Object.keys(store.getState().users[user].answers);
  const pollsCount = Object.keys(store.getState().polls).length;
  expect(polls.length).toBe(pollsCount - answeredPolls.length);

  expect(container).toMatchSnapshot();
});

//integration tests

test("should redirect user to log in page if not signed in", async () => {
  renderWithProviders(<App />, { route: "/" });

  await waitFor(() => expect(screen.getByText(/sign in/i)).toBeInTheDocument(), {
    timeout: 2000,
  });
});
