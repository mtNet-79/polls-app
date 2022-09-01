import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../../Components/App";
import { renderWithProviders } from "./test-utils";
// import renderer from 'react-test-renderer';
// import '../mockJsdom'

test("after app component loads initial data user is directed to log in page", async () => {
  renderWithProviders(<App />);

  // screen.debug();
  await waitFor(
    () =>
      expect(
        screen.getByRole("link", { name: /sign in/i })
      ).toBeInTheDocument(),
    {
      timeout: 2000,
    }
  );

  // screen.debug(submit);
});

test("app snapshot", async () => {
  const component = renderWithProviders(<App />);

  expect(component).toMatchSnapshot();
});

//E2E tests
test("if user signed in, directed to dashboard, check nav routes", async () => {
  const user = userEvent.setup();
  const { container } = renderWithProviders(<App />, {
    authedUser: "mthornton",
  });

  await waitFor(
    () => expect(screen.getByText(/new polls/i)).toBeInTheDocument(),
    {
      timeout: 2000,
    }
  );

  expect(screen.getByText(/home/i)).toBeInTheDocument();

  // // verify page content for expected route after navigating
  await user.click(screen.getByText(/leaderboard/i));
  expect(screen.getByText(/users/i)).toBeInTheDocument();
  expect(screen.getByText(/answered/i)).toBeInTheDocument();
  expect(screen.getByText(/created/i)).toBeInTheDocument();

  await user.click(screen.getByRole("link", { name: /home/i }));
  expect(screen.getByText(/new polls/i)).toBeInTheDocument();

  const pollBtn = container.getElementsByClassName("btn");

  await user.click(pollBtn[0]);
  const answerButtons = screen.getAllByRole("button", { name: /click/i });
  expect(answerButtons.length).toBe(2);

  await user.click(screen.getByRole("link", { name: /log out/i }));
  expect(screen.getByText(/new polls/i)).toBeInTheDocument()
  await user.click(screen.getByRole("link", { name: /sign in/i }))
  const inputsLogInPage = screen.getAllByRole("textbox");
  expect(inputsLogInPage.length).toBe(2);
  expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
});

test("if user signs outs", async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />, {
    authedUser: "mthornton",
  });

  await waitFor(
    () => expect(screen.getByText(/new polls/i)).toBeInTheDocument(),
    {
      timeout: 2000,
    }
  );

  expect(screen.getByText(/home/i)).toBeInTheDocument();

  await user.click(screen.getByRole("link", { name: /log out/i }));
  await user.click(screen.getByRole("link", { name: /sign in/i }))
  const inputsLogInPage = screen.getAllByRole("textbox");
  expect(inputsLogInPage.length).toBe(2);
  expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();

  await user.click(screen.getByRole("link", { name: /add new user/i }));
  const inputsAddNewPage = screen.getAllByRole("textbox");

  expect(inputsAddNewPage.length).toBe(3);

  // expect(screen.getByRole("button", { name: /log in/i })).not.toBeInTheDocument()
});

test("log in, answer poll, view leaderboard, view answered polls, create poll, sign out", async () => {
  const user = userEvent.setup();
  const { store } = renderWithProviders(<App />);

  // screen.debug();
  await waitFor(
    () =>
      expect(
        screen.getByRole("link", { name: /sign in/i })
      ).toBeInTheDocument(),
    {
      timeout: 2500,
    }
  );

//has header
  const header = screen.getByRole("heading", { name: /new polls/i });
  expect(header).toBeInTheDocument();
//has nav bar
//click nav bar
  await user.click(screen.getByRole("link", { name: /sign in/i }));
//credentials
  await user.type(screen.getByLabelText(/user/i), "mthornton");
  const userInput = screen.getByRole("textbox", { name: /user/i });
  expect(userInput.value).toBe("mthornton");

  await user.type(screen.getByLabelText(/password/i), "elephants");
//log in
  user.click(screen.getByRole("button", { name: /log in/i }));
  await waitForElementToBeRemoved(() =>
    screen.getByRole("button", { name: /log in/i })
  );

  //has dashboard
  expect(
    screen.getByRole("heading", { name: /new polls/i })
  ).toBeInTheDocument();

  // //has naviagation
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
  const userId = store.getState().authedUser;
  const authedUser = screen.getByText(userId);
  expect(authedUser).toBeInTheDocument();

  const logoutLink = screen.getByRole("link", { name: /log out/i });
  expect(logoutLink).toBeInTheDocument();

  // //all unanswered polls are present
  const dashboardList = screen.getAllByRole("list")[2];
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

  // screen.logTestingPlaygroundURL()

  //answer poll
  await user.click(buttons[0]);
  await user.click(screen.getByRole('link', {name: /leaderboard/i}))
 //back at leaderboard
//header rows
const headerRow = screen.getByRole("rowheader");
expect(headerRow).toBeInTheDocument();
expect(within(headerRow).getByText(/users/i)).toBeInTheDocument();
expect(within(headerRow).getByText(/answered/i)).toBeInTheDocument();
expect(within(headerRow).getByText(/created/i)).toBeInTheDocument();

//click home at nav bar
await user.click(screen.getByRole("link", { name: /home/i }))

  //has dashboard
  expect(
    screen.getByRole("heading", { name: /new polls/i })
  ).toBeInTheDocument();

  //click toggle and view answered polls
  await user.click(screen.getByRole("checkbox"));
  expect(screen.getByText(/answered polls/i)).toBeInTheDocument();
  expect(screen.queryByText(/new polls/i)).toBeNull();

  expect(screen.getByText("You have answered 0 polls")).toBeInTheDocument();
    //back to new polls
  await user.click(screen.getByRole("checkbox"));
  expect(screen.getByText(/new polls/i)).toBeInTheDocument();

  //TODO: create poll
  //click create poll at nav bar
  await user.click(screen.getByRole("link", { name: /post/i }))


  expect(screen.getByRole('heading', {name: /would you rather/i})).toBeInTheDocument();
  expect(screen.getByRole('heading', {name: /create a poll/i})).toBeInTheDocument();
  expect(screen.getByLabelText(/first option/i)).toBeInTheDocument()
  expect(screen.getByRole('textbox', {name: /first option/i})).toBeInTheDocument()
  expect(screen.getByLabelText(/second option/i)).toBeInTheDocument()
  expect(screen.getByRole('textbox', {name: /second option/i})).toBeInTheDocument()

  const submitBtn = screen.getByRole("button", { name: /submit/i });
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();

  //enter user input to first textbox
  const first_question = screen.getByRole("textbox", { name: /first option/i });
  await userEvent.type(first_question, "quest");
  expect(first_question.value).toBe("quest");
  expect(first_question.value.length).toBe(5);
  //button is still disabled
  expect(submitBtn).toBeDisabled();

  //enter password text to field - 5 characters 
  const second_question = screen.getByRole("textbox", { name: /second option/i });
  await user.type(second_question, "quest");
  expect(second_question.value.length).toBe(5);
  //disabled
  expect(submitBtn).toBeDisabled();

  //boht questions must be greater than 5 chars to enabled submit button
  await user.type(second_question, "ion two");
  expect(submitBtn).toBeDisabled();
  await user.type(first_question, "ion two");
  //enabled
  expect(submitBtn).not.toBeDisabled();

  //send user back to dashabord on submit
  await user.click(submitBtn)
   //has dashboard
   expect(screen.getByText(/new polls/i)).toBeInTheDocument()


  //TODO: sign out
  await user.click(screen.getByRole('link', {name: /log out/i}))
  expect(
    await screen.findByRole("link", { name: /sign in/i })
  ).toBeInTheDocument()
  //reloads initial data ? 

});
