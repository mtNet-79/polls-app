import { screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../../Components/App";
import { renderWithProviders } from "./test-utils";

test('render to snapshot', async () => {

  const user = userEvent.setup();

  const { container } = renderWithProviders(<App />, {
    authedUser: "mthornton"
  });

  await waitFor(
    () =>
      expect(
        screen.getByRole("link", { name: /post/i })
      ).toBeInTheDocument(),
    {
      timeout: 2050,
    }
  );
  await user.click(screen.getByRole("link", { name: /post/i }));


  expect(screen.getByRole('heading', {name: /would you rather/i})).toBeInTheDocument();
  expect(screen.getByRole('heading', {name: /create a poll/i})).toBeInTheDocument();
  expect(screen.getByLabelText(/first option/i)).toBeInTheDocument()
  expect(screen.getByRole('textbox', {name: /first option/i})).toBeInTheDocument()
  expect(screen.getByLabelText(/second option/i)).toBeInTheDocument()
  expect(screen.getByRole('textbox', {name: /second option/i})).toBeInTheDocument()

  const submitBtn = screen.getByRole("button", { name: /submit/i });
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();

  expect(container).toMatchSnapshot()

})

test("poll form ", async () => {
  const user = userEvent.setup();

  renderWithProviders(<App />, {
    authedUser: "mthornton"
  });

  await waitFor(
    () =>
      expect(
        screen.getByRole("link", { name: /post/i })
      ).toBeInTheDocument(),
    {
      timeout: 2050,
    }
  );
  await user.click(screen.getByRole("link", { name: /post/i }));

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

});

// test('submitting question returns user to dashboard', async () => {
//   const user = userEvent.setup();

//   const { store } = renderWithProviders(<App />, {
//     authedUser: "mthornton"
//   });

//   await waitFor(
//     () =>
//       expect(
//         screen.getByRole("link", { name: /post/i })
//       ).toBeInTheDocument(),
//     {
//       timeout: 2050,
//     }
//   );

//   await user.click(screen.getByRole("link", { name: /post/i }));

//   expect(screen.getByRole('heading', {name: /would you rather/i})).toBeInTheDocument();
//   expect(screen.getByRole('heading', {name: /create a poll/i})).toBeInTheDocument();
//   //enter user input to first textbox
//   const first_question = screen.getByRole("textbox", { name: /first option/i });
//   await userEvent.type(first_question, "question one");

//   const second_question = screen.getByRole("textbox", { name: /second option/i });
//   await userEvent.type(second_question, "question two");

//   const submitBtn = screen.getByRole("button", { name: /submit/i });

//   await user.click(submitBtn)
//    //has dashboard
//    const dashboard = screen.getByRole("dashboard");
//    expect(dashboard).toBeInTheDocument()

// })
