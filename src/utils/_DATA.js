import { formatPoll, formatUser } from "./helpers";

let users = {
  mthornton: {
    id: "mthornton",
    password: "elephants",
    name: "Mike Thornton",
    avatarURL: "https://avatar-endpoint.herokuapp.com/api/",
    answers: {},
    polls: [],
  },
  sarahedo: {
    id: "sarahedo",
    password: "password123",
    name: "Sarah Edo",
    avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    polls: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  tylermcginnis: {
    id: "tylermcginnis",
    password: "abc321",
    name: "Tyler McGinnis",
    avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    polls: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  mtsamis: {
    id: "mtsamis",
    password: "xyz123",
    name: "Mike Tsamis",
    avatarURL: null,
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
    },
    polls: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
  zoshikanlu: {
    id: "zoshikanlu",
    password: "pass246",
    name: "Zenobia Oshikanlu",
    avatarURL: null,
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
    },
    polls: [],
  },
};

let polls = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "sarahedo",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["sarahedo"],
      text: "Build our new application with Javascript",
    },
    optionTwo: {
      votes: [],
      text: "Build our new application with Typescript",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "mtsamis",
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: "hire more frontend developers",
    },
    optionTwo: {
      votes: ["mtsamis", "sarahedo"],
      text: "hire more backend developers",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "sarahedo",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "conduct a release retrospective 1 week after a release",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "conduct release retrospectives quarterly",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "tylermcginnis",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "have code reviews conducted by peers",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "have code reviews conducted by managers",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "tylermcginnis",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["tylermcginnis"],
      text: "take a course on ReactJS",
    },
    optionTwo: {
      votes: ["mtsamis"],
      text: "take a course on unit testing with Jest",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "mtsamis",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["mtsamis", "zoshikanlu"],
      text: "deploy to production once every two weeks",
    },
    optionTwo: {
      votes: ["tylermcginnis"],
      text: "deploy to production once every month",
    },
  },
};

export function _getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...users }), 1000);
  });
}

export function _getPolls() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...polls }), 1000);
  });
}

export function _savePoll(poll) {
  return new Promise((resolve, reject) => {
    if (!poll.optionOneText || !poll.optionTwoText || !poll.author) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }
    const formattedPoll = formatPoll(poll);
    setTimeout(() => {
      polls = {
        ...polls,
        [formattedPoll.id]: formattedPoll,
      };

      users = {
        ...users,
        [poll.author]: {
          ...users[poll.author],
          polls: [...users[poll.author].polls, formattedPoll.id],
        },
      };

      resolve(formattedPoll);
    }, 1000);
  });
}

export function _saveUser(info) {  
    return new Promise((resolve, reject) => {
    const formattedUser = formatUser(info);
    if(formattedUser){
      setTimeout(() => {
        users = {
          ...users,
          [formattedUser.id]: formattedUser,
        };

        resolve(formattedUser);
      }, 1000);
      
      
    } else {
      reject("Please provide a unique user name");
    }
  });
}

export function _savePollAnswer({ authedUser, pid, answer }) {  
  return new Promise((resolve, reject) => {
    if (!authedUser || !pid || !answer) {
      reject("Please provide authedUser, pid, and answer");
    }
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [pid]: answer,
          },
        },
      };

      polls = {
        ...polls,
        [pid]: {
          ...polls[pid],
          [answer]: {
            ...polls[pid][answer],
            votes: polls[pid][answer].votes.concat([authedUser]),
          },
        },
      };

      resolve(true);
    }, 500);
  });
}

