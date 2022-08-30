import PollBox from "./PollBox";

const PollContainer = ({ polls, answered }) => {
  return (
    <>
      {polls.length !== 0 ? (
        answered ? (
          <ul className="flex-row-wrap">
            {polls.map((id) => (
              <li key={id}>
                <PollBox id={id} answered={true}/>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex-row-wrap">
            {polls.map((id) => (
              <li key={id}>
                <PollBox id={id} answered={false}/>
              </li>
            ))}
          </ul>
        )
      ) : (
        <div>
          {answered ? (
            <span className="polls-header center">
              You have answered 0 polls
            </span>
          ) : (
            <span className="polls-header center">
              You have completed all current polls!
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default PollContainer;
