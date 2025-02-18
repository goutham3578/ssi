import { View, Text, Image, TextInput, TouchableOpacity, Dimensions,Platform} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo  from './../../assets/icons/Logo.svg';
import Search from './../../assets/icons/Search.svg';


interface InputFieldProps {
    content: string;
    icon: any;
    type: any;
    source: any;
  }


const InputField: React.FC<InputFieldProps> =  ({ content, icon, type, source }) => {
    const [isActive, setIsActive] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const screenHeight = Math.round(Dimensions.get('window').height);
    const handlePress = () => {
        switch (type) {
            case "inputtype1":
                setIsActive(!isActive)
                break;
            default:
                break;

        }


    };
    const getFontSizel = () => {
        return screenHeight < 600 ? screenHeight * 0.016 : screenHeight * 0.018;
    }

    const styles = {
        inputtype1: {
            body: {
                width: '100%',
                paddingHorizontal: 16,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderRadius: 20,
                gap: 10,
                borderWidth: 1,
                borderColor: isActive ? "#5869E6" : '#CBCBCC',
                ...Platform.select({
                    ios: {
                        shadowColor: '#212228',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 12,
                    },
                    android: {
                        elevation: 4,
                    },
                }),
            },

            iconcolor: {
                tintColor: "#5869E6",
                paddingVertical: 12,

            }
        },

    };
    return (
        <TouchableOpacity activeOpacity={1} style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'white',width:'90%',borderRadius:15,borderWidth:1,marginBottom:'4%',paddingHorizontal:15,paddingVertical:2,borderColor:isFocused?'#5869E6':'#B9B9B9'}} 
         onPress={handlePress}>
            {icon && <Search style={{ marginRight: '2%' }} />}
            <TextInput
                style={{ fontSize: getFontSizel(), width: '90%', color: 'black'}}
                placeholder={content}
                placeholderTextColor={"#898A8E"}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </TouchableOpacity>

    )
}

export default InputField