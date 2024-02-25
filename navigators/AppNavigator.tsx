import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BmiCalculatorScreen from "../screens/BmiCalculatorScreen";
import { ScreenName } from "../types/ScreenName";
import BmiResultAdultScreen from "../screens/BmiResultScreen.adult";
import BmiResultUnderagedScreen from "../screens/BmiResultScreen.underaged";

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
                name={ScreenName.BMI_RESULT_ADULT}
                component={BmiResultAdultScreen}
                options={{headerShown: false}}
            />
            <AppStack.Screen 
                name={ScreenName.BMI_RESULT_UNDERAGED}
                component={BmiResultUnderagedScreen}
                options={{headerShown: false}}
            />
        </AppStack.Navigator>
    )
}

export default AppNavigator;