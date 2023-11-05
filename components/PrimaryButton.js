// Custom button component that can be used throughout the app
import { View, Text } from 'react-native';

function PrimaryButton({ children }) {
    return (
        <View>
            <Text>{children}</Text>
        </View>
    );
}

export default PrimaryButton;