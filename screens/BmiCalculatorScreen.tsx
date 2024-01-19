import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Text, StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle, TextStyle, Platform } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import GenderButtonSelect from '../components/GenderButtonSelect';
import SliderSelect from '../components/SliderSelect';
import { ScreenName } from '../types/ScreenName';


const BmiCalculatorScreen: React.FC<NativeStackScreenProps<ParamListBase>> = ({
    navigation
})=>{

    // type
    interface FormState{
        gender?: 'muž' | 'žena';
        height?: number;
        weight?: number;
        age?: number;
    }

    // State
    const  [formState, setFormState] = React.useState<FormState>({})

    // Helpers
    const isButtonDisabled = ()=>{
        return !(formState.gender && formState.age && formState.height
        && formState.weight)
    }

    // Styles
    const btnStyle: StyleProp<ViewStyle> = {
        backgroundColor: isButtonDisabled() ? "rgba(227, 0, 89, 0.3)" : "rgba(227, 0, 89, 0.9)", // same colors, different opacities
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15
    }
    let btnTextStyle: StyleProp<TextStyle> = {
        color: "white",
        fontSize: 20,
        textTransform: 'uppercase'
    }

    // Handlers
    const handleChange = (key: keyof FormState, value: any)=>{
        setFormState((prevState)=>({
            ...prevState,
            [key]: value
        }))
    }

    const handlePress = (value: 'muž' | 'žena')=>{
        setFormState((prevState)=>({
            ...prevState,
            gender: prevState.gender === value ? undefined : value
        }))
    }

    const calculateBmi = () => {
        let { weight, height } = formState;

        if (weight && height) {
            let heightMeters = height/100;
            const bmiResult = (weight / (heightMeters * heightMeters)).toFixed(2);
            console.log(bmiResult);
            const screenToNavigate = (
                Platform.OS === 'android' ? ScreenName.BMI_RESULT_ANDROID :
                Platform.OS === 'web'     ? ScreenName.BMI_RESULT_WEB_SPEEDOMETER :
                ScreenName.BMI_RESULT_ANDROID // by default (because speedometer doesn't work on Android)
            );
            navigation.navigate(screenToNavigate, { bmi: Number.parseInt(bmiResult) });
        }
       
    };

    return(
        <MainLayout>
            <View style={styles.container}>
                
                {/** Inner Main container */}
                <View style={styles.inner}>

                    {/** Gender Button Group */}
                    <View style={{ gap: 10, flexDirection: 'row', marginVertical: '2%'}}>
                        <GenderButtonSelect
                            gender='muž'
                            adult={ formState.age === undefined || formState.age >= 18  }
                            onPress={()=> handlePress('muž')}
                            selected={formState.gender === 'muž'}
                        />
                        <GenderButtonSelect 
                            gender='žena'
                            adult={ formState.age === undefined || formState.age >= 18 } 
                            onPress={()=> handlePress('žena')}
                            selected={formState.gender === 'žena'}
                        />
                    </View>

                    {/** Height Slider */}
                    <View>
                        <SliderSelect label='Výška' suffix='cm' minimum={100} maximum={200} onValueChange={(value)=> handleChange('height', value)}/>
                    </View>

                    {/** Weight Slider */}
                    <View>
                        <SliderSelect label='Hmotnost' suffix='kg' minimum={20} maximum={150} onValueChange={(value)=> handleChange('weight', value)}/>
                    </View>

                    {/** Age Slider */}
                    <View>
                        <SliderSelect label='Věk' suffix='let' minimum={6} maximum={100} onValueChange={(value)=> handleChange('age', value)}/>
                    </View>

                    {/** Button */}
                    <View style={{ marginTop: '2%' }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={btnStyle}
                            disabled={isButtonDisabled()}
                            onPress={calculateBmi}
                        >
                            <Text style={btnTextStyle} >
                            🖩 Vypočítej BMI
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#080A1C",
        flex: 1,
        padding: '3%'
    },

    inner: {
        borderRadius: 20,
        backgroundColor: "rgba(74, 20, 140, 1)",
        flex: 1,
        padding: 10,
        ...Platform.OS === 'web' && { width: '60%', alignSelf: 'center'}
    },

    btn:{

    }
});

export default BmiCalculatorScreen