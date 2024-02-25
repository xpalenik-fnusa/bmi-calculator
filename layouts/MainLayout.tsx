import { StatusBar, StyleProp, StyleSheet, View, ViewStyle, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const MainLayout: React.FC<any> = ({ children })=>{

    const insets = useSafeAreaInsets();

    let safeAreaStyle: StyleProp<ViewStyle> = {
        // paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
    }

    const image = require('../assets/meter.jpg');

    return(
        <ImageBackground source={image} style={styles.backgroundImage}>
            <View style={[styles.container, safeAreaStyle]}>
                <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
                { children }
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },

    backgroundImage: {
        flex: 1
    }
});

export default MainLayout;