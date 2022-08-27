import { Fragment } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddPoll } from "../actions/createPoll";

const CreatePoll = (props) => {
    
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [formReady, setFormReady] = useState(false);
  const navigate = useNavigate();

  const { authedUser, dispatch } = props;

  const checkForm = (e) => {
    if (e.target.id === "optionOne") setOptionOne(e.target.value);
    else if (e.target.id === "optionTwo") setOptionTwo(e.target.value);
    if ((optionOne !== "" && optionOne.length > 5 ) && (optionTwo !== "" && optionTwo.length > 5)) setFormReady(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const poll = {
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authedUser,
    }
    dispatch(handleAddPoll(poll));
    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };

  return (
    <Fragment>
      <h1>Would you rather</h1>
      <h3 className="light">Create a Poll</h3>
      <form className="add-new" onSubmit={handleSubmit}>
        <label htmlFor="optionOne" className="form-label center">
          First Option
        </label>
        <input
          placeholder="Option One"
          type="text"
          name="optionOne"
          id="optionOne"
          value={optionOne}
          onChange={checkForm}
        />
        <label htmlFor="optionTwo" className="form-label center">
          Second Option
        </label>
        <input
          placeholder="Option Two"
          type="text"
          name="optionTwo"
          id="optionTwo"
          value={optionTwo}
          onChange={checkForm}
        />
        <button type="submit" className="btn" disabled={!formReady}>
          Submit
        </button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = ({authedUser}) => ({
    authedUser,
})

export default connect(mapStateToProps)(CreatePoll);
