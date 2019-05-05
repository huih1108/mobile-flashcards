import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from "react-native";
import { _getDecks } from "../actions/action";
import { setDeckDetail } from "../actions/reduxAction";
import { getDecks } from "../actions/reduxAction";
import { WebBrowser } from "expo";
import _ from "lodash";
import { connect } from "react-redux";

class DeckListScreen extends React.Component {
  static navigationOptions = {
    title: "Decks"
  };
  state = {
    decks: this.props._getDecks()
  };

  componentDidMount() {
    // this.props._getDecks();
    AsyncStorage.getItem("flashcard").then(object => {
      console.log(JSON.parse(object)),
        this.setState({ decks: JSON.parse(object) });
      getDecks(JSON.parse(object));
    });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }
  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  navigateDeckDetail(navigation, deck) {
    this.props.setDeckDetail(deck);
    navigation.navigate("DeckDetail", { title: deck.title, id: deck.id });
  }

  render() {
    const { navigation, decks } = this.props;
    console.log("rerender");
    console.log("list", this.props.decks);
    let deckList;
    if (this.props.decks) {
      deckList = _.map(this.props.decks, (deck, index) => (
        <TouchableOpacity
          key={deck.id}
          onPress={() => this.navigateDeckDetail(navigation, deck)}
        >
          <View style={styles.cardContainer} key={deck.id}>
            <Text style={{ fontSize: 23, fontWeight: "bold" }}>
              {deck.title}
            </Text>
            <Text style={{ fontSize: 20, color: "#696969" }}>
              {deck.questions.length} cards
            </Text>
          </View>
        </TouchableOpacity>
      ));
    } else {
      deckList = null;
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View>{deckList}</View>
        </ScrollView>
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
    borderColor: "#696969",
    padding: 20,
    borderBottomWidth: 1,
    alignItems: "center"
  },
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

function mapStatetoProps(store) {
  return {
    decks: _.sortBy(store.deckReducer, "title")
  };
}
export default connect(
  mapStatetoProps,
  { _getDecks, setDeckDetail, getDecks }
)(DeckListScreen);
