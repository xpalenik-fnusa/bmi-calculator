import React from 'react';
import { TouchableOpacity, StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface GenderButtonSelectProps{
    selected?: boolean;
    gender?: 'muž' | 'žena',
    adult?: boolean,
    onPress?: ()=> void;
}

const GenderButtonSelect: React.FC<GenderButtonSelectProps> = ({
    selected, gender = 'muž', onPress, adult = true
})=>{

    // Styles
    const selectedStyle: StyleProp<TextStyle> = {
        color: 'white'
    }

    return(
        <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.container]}
            onPress={onPress}
        >
            {
                gender === 'muž' ?
                <Ionicons name="male-outline" size={75} color={selected ? 'white' : '#8E8E98'} />
                :
                <Ionicons name="female-outline" size={75} color={selected ? 'white' : '#8E8E98'} />
            }
            <Text style={[styles.label, selected && selectedStyle]}>
                { adult ? gender.toUpperCase() : (gender === 'muž' ? 'CHLAPEC' : 'DÍVKA') }
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#1D1F32",
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
    }
})

export default GenderButtonSelect;