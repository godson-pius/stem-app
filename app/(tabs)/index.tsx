import { defaultStyle } from '@/utils/defaultStyle';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useState } from 'react';
import Subjects from '../components/Subjects';
import { subjectData } from '@/utils/fakeData';

export default function HomeScreen() {
  const subjects = subjectData
  const bgimage = '@/assets/images/bgdesign.png'
  return (
    <SafeAreaView>
      <View>
        {/* Header */}
        <View style={[styles.container]}>
          <Text style={defaultStyle.text}>SS1</Text>
          <Ionicons name='notifications-outline' size={25} />
        </View>

        {/* Search */}
        <TextInput placeholder='What would you like to learn' style={styles.searchInput} />

        {/* Subjects */}
        <View style={styles.subjects}>
          {subjects.map((subject, index) => (
            <Subjects key={index} subject={subject} />
          ))}
        </View>

        {/* Banner for practice exams */}
        <View style={{ borderRadius: 30 }}>
          <ImageBackground source={{ uri: 'https://img.freepik.com/premium-photo/stepping-into-success-school-books-accessories-graduation-vibes-light-blue-3d-rendering_930407-5388.jpg?w=2000' }} resizeMode='cover' style={styles.practiceContainer}>
            <View style={styles.practice}>
              <Text style={[defaultStyle.text, styles.text]}>Practice exams for perfect grades. Practice makes perfect!</Text>
              <TouchableOpacity style={styles.practiceBtn}>
                <Text style={{ fontFamily: 'epilogue-m' }}>Practice Exams</Text>
              </TouchableOpacity>
            </View>
            {/* <Ionicons name='calendar-outline' size={80} style={{ marginLeft: -70 }} /> */}
          </ImageBackground>
        </View>
        
        {/* Banner for practice exams */}
        <View style={{ borderRadius: 30 }}>
          <ImageBackground source={{ uri: 'https://img.freepik.com/premium-photo/stepping-into-success-school-books-accessories-graduation-vibes-light-blue-3d-rendering_930407-5388.jpg?w=2000' }} resizeMode='cover' style={styles.practiceContainer}>
            <View style={styles.practice}>
              <Text style={[defaultStyle.text, styles.text]}>Take quiz for perfection. Practice makes perfect!</Text>
              <TouchableOpacity style={styles.practiceBtn}>
                <Text style={{ fontFamily: 'epilogue-m' }}>Take Quiz</Text>
              </TouchableOpacity>
            </View>
            {/* <Ionicons name='calendar-outline' size={80} style={{ marginLeft: -70 }} /> */}
          </ImageBackground>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 25,
  },

  searchInput: {
    borderWidth: 2,
    marginHorizontal: 25,
    marginTop: 20,
    padding: 13,
    borderRadius: 100,
    fontFamily: 'epilogue',
  },

  subjects: {
    marginTop: 20,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  practiceContainer: {
    borderRadius: 12,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    marginHorizontal: 25,
    marginTop: 30,
    padding: 20,
    height: 160,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  practice: {
    width: 200,
    // marginLeft: 30,
  },

  practiceBtn: {
    backgroundColor: '#fff',
    width: 150,
    padding: 14,
    borderRadius: 6,
    // position: 'absolute',
    // bottom: 0,
    marginTop: 13,
    alignItems: 'center',
  },

  text: {
    fontSize: 15,
    fontFamily: 'epilogue-m',
    color: '#000',
  }

});
