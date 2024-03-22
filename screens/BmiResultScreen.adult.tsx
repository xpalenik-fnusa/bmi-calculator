import ReactSpeedometer, { Transition } from "react-d3-speedometer"
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Text, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import { resultHash } from "../data/resultHash";

interface RootStackParamList extends ParamListBase{
    BmiResultScreen:{
        bmi: number;
    }
}

const BmiResultAdultScreen: React.FC<NativeStackScreenProps<ParamListBase>> = ({
    route, navigation
})=>{
    const BMI_MIN = 10;
    const BMI_MAX = 40;

    // Variables
    let params = route.params as any;
    let bmi = params?.bmi || (BMI_MIN + BMI_MAX)/2;
    bmi = bmi < BMI_MIN ? BMI_MIN : bmi;
    bmi = bmi > BMI_MAX ? BMI_MAX : bmi;

    // Helpers
    const getBmiDataKey: ()=> keyof typeof resultHash = ()=>{
        if (bmi < 18.5) {
            return 'Podváha'
        } else if (bmi < 24.9) {
            return 'Normální'
        } else if (bmi < 29.9) {
            return 'Nadváha'
        } else if (bmi < 200) {
            return 'Obezita'
        } else {
            return 'chyba'
        }
    }

    // Handlers
    const handleRecalculate = ()=>{
        navigation.goBack();
    }

    return(
        <MainLayout>
            <View style={styles.container}>
                
                {/** Inner Main container */}
                <View style={styles.inner}>

                    {/** Result view */}
                    <View style={{ alignSelf: 'center' }}>
                    <ReactSpeedometer
                        fluidWidth={false}
                        width={window.innerWidth > 768 ? 500 : window.innerWidth - 50}
                        minValue={BMI_MIN}
                        maxValue={BMI_MAX}
                        value={bmi}
                        needleColor="steelblue"
                        needleTransitionDuration={1200}
                        needleTransition={Transition.easeBounceIn}
                        segments={4}
                        customSegmentStops={[10, 18.5, 25, 30, 40]}
                        segmentColors={["#ebbf67", "#93be6f", "#d06f50", "#bf4450"]}
                        valueTextFontSize={'100px'}
                        needleHeightRatio={0.8}
                        labelFontSize={'30px'}
                        paddingHorizontal={17}
                        paddingVertical={17}
                    />
                    </View>

                    <Text style={styles.description} >
                        { resultHash[getBmiDataKey()].text }
                    </Text>

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
        flex: 1,
        paddingHorizontal: '3%',
        justifyContent: 'center',
        alignSelf: 'center',
        width: window.innerWidth > 768 ? '50%' : '100%',
    },

    inner: {
        padding: 20,
        borderWidth: 5,
        borderColor: "white",
        borderStyle: 'solid',
    },

    header:{
        color: 'rgb(102, 102, 102)',
        fontSize: 40,
        fontWeight: '600',
        alignSelf: 'center',
        paddingBottom: '4%',
        textTransform: 'uppercase',
        fontFamily: 'Dosis',
    },


    btnStyle: {
        backgroundColor: "rgba(237,17,101, 1)",
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15
    },

    btnTextStyle: {
        color: "white",
        fontSize: 20,
        textTransform: 'uppercase',
        fontFamily: 'Dosis',
    },

    description:{
        color: 'rgb(102, 102, 102)',
        fontSize: 28,
        letterSpacing: 0.75,
        marginVertical: '3%',
        textAlign: 'center',
        fontFamily: 'Dosis',
        fontWeight: "bold"
    },
});

export default BmiResultAdultScreen;