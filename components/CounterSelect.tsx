import React, { useState } from 'react';
import { 
    View, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export interface CounterSelectProps{
    label?: string;
    suffix?: string;
    onValueChange?: (value: number)=> void;
    defaultValue?: number; 
}

const CounterSelect: React.FC<CounterSelectProps> = ({
    label = 'Weight', onValueChange, suffix, defaultValue = 0
})=>{

    // State
    const [displayValue, setDisplayValue] = React.useState<number>(defaultValue);

    // Handlers
    const handleAdd = ()=>{
        let newValue = displayValue + 1;
        onValueChange && onValueChange(newValue);
        setDisplayValue(newValue);
    }

    const handleSubtract = ()=>{
        if (displayValue > 0) {
            let newValue = displayValue - 1;
            onValueChange && onValueChange(newValue);
            setDisplayValue(newValue);
        }
    }

    // const calculateBmi = () => {
    //     const heightMeters = parseFloat(height) / 100;
    //     const weightKg = parseFloat(weight);
    //     const bmiResult = (weightKg / (heightMeters * heightMeters)).toFixed(2);
    //     setBmi(bmiResult);
    // };

    const [intervalId, setIntervalId] = useState<number | NodeJS.Timeout | null>(null);
    
    const updateValue = (delta: number) => {
        let newValue = displayValue + delta;
        setDisplayValue(prevDisplayValue => prevDisplayValue + delta);
        onValueChange && onValueChange(newValue);
    };

    const handlePressIn = (delta: number) => {
        updateValue(delta);

        setTimeout(() => {
            delta *= 3;
        }, 1000);

        intervalId && clearInterval(intervalId);
        const id = setInterval(() => {
            updateValue(delta);
        }, 200);
        setIntervalId(id);
    };

    const handlePressOut = () => {
        intervalId && clearInterval(intervalId);
    };

    return(
        <View style={[styles.container]}>

            <Text style={styles.label} >{ label.toUpperCase() }</Text>
            <Text style={styles.valueText}>
                { displayValue }
                <Text style={styles.label} > { suffix }</Text>
            </Text>

            <View style={styles.btnGroup}>
                <TouchableOpacity 
                    activeOpacity={0.5}
                    style={styles.btn}
                    onPressIn={() => handlePressIn(-1)}
                    onPressOut={handlePressOut}
                >
                    <AntDesign name="minus" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.btn}
                    onPressIn={() => handlePressIn(1)}
                    onPressOut={handlePressOut}
                >
                    <AntDesign name="plus" size={40} color="white" />
                </TouchableOpacity>
            </View>
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
        flex: 1
    },

    label:{
        color: '#8E8E98',
        fontSize: 20,
        fontWeight: "600",
    },

    valueText:{
        color: "white",
        fontSize: 60,
        fontWeight: "600",
        marginBottom: '5%'
    },

    btn:{
        backgroundColor: '#1D2032',
        borderRadius: 50,
        alignItems: 'center',
        padding: 10
    },

    btnGroup:{
        flexDirection: 'row',
        gap: 20
    }
})

export default CounterSelect;