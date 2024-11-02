import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const API_URL = 'https://67100630a85f4164ef2cd231.mockapi.io/todo'; // URL của API

const Screen3 = ({ navigation, route }) => {
  const { userName, setTasks, fetchTasks } = route.params || {
    userName: 'User',
  };
  const [job, setJob] = useState('');

  const handleFinish = async () => {
    if (job.trim() === '') {
      Alert.alert('Error', 'Please enter a job description.');
      return;
    }

    try {
      // Thêm công việc mới vào API
      const response = await axios.post(API_URL, { title: job });
      // Cập nhật danh sách công việc
      setTasks((prevTasks) => [...prevTasks, response.data]);

      // Fetch lại danh sách công việc mới
      await fetchTasks();

      // Quay lại màn hình trước (Screen2)
      navigation.goBack();
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/snack-icon.png')} // Đường dẫn đến file ảnh đại diện trong dự án
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.greeting}>Hi Twinkle</Text>
          <Text style={styles.subGreeting}>Have a great day ahead</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>ADD YOUR JOB</Text>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/icon.png')} // Đường dẫn đến file icon trong dự án
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="input your job"
        />
      </View>

      {/* Finish Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>FINISH →</Text>
      </TouchableOpacity>

      {/* Note Image */}
      <Image
        source={require('../assets/Book.png')} // Đường dẫn đến file ảnh ghi chú trong dự án
        style={styles.noteImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreeting: {
    fontSize: 14,
    color: '#888',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '90%',
    marginBottom: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: '#00C2FF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noteImage: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginTop: 20,
  },
});

export default Screen3;
