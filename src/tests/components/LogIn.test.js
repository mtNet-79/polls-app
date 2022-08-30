import {
  waitForElementToBeRemoved,
  screen,
  waitFor,
} from "@testing-library/react";
import LogIn from "../../Components/LogIn";
import App from "../../Components/App";
import { renderWithProviders } from "./test-utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

// beforeEach(() => {
//     initializeCityDatabase();
//   });
  
//   afterEach(() => {
//     clearCityDatabase();
//   });

beforeEach(() => {
  delete window.location;
  // @ts-ignore
  window.location = new URL('http://localhost/');
});

//unit tests
test("all elements are rendered/ snapshot", () => {
  const {container} = renderWithProviders(<LogIn />);

  //the avatar holder is on the page
  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();

  // user input field present
  const userInpuEl = screen.getByPlaceholderText(/user name/i);
  expect(userInpuEl).toBeInTheDocument();

  //password present
  const passwaordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwaordInputEl).toBeInTheDocument();

  //submit button present
  const submitBtn = screen.getByRole("button", { name: /log in/i });
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();

  // input count
  const inputsLogInPAge = screen.getAllByRole("textbox");
  expect(inputsLogInPAge.length).toBe(2);

  //add user link is present
  const addNewUserBtn = screen.getByRole("link", { name: /add new user/i });
  expect(addNewUserBtn).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test("log in button", async () => {

  const user = userEvent.setup();
  renderWithProviders(<LogIn />);

//  console.log("store at login 62: ", store)

  //in doc but disabled
  const submitBtn = screen.getByRole("button", { name: /log in/i });
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();

  //enter text in user name input field
  const userInput = screen.getByRole("textbox", { name: /user/i });
  await userEvent.type(userInput, "mthornton");
  expect(userInput.value).toBe("mthornton");

  //button is still disabled
  expect(submitBtn).toBeDisabled();

  //enter password text to field - 5 characters 
  const passwordInput = screen.getByRole("textbox", { name: /password/i });
  await user.type(passwordInput, "pass1");
  expect(passwordInput.value.length).toBe(5);
  //disabled
  expect(submitBtn).toBeDisabled();

  //required 7 characters for password
  await user.type(passwordInput, "2");
  expect(passwordInput.value.length).toBe(6);

  //enabled
  expect(submitBtn).not.toBeDisabled();

});
//integration tests
test(`log in takes user to dashboard`, async () => {
  const user = userEvent.setup();

  const { container } = renderWithProviders(<App />, { route: "/login" });

  // screen.debug(console.log("store at login 98: ", store.getState()))

  await waitFor(
    () =>
      expect(
        screen.getByRole("button", { name: /log in/i })
      ).toBeInTheDocument(),
    {
      timeout: 2500,
    }
  );

  // screen.debug(console.log("store at login 110: ", store.getState()))

  await user.type(screen.getByLabelText(/user/i), "mthornton");
  const userInput = screen.getByRole("textbox", { name: /user/i });
  expect(userInput.value).toBe("mthornton");

  await user.type(screen.getByLabelText(/password/i), "elephants");

  user.click(screen.getByRole("button", { name: /log in/i }));
  await waitForElementToBeRemoved(() =>
    screen.getByRole("button", { name: /log in/i })
  );

  expect(screen.getByRole('heading', {name: /new polls/i})).toBeInTheDocument();
  //has naviagation
  const navigation = container.getElementsByClassName("nav");
  expect(navigation.length).toBe(1);
});
