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
}

const SliderSelect: React.FC<SliderSelectProps> = ({
    label = 'Height', suffix = 'cm', minimum = 0, maximum = 300, onValueChange
})=>{

    // State
    const [displayValue, setDisplayValue] = React.useState<number>(minimum);

    // Handlers
    const handleChange = (value: number)=>{
        setDisplayValue(value);
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
                thumbTintColor="#D83456"
                step={1}
                minimumValue={ minimum }
                onValueChange={handleChange}
                maximumValue={ maximum }
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#888994"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#111426",
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: '1%'
        // flex: 1
    },

    label:{
        color: '#8E8E98',
        fontSize: 20,
        fontWeight: "600",
    },

    valueText:{
        color: "white",
        fontSize: 40,
        fontWeight: "600",
    }
})

export default SliderSelect;