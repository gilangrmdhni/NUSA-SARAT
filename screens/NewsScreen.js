import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { WebView } from 'react-native-webview';

const NewsDetail = ({ route }) => {
  const { news } = route.params;
  const [videoVisible, setVideoVisible] = useState(false);

  const toggleVideoVisibility = () => {
    setVideoVisible(!videoVisible);
  };

  // Mendapatkan ID video YouTube dari URL
  const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = url.match(regex);
    return match && match[1];
  };

  // Mendapatkan URL thumbnail dari ID video YouTube
  const getYouTubeThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  const videoId = getYouTubeVideoId(news.video_url);
  const thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId) : null;

  return (
    <ScrollView style={styles.container}>
      <Swiper
        style={styles.slider}
        showsButtons={true}
      >
        {/* Gunakan thumbnail langsung dari YouTube */}
        {thumbnailUrl && (
          <TouchableOpacity onPress={toggleVideoVisibility}>
            <View style={styles.videoContainer}>
              {!videoVisible && (
                <WebView
                  source={{ uri: thumbnailUrl }}
                  style={styles.videoThumbnail}
                />
              )}
              {videoVisible && (
                <WebView
                  source={{ uri: news.video_url }}
                  style={styles.webview}
                  mediaPlaybackRequiresUserAction={false}
                />
              )}
            </View>
          </TouchableOpacity>
        )}

        {/* Tampilkan gambar-gambar lain jika ada */}
        {news.images.map((images, index) => (
          <View key={index}>
            <Image source={{ uri: `https://api-nusa-sarat.nuncorp.id/storage/${images.image_url}` }} style={styles.image} />
          </View>
        ))}
      </Swiper>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.date}>{news.date}</Text>
        <Text style={styles.description}>{news.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: 200,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginTop: 16,
  },
  videoThumbnail: {
    ...StyleSheet.absoluteFillObject,
  },
  webview: {
    ...StyleSheet.absoluteFillObject,
    height:'100%',
  },
});

export default NewsDetail;
