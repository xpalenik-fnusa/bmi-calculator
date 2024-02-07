import ReactSpeedometer, { Transition } from "react-d3-speedometer"
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Text, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import MainLayout from '../layouts/MainLayout';

interface RootStackParamList extends ParamListBase{
    BmiResultScreen:{
        bmi: number;
    }
}

const BmiResultWebSpeedometerScreen: React.FC<NativeStackScreenProps<ParamListBase>> = ({
    route, navigation
})=>{

    // Variables
    let params = route.params as any;
    let bmi = params?.bmi || 30;

    // Handlers
    const handleRecalculate = ()=>{
        navigation.goBack();
    }

    return(
        <MainLayout>
            <View style={styles.container}>
                
                {/** Inner Main container */}
                <View style={styles.inner}>
                    <Text style={styles.header} >Vaše BMI</Text>

                    {/** Result view */}
                    <View style={styles.result} >
                    <ReactSpeedometer
                        fluidWidth={false}
                        width={500}
                        minValue={10}
                        maxValue={40}
                        value={bmi}
                        needleColor="steelblue"
                        needleTransitionDuration={1200}
                        needleTransition={Transition.easeBounceIn}
                        segments={4}
                        customSegmentStops={[10, 18.5, 25, 30, 40]}
                        segmentColors={['#ebcb8b', '#a3be8c', '#d08770', '#bf616a'  ]}
                        valueTextFontSize={'130px'}
                        needleHeightRatio={0.8}
                        labelFontSize={'40px'}
                        paddingHorizontal={17}
                        paddingVertical={17}
                    />
                    </View>

                    {/** Button */}
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.btnStyle}
                            onPress={handleRecalculate}
                        >
                            <Text style={styles.btnTextStyle} >
                                Znovu vypočítat BMI
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
        paddingTop: '1%',
        paddingHorizontal: '3%'
    },

    inner: {
        backgroundColor: "#0A0C21",
        flex: 1,
        padding: 10,
        ...Platform.OS === 'web' && { width: '50%', alignSelf: 'center'}
    },

    header:{
        color: 'white',
        fontSize: 40,
        fontWeight: '600'
    },

    result:{
        backgroundColor: "#1D1F32",
        marginVertical: '5%',
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: '5%'
    },

    btnStyle: {
        backgroundColor: "#D83456",
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15
    },

    btnTextStyle: {
        color: "white",
        fontSize: 20,
        textTransform: 'uppercase'
    },
});

export default BmiResultWebSpeedometerScreen;