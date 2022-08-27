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
  let userIdIsAvailable = true;
  let userId = "";
  if (userName) {
    userId = userName;
    userIdIsAvailable = checkUserIdIsAvailable(users, userId);
  } else {
    //no user name provided, create one
    userId = fullName.trim().toLowerCase();
    const [firstName, lastName] = userId.split(" ");
    userId = firstName.slice(0, 1) + lastName;
    const userKeys = Object.keys(users);
    userKeys.forEach((user) => {
      if (user === userId) userId = firstName.slice(0, 2) + lastName;
    });
    //check if generated name is available
    userIdIsAvailable = checkUserIdIsAvailable(users, userId);
  }

  let returnValue = null;

  if (userIdIsAvailable)
    returnValue = {
      id: userId,
      password,
      name: fullName,
      avatarURL: image,
      answers: {},
      polls: [],
    };

  return returnValue;
}

function checkUserIdIsAvailable(users, userId) {
  let returnVal = true;
  if(users) {
    Object.keys(users).forEach((user) => {
      if (user === userId) {
        returnVal = false;
      }
    });
  }  
  
  return returnVal;
}
