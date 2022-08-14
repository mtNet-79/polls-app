import PollBox from "./PollBox";
import { connect } from "react-redux";

const Dashboard = (props) => {
  // console.log("Dashboard props: ", props);
  return (
    <div className='dashboard'>
      <div className="question-container">
        <h2 className="questions-header center">New Questions</h2>
        <ul className="flex-row-wrap">
        {props.questionIds.map((id) => (
          <li key={id}>
            <PollBox id={id} />
          </li>
        ))}
        </ul>
        
      </div>
      <div className="question-container">
        <h1 className="questions-header">Done</h1>
      </div>     
    </div>
  );
};
const mapStateToProps = ({questions}) => ({
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
 
});
export default connect(mapStateToProps)(Dashboard);
