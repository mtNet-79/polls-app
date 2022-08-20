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
  console.log(`option One : ${optionOneText}, option Two : ${optionTwoText}`)
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
  let goodToGo = true;
  let userId = "";
  // console.log(`match at user ${users['mthornton']?.id} and userID ${userName}`);
  if (userName) {
    userId = userName;
    //user name user choose is already taken
    Object.keys(users).forEach((user) => {
      if (user === userId) {
        goodToGo = false;
      }
    });
  } else {
    //no user name provided, create one
    userId = fullName.trim().toLowerCase();
    const [firstName, lastName] = userId.split(" ");
    userId = firstName.slice(0, 1) + lastName;
    const userKeys = Object.keys(users);
    userKeys.forEach((user) => {
      if (user === userId) userId = firstName.slice(0, 2) + lastName;
    });
    //unable to create one due to matches with current database
    Object.keys(users).forEach((user) => {
      if (user === userId) {
        goodToGo = false;
      }
    });
  }
  let returnValue = null;
  if (goodToGo)
    returnValue = {
      id: userId,
      password,
      name: fullName,
      avatarURL: image,
      answers: {},
      questions: [],
    };

  return returnValue;
}
