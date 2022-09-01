import PollBox from "./PollBox";

const PollContainer = ({ polls, answered }) => {
  return (
    <>
      {polls.length !== 0 ? (        
          <ul className="flex-row-wrap">
            {polls.map((id) => (
              <li key={id}>
                <PollBox id={id} />
              </li>
            ))}
          </ul>
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
