import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EditProfile = ({ navigation, profileData, updateProfile }) => {
  const [name, setName] = useState(profileData.name || '');
  const [profileImage, setProfileImage] = useState(profileData.profileImage);
  const [runningLevel, setRunningLevel] = useState(profileData.runningLevel || 0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const saveProfile = () => {
    updateProfile({ name, profileImage, runningLevel });
    navigation.navigate('Profile');
  };

  const getRunningLevelText = (value) => {
    if (value === 0) return 'Beginner';
    if (value === 1) return 'Intermediate';
    return 'Advanced';
  };

  return (
    <View style={styles.container}>
      <Image source={profileImage ? { uri: profileImage } : require('../assets/defaultProfileImage.png')} style={styles.profileImage} />

      <TouchableOpacity style={styles.editButton} onPress={pickImage}>
        <Text style={styles.editButtonText}>Edit Picture</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.sliderLabel}>Running Level: {getRunningLevelText(runningLevel)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2}
        step={1}
        value={runningLevel}
        onValueChange={(value) => setRunningLevel(value)}
        minimumTrackTintColor="black"
        maximumTrackTintColor="gray"
        thumbTintColor="black"
      />

      {/* Icons for running levels */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setRunningLevel(0)}>
          <MaterialIcons
            name="run-circle"
            size={40}
            color={runningLevel === 0 ? 'black' : 'gray'}  // Black when selected, gray otherwise
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRunningLevel(1)}>
          <MaterialIcons
            name="run-circle"
            size={40}
            color={runningLevel === 1 ? 'black' : 'gray'}  // Black when selected, gray otherwise
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRunningLevel(2)}>
          <MaterialIcons
            name="run-circle"
            size={40}
            color={runningLevel === 2 ? 'black' : 'gray'}  // Black when selected, gray otherwise
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 40,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: '80%',
    marginBottom: 20,
    borderRadius: 5,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: '80%',
    height: 40,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 30,
    width: '80%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: 'transparent',
    padding: 10,
    marginTop: -20,
  },
  editButtonText: {
    color: '#3A7BD5',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
    marginTop: -30,
  },
  icon: {
    padding: 10,
  },
});

export default EditProfile;
