import { screen, waitFor, within } from "@testing-library/react";
// import PollContainer from "../../Components/PollContainer";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import App from "../../Components/App";
import { renderWithProviders } from "./test-utils";

//unit tests
test("all elements are rendered showing unaswered polls / take snapshot", async () => {
  const {store, container} =renderWithProviders(<App />, {route: '/', authedUser: 'mthornton'});

  await waitFor(
    () => expect(screen.getByText(/new polls/i)).toBeInTheDocument(),
    {
        timeout: 2000,
    }
);


 //all unanswered polls are present 
 const dashboardList = screen.getAllByRole('list')[2]
const pollBoxes = within(dashboardList).getAllByRole("listitem");


const answeredPolls = Object.keys(store.getState().users[store.getState().authedUser].answers);  
const pollsCount = Object.keys(store.getState().polls).length;  
expect(pollBoxes.length).toBe(pollsCount - answeredPolls.length)

const pollBox = pollBoxes[0]
//  expect(within(pollBox).getByText('mtsamis')).toBeInTheDocument()
//  expect(within(pollBox).getByText(/1:16:pm \| 4\/30\/2017/i)).toBeInTheDocument()
 expect(within(pollBox).getByRole('button', {name: /show poll/i})).toBeInTheDocument()

 expect(container).toMatchSnapshot();
 
});
