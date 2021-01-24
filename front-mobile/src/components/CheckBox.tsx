import React from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


type Props = {
    label: string;
    labelStyle: object;
    iconColor?: string;
    onChange: Function;
    value: boolean;
    checkColor?: string;
    backgroundColor?: string;
}

const CheckBox = ({ label, labelStyle, iconColor, onChange, value, checkColor }: Props) => {

    const handleChange = () => {
        if (onChange) {
            return onChange();
        }
    }

    return (
        <View style={styles.WrapperCheckBox}>

            <TouchableOpacity
                activeOpacity={0.8} 
                onPress={handleChange} 
                style={[styles.CheckBox, { borderColor: checkColor ? checkColor : 'black' }]}
            >
                {
                    value ? <Icon name="check"
                        style={{
                            fontSize: 16,
                            color: iconColor ? iconColor : 'black'
                        }}
                    /> : null
                }
            </TouchableOpacity>

            <Text style={[styles.LabelCheck, labelStyle]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    CheckBox: {
        width: 25,
        height: 25,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    WrapperCheckBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    LabelCheck: {
        color: 'black',
        marginLeft: 6
    }
});

export default CheckBox;
