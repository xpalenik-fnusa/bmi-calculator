import React from 'react';
import { 
    View, StyleSheet, Text
} from 'react-native';
import Slider from '@react-native-community/slider';

export interface SliderSelectProps{
    label?: string;
    suffix?: string;
    onValueChange?: (value: number)=> void;
    minimum?: number;
    maximum?: number;
    value?: number;
}

const SliderSelect: React.FC<SliderSelectProps> = ({
    label = 'Height', suffix = 'cm', minimum = 0, maximum = 300, value = minimum, onValueChange
})=>{

    // State
    const [displayValue, setDisplayValue] = React.useState<string | number>(label === 'Věk' ? '19+' : value.toString());

    // Handlers
    const handleChange = (value: number)=>{
        if (label === 'Věk' && value === maximum) {
            setDisplayValue('19+');
        } else {
            setDisplayValue(value);
        }
        onValueChange && onValueChange(value);
    }


    return(
        <View style={[styles.container]}>

            <Text style={styles.label} >{ label.toUpperCase() }</Text>
            <Text style={styles.valueText}>
                { displayValue }
                <Text style={styles.label} > { suffix }</Text>
            </Text>

            <Slider
                style={{width: '100%'}}
                thumbTintColor="white"
                step={1}
                minimumValue={ minimum }
                onValueChange={handleChange}
                maximumValue={ maximum }
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#888994"
                value={ value }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#6D2B87",
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: '1%'
        // flex: 1
    },

    label:{
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
        fontFamily: 'Dosis',
    },

    valueText:{
        color: "white",
        fontSize: 40,
        fontWeight: "600",
        fontFamily: 'Dosis',
    }
})

export default SliderSelect;