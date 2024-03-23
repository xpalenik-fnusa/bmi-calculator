import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Text, StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import { resultHash } from "../data/resultHash";
import { PercentileRank } from 'data/percentiles';

interface RootStackParamList extends ParamListBase{
    PercentileRankResultScreen:{
        percentile_rank_upper_bound: PercentileRank;
    }
}

const BmiResultUnderagedScreen: React.FC<NativeStackScreenProps<ParamListBase>> = ({
    route, navigation
})=>{

    // Variables
    let params = route.params as any;
    let percentile_rank_upper_bound: PercentileRank = params?.percentile_rank_upper_bound;
    console.log("percentile_rank_upper_bound", percentile_rank_upper_bound);

    // Helpers
    const getBmiDataKey: ()=> keyof typeof resultHash = ()=>{
        
        // percentile_ranks = [3, 10, 25, 50, 75, 90, 97]

        if (percentile_rank_upper_bound === 100) {
            return 'obézní'
        } else if (percentile_rank_upper_bound === 97) {
            return 'nadměrná hmotnost'
        } else if (percentile_rank_upper_bound === 90) {
            return 'robustní'
        } else if (percentile_rank_upper_bound === 75) {
            return 'proporcionální'
        } else if (percentile_rank_upper_bound === 50) {
            return 'proporcionální'
        } else if (percentile_rank_upper_bound === 25) {
            return 'štíhlé'
        } else if (percentile_rank_upper_bound === 10) {
            return 'hubené'
        } else if (percentile_rank_upper_bound === 3) {
            return 'extrémně hubené'
        } else {
            return 'chyba'
        }
    }

    // Styles
    let rangeHeaderStyle: StyleProp<TextStyle> = {
        color: resultHash[getBmiDataKey()].color,
        fontSize: 34,
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 2,
        marginTop: '2%',
        fontFamily: 'Dosis',
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
                    <View style={styles.result} >
                        <Text style={styles.value} >{ resultHash[getBmiDataKey()].range }</Text>

                        <Text style={rangeHeaderStyle} >{ getBmiDataKey() }</Text>

                        <Text style={styles.description} >
                            { resultHash[getBmiDataKey()].text }
                        </Text>
                    </View>

                    {/** Button */}
                    <View style={{ marginTop: '5%' }}>
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

    result:{
        flex: 1,
        marginVertical: '0%',
        borderRadius: 8,
        alignItems: 'center',
        paddingTop: '5%',
        paddingBottom: '8%',
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

    value:{
        color: "#272727",
        fontSize: 70,
        fontWeight: '700',
        margin: '0%',
        fontFamily: 'Dosis',
    },

    rangeLabel:{
        color: '#8E8E98',
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 0.75
    },

    rangeText:{
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 0.75,
        marginTop: '3%'
    },

    description:{
        color: '#272727',
        fontSize: 28,
        letterSpacing: 0.75,
        marginTop: '3%',
        marginHorizontal: '6%',
        textAlign: 'center',
        fontFamily: 'Dosis',
        fontWeight: "bold"
    }
});

export default BmiResultUnderagedScreen;