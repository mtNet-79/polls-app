import { screen, render } from "@testing-library/react";
import PollContainer from "../../components/PollContainer";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

const pollsMock = [
  "xj352vofupe1dqz9emx13r",
  "vthrdm985a262al8qx3do",
  "am8ehyc8byjqgar0jgpub9",
  "loxhs1bqm25b708cmbf3g",
  "6ni6ok3ym7mf1p33lnez",
  "8xf0y6ziyjabvozdd253nd",
];

jest.mock("../../components/PollBox", () => () => {
  return <div>Poll Box</div>;
});

//unit tests
test("renders with defualt unaswered polls / snapshot", async () => {
  const { container } = render(
    <PollContainer polls={pollsMock} unanswered={true} />
  );

  

  const itemList = screen.getAllByRole("list");
  const listItems = screen.getAllByRole("listitem");

  expect(itemList.length).toBe(1);
  expect(listItems.length).toBe(6);

  expect(screen.getAllByText(/poll box/i).length).toBe(pollsMock.length);

  expect(container).toMatchSnapshot();
});

test("no answered polls are available", async () => {
  render(<PollContainer polls={[]} answered={false} />);

  const itemList = screen.getByText("You have completed all current polls!");

  expect(itemList).toBeInTheDocument();
});

test("all elements are rendered for defualt answered polls", async () => {
  render(<PollContainer polls={[]} answered={false} />);

  const itemList = screen.queryByRole("list");
  const listItems = screen.queryAllByRole("listitem");

  expect(itemList).not.toBeInTheDocument();
  expect(listItems.length).toBe(0);
});

test("no unanswered polls are available", async () => {
  render(<PollContainer polls={[]} answered={true} />);

  const itemList = screen.getByText("You have answered 0 polls");

  expect(itemList).toBeInTheDocument();
});
