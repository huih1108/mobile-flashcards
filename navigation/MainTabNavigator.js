import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import LinksScreen from "../screens/LinksScreen";
import DeckListScreen from "../screens/DeckListScreen";
import NewDeckScreen from "../screens/NewDeckScreen";
import DeckDetailScreen from "../screens/DeckDetailScreen";
import NewCardScreen from "../screens/NewCardScreen";
import QuizScreen from "../screens/QuizScreen";
import SettingsScreen from "../screens/SettingsScreen";

const DecksStack = createStackNavigator({
  Decks: DeckListScreen,
  DeckDetail: DeckDetailScreen,
  AddCard: NewCardScreen,
  Quiz: QuizScreen
});

DecksStack.navigationOptions = {
  tabBarLabel: "Decks",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-apps` : "md-apps"}
    />
  )
};

const NewDeckStack = createStackNavigator({
  NewDeck: NewDeckScreen,
  DeckDetail: DeckDetailScreen
});

NewDeckStack.navigationOptions = {
  tabBarLabel: "New Deck",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-add-circle${focused ? "" : "-outline"}`
          : "md-add-circle"
      }
    />
  )
};

export default createBottomTabNavigator({
  DecksStack,
  NewDeckStack
});
