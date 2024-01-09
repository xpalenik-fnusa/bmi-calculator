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
        color: 'white',
        fontSize: 24
    }

    return(
        <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.container, selected && styles.selectedContainer ]}
            onPress={onPress}
        >
            {
                gender === 'muž' ?
                <Ionicons name="male-outline" size={selected ? 85 : 75} color={selected ? 'white' : '#E8E8E8'} />
                :
                <Ionicons name="female-outline" size={selected ? 85 : 75} color={selected ? 'white' : '#E8E8E8'} />
            }
            <Text style={[styles.label, selected && selectedStyle]}>
                { adult ? gender.toUpperCase() : (gender === 'muž' ? 'CHLAPEC' : 'DÍVKA') }
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#702f8a",
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        flex: 1
    },
    
    selectedContainer: {
        backgroundColor: "rgba(110, 47, 138, 0.5)", // Decreased opacity for selected state
    },

    label:{
        color: '#E8E8E8',
        fontSize: 20,
        fontWeight: "600",
    }
})

export default GenderButtonSelect;