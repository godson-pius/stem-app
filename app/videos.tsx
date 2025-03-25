import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video'
import React, { useRef } from 'react'
import { defaultStyle } from '@/utils/defaultStyle'
import VideoItem from './components/VideoItem';

const videoSource = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const videos = () => {
    const ref = useRef(null)
    // const player = useVideoPlayer(videoSource, player => {
    //     player.loop = true;
    //     player.play();
    // })

    return (
        <SafeAreaView>
            <View style={defaultStyle.container}>
                <Text style={defaultStyle.textmedium}>Lectures</Text>
                <VideoItem />
            </View>
        </SafeAreaView>
    )
}

export default videos

const styles = StyleSheet.create({})