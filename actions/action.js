import { AsyncStorage } from "react-native";
import { getDecks, setDeckDetail, addDeck, addCard } from "./reduxAction";
import uuid from "uuid";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "flashcards:notifications";

export function _initialize(callback) {
  console.log("initialize");
  let ReactId = uuid();
  let JavaScriptId = uuid();

  console.log(
    AsyncStorage.getAllKeys().then(keys => {
      if (!keys.includes("flashcard")) {
        AsyncStorage.setItem(
          "flashcard",
          JSON.stringify({
            [ReactId]: {
              title: "React",
              id: ReactId,
              questions: [
                {
                  question: "What is React?",
                  answer: "A library for managing user interfaces"
                },
                {
                  question: "Where do you make Ajax requests in React?",
                  answer: "The componentDidMount lifecycle event"
                }
              ]
            },
            [JavaScriptId]: {
              title: "JavaScript",
              id: JavaScriptId,
              questions: [
                {
                  question: "What is a closure?",
                  answer:
                    "The combination of a function and the lexical environment within which that function was declared."
                }
              ]
            }
          }),
          () => console.log("done")
        );
      }
    })
  );
}

export function _getDecks() {
  console.log("_getDecks");
  return dispatch => {
    AsyncStorage.getItem("flashcard").then(object => {
      dispatch(getDecks(JSON.parse(object)));
    });
  };
}

export function _getDeck(id) {
  return dispatch => {
    AsyncStorage.getItem("flashcard").then(item => {
      let object = JSON.parse(item);
      if (object.length > 0) {
        dispatch(setDeckDetail(object[id]));
      }
    });
  };
}

export function _addDeck(title, callback) {
  return dispatch => {
    AsyncStorage.getItem("flashcard").then(string => {
      let object = JSON.parse(string);
      let id = uuid();
      object[id] = { id, title, questions: [] };
      dispatch(addDeck({ id, title, questions: [] }));
      AsyncStorage.setItem("flashcard", JSON.stringify(object), () =>
        callback()
      );
    });
  };
}

export function _addCard(id, card, callback) {
  return dispatch => {
    AsyncStorage.getItem("flashcard").then(string => {
      let object = JSON.parse(string);
      object[id].questions.push(card);
      dispatch(addCard(id, card));
      AsyncStorage.setItem("flashcard", JSON.stringify(object), () =>
        callback()
      );
    });
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Log your stats!",
    body: "👋 don't forget to log your stats for today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  console.log("SetLocalNotification");
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(9);
            tomorrow.setMinutes(40);

            console.log(tomorrow);
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
