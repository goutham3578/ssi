import { View, Text, TouchableOpacity, TextInput, Dimensions, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ErrAndSucSt from '../components/falcon/ErrAndSucSt'
import InputField from '../components/falcon/InputField'
import  PhoneNumber  from '../components/falcon/PhoneNumber'
import { useNavigation } from '@react-navigation/native'
import { BUTTON_STYLE2 } from '../constants/fonts';
import { AuthenticateStackParams, Screens } from '../types/navigators'
import { StackNavigationProp } from '@react-navigation/stack'
import { useStore } from '../contexts/store'
import { useAuth } from '../contexts/auth'
import { DispatchAction } from '../contexts/reducers/store'

const PersonalInfoScreen = () => {
    const [store, dispatch] = useStore()
    const [phoneNumberValue, setPhoneNumberValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const navigation = useNavigation<StackNavigationProp<AuthenticateStackParams>>();
    const [biometryEnabled, setBiometryEnabled] = useState(store.preferences.useBiometry)
    const [continueEnabled, setContinueEnabled] = useState(true)

    const screenHeight = Math.round(Dimensions.get('window').height);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { isBiometricsActive, commitPIN, disableBiometrics } = useAuth()

    // const navigation = useNavigation();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    const handlePhoneNumberChange = (value) => {
        const cleanedNumber = value.replace(/\D/g, '');

        if (/^\d+$/.test(cleanedNumber)) {
            if (cleanedNumber.length === 10) {
                setPhoneNumberValue(cleanedNumber);
                setIsPhoneNumberValid(true);
            } else {
                setIsPhoneNumberValid(false);
            }
        }
    };

    const getFontSizem = () => {
        return screenHeight < 600 ? screenHeight * 0.015 : screenHeight * 0.025;
    };
    const getFontSizel = () => {
        return screenHeight < 600 ? screenHeight * 0.016 : screenHeight * 0.018;
    }

    const handleNameChange = (value) => {
        setNameValue(value);
    };
    const getFontSize = () => {
        return screenHeight < 600 ? screenHeight * 0.015 : screenHeight * 0.017;
    };
    const onSubmitPressed = async() => {
        setContinueEnabled(false)
    
        await commitPIN(biometryEnabled)
        dispatch({
          type: DispatchAction.DID_AGREE_TO_TERMS,
        })
        dispatch({
          type: DispatchAction.USE_BIOMETRY,
          payload: [biometryEnabled],
        })
    
        // navigation.navigate(Screens.CreatePIN)
        // navigation.navigate(Screens.UseBiometry)
      }


    return (
        <SafeAreaView >
            <View style={{width:'100%',height:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <View  style={{width:'100%',height:'85%',paddingTop:screenHeight<600?'10%':'30%', display:'flex',alignItems:'center'}}>
                    <Text style={{ fontSize: getFontSizem() ,fontWeight:'bold',marginBottom:'2%',color:'black'}}>Personal Information</Text>
                    <Text style={{ fontSize: getFontSizel(),alignSelf:'center',color:'#5F5F5F',marginBottom:'10%' }}>Personalise your wallet with your personal information.</Text>
                    <View  style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <TextInput style={{fontSize: getFontSize() ,width:'90%',marginHorizontal:'auto',height:'auto',backgroundColor:'white',color:'black',borderWidth:1,borderColor:isFocused?'#5869E6':'#B9B9B9',paddingHorizontal:15,paddingVertical:15,borderRadius:10,marginBottom:'2%'}} placeholder='Enter your name' placeholderTextColor={'grey'} onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)} onChangeText={handleNameChange} />
                    </View>

                    <PhoneNumber onPhoneNumberChange={handlePhoneNumberChange} />
                    <View  style={{width:'90%',marginHorizontal:'auto',marginTop:2}}>
                        {!isPhoneNumberValid && phoneNumberValue !== '' && (
                            <ErrAndSucSt message="Phone number is invalid" type="error" />
                        )}
                    </View>
                </View>
                {!isKeyboardVisible && (
                    <TouchableOpacity
                        style={{
                            height: '8%',
                            width: '90%',
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '7%',
                            padding: '2%',
                            backgroundColor: isPhoneNumberValid && nameValue.trim() !== '' ? '#5869E6' : '#CBCBCC', ...BUTTON_STYLE2
                        }}
                        disabled={!isPhoneNumberValid || nameValue.trim() === ''}
                        onPress={onSubmitPressed}
                    >
                        <Text  style={{ fontSize: getFontSizel(),color:isPhoneNumberValid && nameValue.trim()?'white':'#454545' }}>Confirm</Text>
                    </TouchableOpacity>
                )}


            </View>
        </SafeAreaView >
    )
}

export default PersonalInfoScreen