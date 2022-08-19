

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

export function formatUser({ fullName, image, password, userName, users }) {
 
  let userId = '';
  if(userName) userId = userName 
  else {
    userId = fullName.trim().toLowerCase();
    const [firstName, lastName] = userId.split(" ");
    userId = firstName.slice(0, 1) + lastName;
    Object.keys(users).forEach((user) => {
      if(user === userId) userId = firstName.slice(0, 2) + lastName;
      
    })

  }

  return {
    id: userId,
    password,
    name: fullName,
    avatarURL: image,
    answers: {},
    questions: [],
  };
}
