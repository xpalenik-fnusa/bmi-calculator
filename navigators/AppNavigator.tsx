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
                options={{
                    title: 'BMI CALCULATOR',
                    headerStyle:{
                        backgroundColor: "#0A0C21",
                    },
                    headerTitleStyle:{
                        color: 'white'
                    }
                }}
            />
            <AppStack.Screen 
                name={ScreenName.BMI_RESULT_WEB_SPEEDOMETER}
                component={BmiResultWebSpeedometerScreen}
                options={{
                    title: 'BMI CALCULATOR',
                    headerStyle:{
                        backgroundColor: "#0A0C21",
                    },
                    headerTitleStyle:{
                        color: 'white'
                    }
                }}
            />
            <AppStack.Screen 
                name={ScreenName.BMI_RESULT_ANDROID}
                component={BmiResultAndroidScreen}
                options={{
                    title: 'BMI CALCULATOR',
                    headerStyle:{
                        backgroundColor: "#0A0C21",
                    },
                    headerTitleStyle:{
                        color: 'white'
                    }
                }}
            />
        </AppStack.Navigator>
    )
}

export default AppNavigator;