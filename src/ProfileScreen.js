import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import defaultProfileImage from '../assets/defaultProfileImage.png'; // Ensure this path is correct

const ProfileScreen = ({ navigation, profileData }) => {
  const getRunningLevelText = (level) => {
    if (level === 0) return 'Beginner';
    if (level === 1) return 'Intermediate';
    return 'Advanced';
  };

  return (
    <View style={styles.container}>
      <Image
        source={profileData.profileImage ? { uri: profileData.profileImage } : defaultProfileImage}
        style={styles.profileImage}
      />

      {/* Edit Profile button above the name */}
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <Text style={styles.name}>{profileData.name || ''}</Text>

      {/* Displaying the running level */}
      <Text style={styles.runningLevel}>
        Running Level: {getRunningLevelText(profileData.runningLevel)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    marginBottom: 0,
  },
  runningLevel: {
    fontSize: 18,
    marginTop: 10,
    color: 'gray',
  },
  editButton: {
    backgroundColor: 'transparent',
    padding: 10,
    marginTop: -5,
  },
  editButtonText: {
    color: '#3A7BD5',
    fontSize: 16,
  },
});

export default ProfileScreen;
