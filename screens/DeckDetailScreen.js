import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage
} from "react-native";
import { WebBrowser } from "expo";
import _ from "lodash";
import { connect } from "react-redux";
import { _getDeck } from "../actions/action";
import { getDecks } from "../actions/reduxAction";

import { MonoText } from "../components/StyledText";

class DeckDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("title")
    };
  };

  render() {
    const { detail, navigation } = this.props;
    console.log("detail", detail);
    console.log("id", detail.id);
    let deckList = (
      <View style={styles.cardContainer}>
        <Text style={{ fontSize: 23, fontWeight: "bold" }}>{detail.title}</Text>
        <Text style={{ fontSize: 20, color: "#696969" }}>
          {detail.questions.length} cards
        </Text>
      </View>
    );

    return (
      <View style={styles.container}>
        {deckList}
        <Button
          onPress={() => navigation.navigate("AddCard", { id: detail.id })}
          title="Add Card"
          color="#841584"
        />
        <Button
          onPress={() => navigation.navigate("Quiz", { id: detail.id })}
          title="Start Quiz"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {},
  cardContainer: {
    padding: 20,
    paddingTop: 50,
    alignItems: "center"
  },
  buttonStyle: {},
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});

function mapStatetoProps(store, ownProps) {
  return {
    detail: store.deckReducer[ownProps.navigation.getParam("id")]
  };
}
export default connect(
  mapStatetoProps,
  { _getDeck, getDecks }
)(DeckDetailScreen);
