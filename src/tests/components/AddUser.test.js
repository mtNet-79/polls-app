import App from "../../components/App";
import { renderWithProviders } from "./test-utils";
import { screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import AddUser from "../../components/AddUser";

test('paints form and has submit feature', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />)
    await waitFor(
        () =>
          expect(
            screen.getByRole("link", { name: /add new user/i })
          ).toBeInTheDocument(),
        {
          timeout: 2500,
        }
      );

      //add user link is present
  const addNewUserBtn = screen.getByRole("link", { name: /add new user/i });
  expect(addNewUserBtn).toBeInTheDocument();

  await user.click(addNewUserBtn)

  //get all form elements

  const fullName = screen.getByRole('textbox', {name: /full name/i})
  const userName = screen.getByRole('textbox', {name: /user name/i})
  const password = screen.getByRole('textbox', {name: /password/i})

  const submitBtn = screen.getByRole('button', {name: /add new user/i})

  expect(submitBtn).toBeDisabled()

  
  await user.type(fullName, 'Michael Thornton');
  expect(fullName.value).toBe('Michael Thornton')
  await user.type(password, 'someT')

  expect(submitBtn).toBeDisabled()

  await user.type(password, 'ext')  
  //user name not required
  expect(userName.value).toBe('')
  expect(submitBtn).not.toBeDisabled()

  //optional user name input test
  await user.type(userName, 'dedalus')
  expect(userName.value).toBe('dedalus')

  await user.click(submitBtn)

  //takes user to dashboard after entering information

  //load mock api data is set to resolve at timeout: 1000
const header = await screen.findByText(/new polls/i)
expect(header).toBeInTheDocument()



})

test('snapshot', async () => {

    const user = userEvent.setup();
    const {container} = renderWithProviders(<App />)
    // const tree = renderer.create(<AddUser />).toJSON();
    await waitFor(
        () =>
          expect(
            screen.getByRole("link", { name: /add new user/i })
          ).toBeInTheDocument(),
        {
          timeout: 2500,
        }
      );

      //add user link is present
  const addNewUserBtn = screen.getByRole("link", { name: /add new user/i });
  expect(addNewUserBtn).toBeInTheDocument();

  await user.click(addNewUserBtn)

  //get all form elements

  expect(screen.getByRole('textbox', {name: /full name/i})).toBeInTheDocument()

  const submitBtn = screen.getByRole('button', {name: /add new user/i})

  expect(submitBtn).toBeDisabled()

  expect(container).toMatchSnapshot()

})