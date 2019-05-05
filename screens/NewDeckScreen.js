import React from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  AsyncStorage,
  Alert
} from "react-native";
import { _addDeck, _getDecks } from "../actions/action";
import { ExpoLinksView } from "@expo/samples";
import { connect } from "react-redux";
import uuid from "uuid";
import { getDecks, addDeck } from "../actions/reduxAction";

class NewDeckScreen extends React.Component {
  static navigationOptions = {
    title: "New Deck"
  };

  state = {
    text: ""
  };

  handleSubmit(navigation) {
    if (this.state.text.length < 1) {
      // Works on both iOS and Android
      Alert.alert(
        null,
        "Please enter a name.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      this.props._addDeck(this.state.text, () => {
        this.setState({ text: "" }), navigation.navigate("Decks");
      });
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={{ height: 100, fontSize: 20 }}
          placeholder="Enter a name for the new deck."
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <Button
          onPress={() => this.handleSubmit(navigation)}
          title="Submit"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    alignItems: "stretch"
  }
});

function mapStatetoProps(store) {
  return {
    decks: store.deckReducer
  };
}
export default connect(
  mapStatetoProps,
  { _getDecks, getDecks, _addDeck }
)(NewDeckScreen);
