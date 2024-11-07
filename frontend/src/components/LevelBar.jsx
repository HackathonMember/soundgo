import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LevelBar = ({ level }) => {
  return (
    <View style={styles.profileSkillSection}>
      <Text style={styles.profileSkillLabel}>Skill Lv.6</Text>
      <View style={styles.skillBar}>
        <View style={styles.skillLevel} />
      </View>
    </View>
  );
};

export default LevelBar;
