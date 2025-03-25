import { View, Text, SafeAreaView, TextInput, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { defaultStyle } from '@/utils/defaultStyle'
import { topicData } from '@/utils/fakeData'
import Topic from '../components/Topic'

interface Props {
  color: string, name: string
}

const lectures = () => {
  const topics = topicData
  return (
    <SafeAreaView>
      <View style={defaultStyle.container}>
        <Text style={[defaultStyle.text, { fontWeight: 'bold', fontSize: 20 }]}>English Language</Text>
        <Text style={[{ color: 'gray', marginTop: 5, fontFamily: 'epilogue-m' }]}>30 Topics</Text>

        <TextInput style={[defaultStyle.searchInput, { marginTop: 45, backgroundColor: '#fff' }]} placeholder='Search for a lesson or topic' />

        <Text style={{ fontFamily: 'epilogue-b', marginTop: 40, marginBottom: 15 }}>Topics</Text>

        <View>
          <FlatList
            data={topics}
            renderItem={({ item }) => <Topic topic={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            style={{ height: '100%' }}
          />
        </View>


      </View>
    </SafeAreaView>
  )
}

export default lectures