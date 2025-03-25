import {View, Text, SafeAreaView, TextInput, FlatList, Dimensions, RefreshControl, Alert} from 'react-native'
import React, {useEffect, useState} from 'react'
import { defaultStyle } from '@/utils/defaultStyle'
import Topic from '@/components/Topic'
import {ISubject, ITopic} from "@/interface";
import {useLocalSearchParams} from "expo-router";
// @ts-ignore
import {getAllTopicsForACourse} from "@/utils/firestore";
import {tls} from "node-forge";

const lectures = () => {
  const [topics, setTopics] = useState<ITopic[]>([])
  const [refreshing, setRefreshing] = React.useState(false);
  const args = useLocalSearchParams();

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);
    try {
      await fetchTopics()
    } catch (e) {
      Alert.alert("Error fetching topics")
    } finally {
      setRefreshing(false);
    }
  }, []);

  const fetchTopics = async () => {
    if (Object.keys(args).length === 0) {
      return Alert.alert("Info", "Please select subject from home")
    }

    const courseDetails = {
      classname: 'ss2',
      name: args.name
    }
    const res = await getAllTopicsForACourse(courseDetails)
    console.log(res)
    if (res) {
      setTopics(res)
    } else {
      return null
    }
  }

  useEffect(() => {
    (async () => {
      await fetchTopics()
    })()
  }, [args.name]);


  return (
    <SafeAreaView>
      <View style={defaultStyle.container}>
        <Text style={[defaultStyle.text, { fontWeight: 'bold', fontSize: 20 }]}>{args.name}</Text>
        <Text style={[{ color: 'gray', marginTop: 5, fontFamily: 'epilogue-m' }]}>{topics.length} Topics</Text>

        <TextInput style={[defaultStyle.searchInput, { marginTop: 45, backgroundColor: '#fff' }]} placeholder='Search for a lesson or topic' />

        <Text style={{ fontFamily: 'epilogue-b', marginTop: 40, marginBottom: 15 }}>Topics</Text>

        <View className={'h-[33rem]'}>
          <FlatList
            data={topics}
            renderItem={({ item }) => <Topic course={args.name} topic={item} />}
            contentContainerStyle={{ paddingBottom: 10 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{ height: '100%' }}
          />
        </View>


      </View>
    </SafeAreaView>
  )
}

export default lectures