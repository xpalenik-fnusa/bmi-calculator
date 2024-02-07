import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BmiCalculatorScreen from "../screens/BmiCalculatorScreen";
import { ScreenName } from "../types/ScreenName";
import BmiResultWebSpeedometerScreen from "../screens/BmiResultScreen.web";
import BmiResultAndroidScreen from "../screens/BmiResultScreen.android";

const AppStack = createNativeStackNavigator();

const AppNavigator = ()=>{
    return(
        <AppStack.Navigator>
            <AppStack.Screen 
                name={ScreenName.BMI_CALCULATOR}
                component={BmiCalculatorScreen}
                options={{headerShown: false}}
            />
            <AppStack.Screen 
                name={ScreenName.BMI_RESULT_WEB_SPEEDOMETER}
                component={BmiResultWebSpeedometerScreen}
                options={{headerShown: false}}
            />
            <AppStack.Screen 
                name={ScreenName.BMI_RESULT_ANDROID}
                component={BmiResultAndroidScreen}
                options={{headerShown: false}}
            />
        </AppStack.Navigator>
    )
}

export default AppNavigator;