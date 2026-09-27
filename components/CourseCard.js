import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

// Displays one course's attendance/marks summary.
// Advanced feature: when attendance is low, the badge gently pulses
// (opacity animation) to draw the user's eye without being distracting.
export default function CourseCard({ course }) {
  const isLow = course.attendance < 75;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isLow) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();

    // Stop the animation loop when this card unmounts or its
    // attendance value changes and is no longer "low".
    return () => loop.stop();
  }, [isLow]);

  return (
    <View style={styles.card}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseName}>{course.name}</Text>

        <Animated.View
          style={[
            isLow ? styles.lowBadge : styles.goodBadge,
            isLow && { opacity: pulseAnim },
          ]}
        >
          <Text style={styles.badgeText}>{isLow ? 'Low' : 'Good'}</Text>
        </Animated.View>
      </View>

      <Text style={styles.detailText}>Attendance: {course.attendance}%</Text>
      <Text style={styles.detailText}>Marks: {course.marks}%</Text>

      {isLow && (
        <Text style={styles.warning}>⚠ Attendance is below 75%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 17,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courseName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  goodBadge: {
    backgroundColor: '#DDF3E1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  lowBadge: {
    backgroundColor: '#FBE0E0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#444',
  },
  warning: {
    marginTop: 8,
    color: '#C0392B',
    fontWeight: 'bold',
    fontSize: 13,
  },
});