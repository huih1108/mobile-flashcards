import React from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  Alert
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { connect } from "react-redux";
import { _addCard } from "../actions/action";

class NewCardScreen extends React.Component {
  static navigationOptions = {
    title: "Add Card"
  };
  state = {
    question: "",
    answer: ""
  };
  handleSubmit(id) {
    if (!(this.state.question && this.state.answer)) {
      Alert.alert(
        null,
        "Please enter all information..",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      this.props._addCard(
        id,
        {
          question: this.state.question,
          answer: this.state.answer
        },
        () => this.props.navigation.navigate("DeckDetail")
      );
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>Question</Text>
        <TextInput
          style={{ height: 100, fontSize: 20 }}
          placeholder="Enter a new question."
          onChangeText={question => this.setState({ question })}
        />

        <Text style={{ fontSize: 24 }}>Answer</Text>
        <TextInput
          style={{ height: 100, fontSize: 20 }}
          placeholder="Enter the answer to the question."
          onChangeText={answer => this.setState({ answer })}
        />
        <Button
          onPress={() => this.handleSubmit(navigation.getParam("id"))}
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

export default connect(
  null,
  { _addCard }
)(NewCardScreen);
