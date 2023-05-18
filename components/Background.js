export default function Background({ children }) {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    // const [isInFocus, setIsInFocus] = useState(false);
    const [isInFocusName, setIsInFocusName] = useState(false);
    const [isInFocusEmail, setIsInFocusEmail] = useState(false);
    const [isInFocusPassword, setIsInFocusPassword] = useState(false);

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        setIsInFocusName(false);
        setIsInFocusEmail(false);
        setIsInFocusPassword(false);
        Keyboard.dismiss();
    }

    const sendValues = () => {
        keyboardHide();
        setState(initialState);
    }

    const handleFocusOnName = () => {
        setIsShowKeyboard(true);
        setIsInFocusName(true);
        setIsInFocusEmail(false);
        setIsInFocusPassword(false);
    }

    const handleFocusOnEmail = () => {
        setIsShowKeyboard(true);
        setIsInFocusName(false);
        setIsInFocusEmail(true);
        setIsInFocusPassword(false);
    }

    const handleFocusOnPassword = () => {
        setIsShowKeyboard(true);
        setIsInFocusName(false);
        setIsInFocusEmail(false);
        setIsInFocusPassword(true);
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/images/background-photo.jpg")}
                    style={styles.backgroundPhoto}
                >
                    <KeyboardAvoidingView
                        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        behavior={Platform.OS === 'ios' && 'padding'}
                    >
                        {children}
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundPhoto: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        // alignItems: 'center',
    },
});
