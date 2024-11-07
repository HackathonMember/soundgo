// import React from "react";
// import { StyleSheet, View, Text, SafeAreaView } from "react-native";

// const Profile = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>Profile</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#eee",
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
// });

// export default Profile;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.profileTitle}>profile</Text>
      <View style={styles.profileNameSection}>
        <Text style={styles.profileNameLabel}>Name</Text>
        <Text style={styles.profileName}>Nekon</Text>
      </View>
      <View style={styles.profileSkillSection}>
        <Text style={styles.profileSkillLabel}>Skill Lv.6</Text>
        <View style={styles.skillBar}>
          <View style={styles.skillLevel} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f4",
  },
  profileTitle: {
    fontSize: 18,
    color: "#2e4a67",
    marginBottom: 10,
  },
  profileNameSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileNameLabel: {
    fontSize: 16,
    color: "#2e4a67",
  },
  profileName: {
    fontSize: 20,
    color: "#2e4a67",
    fontWeight: "bold",
  },
  profileSkillSection: {
    alignItems: "center",
  },
  profileSkillLabel: {
    fontSize: 16,
    color: "#2e4a67",
    marginBottom: 10,
  },
  skillBar: {
    width: 300,
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    position: "relative",
  },
  skillLevel: {
    width: "80%", // 表示されている進捗率を調整
    height: "100%",
    backgroundColor: "#2e4a67",
    borderRadius: 5,
  },
});

export default ProfileCard;
