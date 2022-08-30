import { screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../../Components/App";
import { renderWithProviders } from "./test-utils";

test("renders / take snapshot", async () => {
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

  
   //has all nav links present
  
   const homeLink = screen.getByRole('link', {name:/home/i})
   expect(homeLink).toBeInTheDocument()
 
   const leaderboardLink = screen.getByRole('link', {name:/leaderboard/i})
   expect(leaderboardLink).toBeInTheDocument()
 
   const newPollLink = screen.getByRole('link', {name:/post/i})
   expect(newPollLink).toBeInTheDocument()
 
   const avatar = screen.getByRole('img', {name:/icon/i})
   expect(avatar).toBeInTheDocument()
 
   //user is signed in
   const user = store.getState().authedUser
   const authedUser = screen.getByText(user)
   expect(authedUser).toBeInTheDocument()
 
   const logoutLink = screen.getByRole('link', {name: /log out/i})
   expect(logoutLink).toBeInTheDocument()
   expect(container).toMatchSnapshot();
});

describe("nav clicks", () => {
  it("should navigate from home on link click", async () => {
    const user = userEvent.setup();

    const { store, container } = renderWithProviders(<App />, {
      route: "/dashboard",
      authedUser: "mthornton",
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
        name: /leaderboard/i
    });
   //header rows
   const headerRow = screen.getByRole('rowheader')
    expect(headerRow).toBeInTheDocument();
    expect(within(headerRow).getByText(/users/i)).toBeInTheDocument();
    expect(within(headerRow).getByText(/answered/i)).toBeInTheDocument();
    expect(within(headerRow).getByText(/created/i)).toBeInTheDocument();

    //participant rows
    const participants = Object.keys(store.getState().users).filter(
        (key) =>
          Object.keys(store.getState().users[key].answers).length !== 0 ||
          store.getState().users[key].polls.length !== 0
      )

    //participant rows
    const rows = within(table).getAllByRole("row");
    expect(rows.length).toBe(participants.length);

   
    
    expect(
      screen.getByRole("img", { name: /avatar of sarah edo/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/sarah edo/i)).toBeInTheDocument();
    expect(screen.getByText(/sarahedo/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /avatar of tyler mcginnis/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/tyler mcginnis/i)).toBeInTheDocument();
    expect(screen.getByText(/tylermcginnis/i)).toBeInTheDocument();
    expect(screen.getByText(/mike tsamis/i)).toBeInTheDocument();
    expect(screen.getByText(/mtsamis/i)).toBeInTheDocument();
    expect(screen.getByText(/zenobia oshikanlu/i)).toBeInTheDocument();
    expect(screen.getByText(/zoshikanlu/i)).toBeInTheDocument();
  });
});
