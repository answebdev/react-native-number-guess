// Custom button component that can be used throughout the app
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

function PrimaryButton({ children, myOnPress }) {


    // We are not executing th 'pressHandler' function.
    // Instead, we are merely pointing to the function, so that it is executed when a press occurs,
    // and that is why we do not uses parentheses here:
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed
                        ? [styles.buttonInnerContainer, styles.pressed]
                        : styles.buttonInnerContainer}
                onPress={myOnPress}
                android_ripple={{ color: Colors.primary600 }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        // Add shadow ONLY on Android (not iOS):
        elevation: 2
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75,
    }
});