import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

// Generate a random number.
// 'exclude' allows us to exclude a certain number from being generated.
// We do not want the user to be able to guess the correct number right at the start of the game.
// The 'exclude' parameter allows us to exclude that single number so that the phone cannot win automatically in the first round.
// Snippet: https://github.com/academind/react-native-practical-guide-code/blob/04-deep-dive-real-app/extra-files/logic/random.js
// Video: https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/31197516#overview
function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber }) {
    // Generate a random number between 1 and 100,
    // and exclude the number chosen by the user ('userNumber') on the Start screen,
    // so that the phone cannot guess this 'userNumber' when that state is initialized:
    const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber);
    // Current guess made by the phone:
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    // Handle the next guess when user presses + or - buttons.
    // 'direction' is for either 'lower' (if the next number should be lower than the previous number),
    // or 'greater' (if the next number should be greater than the previous number).
    function nextGuessHandler(direction) {
        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert(
                "Dont' lie!",
                "You know that this is wrong...",
                [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        // console.log(minBoundary, maxBoundary);
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text>Higher or lower?</Text>
                <View>
                    <PrimaryButton myOnPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
                    <PrimaryButton myOnPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                </View>
            </View>
            {/* <View>LOG ROUNDS</View> */}
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    }
});