function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substring(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function formatPoll({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function formatUser({ user, src, password }) {
  let userName = user.trim().toLowerCase();
  const [firstName, lastName] = userName.split(" ");
  userName = firstName.slice(0, 1) + lastName;

  return {
    id: userName,
    password,
    name: user,
    avatarURL: src,
    answers: {},
    questions: [],
  };
}
