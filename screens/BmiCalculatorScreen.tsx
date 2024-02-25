import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Text, StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle, TextStyle, Platform } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import GenderButtonSelect from '../components/GenderButtonSelect';
import SliderSelect from '../components/SliderSelect';
import { ScreenName } from '../types/ScreenName';
import { get_percentiles, compute_percentile_rank_upper_bound, PercentileRank } from '../data/percentiles';


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
        backgroundColor: isButtonDisabled() ? "rgba(237,17,101, 0.2)" : "rgba(237,17,101, 1)", // same colors, different opacities
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15
    }
    let btnTextStyle: StyleProp<TextStyle> = {
        color: "white",
        fontSize: 20,
        textTransform: 'uppercase',
        fontFamily: 'Dosis'
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
        let { weight, height, age, gender} = formState;

        if (weight && height && age && gender) {
            let heightMeters = height/100;
            const bmi: number = weight / (heightMeters * heightMeters);
            const bmiResult: string = bmi.toFixed(2);
            
            if (age <= 18) {
                console.log('Using percentile table for childrens and adolescents');
                console.log('Age:', age);
                console.log('Gender:', gender);
                
                const percentiles: number[][] = get_percentiles(gender);
                console.log('Percentiles for the given age are:', percentiles[age]);

                const percentile_rank_upper_bound: PercentileRank = compute_percentile_rank_upper_bound(bmi, percentiles[age]);
                console.log('The percentile rank (upper bound of the range) for this person is:', percentile_rank_upper_bound);

                navigation.navigate(ScreenName.BMI_RESULT_UNDERAGED, { percentile_rank_upper_bound: percentile_rank_upper_bound });
            } else {
                console.log('BMI:', bmiResult);
                navigation.navigate(ScreenName.BMI_RESULT_ADULT, { bmi: Number.parseInt(bmiResult) });
            }
        }
       
    };

    return(
        <MainLayout>
            <View style={styles.container}>
                
                {/** Inner Main container */}
                <View style={styles.inner}>

                    {/** Gender Button Group */}
                    <View style={{ gap: 10, flexDirection: 'row', marginVertical: '1%'}}>
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
                    <View style={{ marginTop: '2%', marginBottom: '1%' }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={btnStyle}
                            disabled={isButtonDisabled()}
                            onPress={calculateBmi}
                        >
                            <Text style={btnTextStyle} >
                            Vypočítej BMI
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
        backgroundColor: "#D6BCFA",
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '3%',
        width: window.innerWidth > 768 ? '50%' : '100%',
        alignSelf: 'center',
    },

    inner: {
        borderRadius: 20,
        backgroundColor: "#6D2B87",
        padding: 20,
     },

    btn:{

    }
});

export default BmiCalculatorScreen