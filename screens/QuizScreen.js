import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { WebBrowser } from "expo";
import _ from "lodash";

import { MonoText } from "../components/StyledText";
import { connect } from "react-redux";
import {
  setLocalNotification,
  clearLocalNotification
} from "../actions/action";

class QuizScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Quiz"
    };
  };

  state = {
    index: 0,
    showAnswer: false,
    numberCorrect: 0
  };

  studied() {
    clearLocalNotification().then(setLocalNotification);
    console.log("notification cleared");
  }
  render() {
    const { navigation, detail } = this.props;
    const { index, showAnswer, numberCorrect } = this.state;
    if (index === detail.questions.length) {
      this.studied();
    }
    return (
      <View style={styles.container}>
        {detail.questions.length === 0 && (
          <View style={styles.cardContainer}>
            <Text style={{ fontSize: 24, padding: 50 }}>Please add cards.</Text>
          </View>
        )}
        {detail.questions.length > 0 && index < detail.questions.length && (
          <View style={styles.cardContainer}>
            <Text>
              {index + 1}/{detail.questions.length}
            </Text>
            {showAnswer ? (
              <Text style={{ fontSize: 24, padding: 50 }}>
                {detail.questions[index].answer}
              </Text>
            ) : (
              <Text style={{ fontSize: 20, padding: 50 }}>
                {detail.questions[index].question}
              </Text>
            )}

            <Button
              onPress={() => this.setState({ showAnswer: !showAnswer })}
              title={showAnswer ? "Question" : "Answer"}
              color={showAnswer ? "#0000ff" : "#ff0000"}
            />
            <Button
              onPress={() =>
                this.setState({
                  numberCorrect: numberCorrect + 1,
                  index: index + 1
                })
              }
              title="Correct"
              color="#841584"
            />
            <Button
              onPress={() => this.setState({ index: index + 1 })}
              title="Incorrect"
              color="#841584"
            />
          </View>
        )}

        {detail.questions.length > 0 && index >= detail.questions.length && (
          <View style={styles.cardContainer}>
            <Text style={{ fontSize: 24 }}>
              You answered{" "}
              {Math.round((numberCorrect / detail.questions.length) * 100)}%{" "}
              correctly!
            </Text>
          </View>
        )}
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
    padding: 50,
    alignItems: "center"
  }
});

function mapStatetoProps(store, ownProps) {
  return {
    detail: store.deckReducer[ownProps.navigation.getParam("id")]
  };
}

export default connect(mapStatetoProps)(QuizScreen);
