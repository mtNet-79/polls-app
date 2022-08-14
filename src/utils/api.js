import {
  _getPolls,
  _getUsers,
  _saveUser,
  _savePoll,
  _savePollAnswer,
} from "./_DATA";

export function generateRandomAvatar() {
  fetch("https://avatar-endpoint.herokuapp.com/api/");
}

export function getInitialData() {
  return Promise.all([_getUsers(), _getPolls()]).then(([users, questions]) => ({
    users,
    questions,
  }));
}

export function saveUser(info) {
  return _saveUser(info);
}

export function savePoll(info) {
  return _savePoll(info);
}

export function saveAnswerPoll(info) {
  return _savePollAnswer(info);
}
