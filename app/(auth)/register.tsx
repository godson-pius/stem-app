import {Alert, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {ChangeEvent, useState} from 'react'
import {defaultStyle} from '@/utils/defaultStyle'
import {useRouter} from 'expo-router'
import {addUserToDb} from "@/utils/firestore";
import {storeData} from "@/utils/storage";

const Register = () => {
    const navigation = useRouter()
    const [userData, setUserData] = useState({})

    const handleInput = (value: string, name: string) => {
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = async () => {
        if (Object.keys(userData).length === 4) {
            await storeData("userData", userData)
            return navigation.navigate('/second')
        }
        return Alert.alert("All fields should be filled.")
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('@/assets/images/logo.png')}/>
            <Text style={[defaultStyle.text, styles.title]}>Start Learning</Text>
            <Text style={defaultStyle.text}>Geanco Stems</Text>

            <View style={{marginTop: 60}}>
                <Text style={[defaultStyle.label]}>Enter username</Text>
                <TextInput autoCapitalize='none' autoCorrect={false} style={defaultStyle.input}
                           onChangeText={(value: string) => handleInput(value.toLowerCase(), "username")}/>
            </View>

            <View style={{marginTop: 30}}>
                <Text style={[defaultStyle.label]}>Enter email</Text>
                <TextInput autoCapitalize='none' autoCorrect={false} style={defaultStyle.input}
                           onChangeText={(value: string) => handleInput(value, "email")}/>
            </View>

            <View style={{marginTop: 30}}>
                <Text style={[defaultStyle.label]}>Enter phone number</Text>
                <TextInput autoCapitalize='none' autoCorrect={false} style={defaultStyle.input}
                           onChangeText={(value: string) => handleInput(value, "number")}/>
            </View>

            <View style={{marginTop: 30, marginBottom: 40}}>
                <Text style={[defaultStyle.label]}>Enter password</Text>
                <TextInput secureTextEntry={true} autoCapitalize='none' autoCorrect={false} style={defaultStyle.input}
                           onChangeText={(value: string) => handleInput(value, "password")}/>
            </View>

            <TouchableOpacity style={defaultStyle.button} onPress={handleSubmit}>
                <Text style={defaultStyle.buttonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity className={'font-medium mt-3'} onPress={() => navigation.push('/(auth)')}>
                <Text>Already registered? Login</Text>
            </TouchableOpacity>

            <Text style={[defaultStyle.text, {position: 'absolute', bottom: 50, color: 'gray'}]}>Secured by
                GeancoStem</Text>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ededee'
    },

    image: {
        width: 200,
        height: 200,
        marginTop: -10
    },

    title: {
        fontSize: 24,
        marginTop: -30,
        fontWeight: '500'
    }
})