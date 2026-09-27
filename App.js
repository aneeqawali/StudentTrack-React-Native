import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

import StatCard from './components/StatCard';
import CourseCard from './components/CourseCard';
import initialCourses from './components/courses';

const screenWidth = Dimensions.get('window').width;

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const [courses, setCourses] = useState(initialCourses);

  const [searchText, setSearchText] = useState('');

  const [sortOrder, setSortOrder] = useState('none');

  const [courseName, setCourseName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [marks, setMarks] = useState('');
  const [error, setError] = useState('');

  const averageAttendance =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, course) => sum + course.attendance, 0) /
            courses.length
        )
      : 0;

  const averageMarks =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, course) => sum + course.marks, 0) /
            courses.length
        )
      : 0;

  const estimatedCGPA = (averageMarks / 25).toFixed(2);

  const lowAttendanceCount = courses.filter(
    course => course.attendance < 75
  ).length;

  // Search
  const searchedCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Apply sorting on top of the search results, without mutating
  // the original `courses` array (spread into a new array first).
  const displayedCourses = [...searchedCourses].sort((a, b) => {
    if (sortOrder === 'desc') return b.attendance - a.attendance;
    if (sortOrder === 'asc') return a.attendance - b.attendance;
    return 0; // 'none' -> keep original order
  });

  const cycleSortOrder = () => {
    setSortOrder(prev => {
      if (prev === 'none') return 'desc';
      if (prev === 'desc') return 'asc';
      return 'none';
    });
  };

  const sortLabel =
    sortOrder === 'desc'
      ? 'Sorted: High → Low ⬇'
      : sortOrder === 'asc'
      ? 'Sorted: Low → High ⬆'
      : 'Sort by Attendance';

  // Add course
  const addCourse = () => {
    setError('');

    if (courseName.trim() === '') {
      setError('Please enter a course name.');
      return;
    }

    const attendanceValue = Number(attendance);
    const marksValue = Number(marks);

    if (
      attendance === '' ||
      isNaN(attendanceValue) ||
      attendanceValue < 0 ||
      attendanceValue > 100
    ) {
      setError('Attendance must be between 0 and 100.');
      return;
    }

    if (
      marks === '' ||
      isNaN(marksValue) ||
      marksValue < 0 ||
      marksValue > 100
    ) {
      setError('Marks must be between 0 and 100.');
      return;
    }

    const newCourse = {
      name: courseName.trim(),
      attendance: attendanceValue,
      marks: marksValue,
    };

    setCourses([...courses, newCourse]);

    setCourseName('');
    setAttendance('');
    setMarks('');
    setError('');

    setCurrentView('courses');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HOME */}
        {currentView === 'home' && (
          <>
            <Text style={styles.appTitle}>StudentTrack</Text>
            <Text style={styles.subtitle}>
              Your academic progress, in one place.
            </Text>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>
                🎓 Stay on top of your semester
              </Text>
              <Text style={styles.infoText}>
                Track your courses, attendance and marks to understand your
                academic progress.
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Academic Overview</Text>

            <View style={styles.row}>
              <StatCard title="Courses" value={courses.length} />
              <StatCard title="Attendance" value={`${averageAttendance}%`} />
            </View>

            <View style={styles.row}>
              <StatCard title="Est. CGPA" value={estimatedCGPA} />
              <StatCard title="Low Attendance" value={lowAttendanceCount} />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={() => setCurrentView('courses')}
            >
              <Text style={styles.buttonText}>View My Courses</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.8}
              onPress={() => setCurrentView('dashboard')}
            >
              <Text style={styles.secondaryButtonText}>View Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.8}
              onPress={() => setCurrentView('add')}
            >
              <Text style={styles.secondaryButtonText}>+ Add New Course</Text>
            </TouchableOpacity>
          </>
        )}

        {/* COURSES */}
        {currentView === 'courses' && (
          <>
            <Text style={styles.pageTitle}>My Courses</Text>
            <Text style={styles.pageSubtitle}>
              Search, sort, and review your academic performance.
            </Text>

            <TextInput
              style={styles.searchInput}
              placeholder="🔍 Search course..."
              value={searchText}
              onChangeText={setSearchText}
            />

            <TouchableOpacity
              style={styles.sortButton}
              activeOpacity={0.8}
              onPress={cycleSortOrder}
            >
              <Text style={styles.sortButtonText}>{sortLabel}</Text>
            </TouchableOpacity>

            {displayedCourses.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No courses found</Text>
                <Text style={styles.emptyText}>
                  Try a different search term.
                </Text>
              </View>
            ) : (
              displayedCourses.map((course, index) => (
                <CourseCard key={course.name + index} course={course} />
              ))
            )}

            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={() => setCurrentView('add')}
            >
              <Text style={styles.buttonText}>+ Add Course</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={() => setCurrentView('home')}
            >
              <Text style={styles.backText}>← Back to Home</Text>
            </TouchableOpacity>
          </>
        )}

        {/* DASHBOARD */}
        {currentView === 'dashboard' && (
          <>
            <Text style={styles.pageTitle}>Dashboard</Text>
            <Text style={styles.pageSubtitle}>
              Visual overview of your academic performance.
            </Text>

            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Marks by Course</Text>
              <BarChart
                data={{
                  labels: courses.map(course => course.name.substring(0, 8)),
                  datasets: [{ data: courses.map(course => course.marks) }],
                }}
                width={screenWidth - 60}
                height={250}
                yAxisSuffix="%"
                fromZero={true}
                showValuesOnTopOfBars={true}
                chartConfig={{
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: opacity => `rgba(45, 95, 160, ${opacity})`,
                  labelColor: opacity => `rgba(50, 50, 50, ${opacity})`,
                  style: { borderRadius: 12 },
                }}
                style={styles.chart}
              />
            </View>

            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Attendance Overview</Text>
              <PieChart
                data={[
                  {
                    name: 'Good Attendance',
                    population: courses.filter(c => c.attendance >= 75)
                      .length,
                    color: '#4CAF50',
                    legendFontColor: '#333',
                    legendFontSize: 13,
                  },
                  {
                    name: 'Low Attendance',
                    population: courses.filter(c => c.attendance < 75).length,
                    color: '#E57373',
                    legendFontColor: '#333',
                    legendFontSize: 13,
                  },
                ]}
                width={screenWidth - 60}
                height={220}
                chartConfig={{ color: opacity => `rgba(0, 0, 0, ${opacity})` }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
              />
            </View>

            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={() => setCurrentView('home')}
            >
              <Text style={styles.backText}>← Back to Home</Text>
            </TouchableOpacity>
          </>
        )}

        {/* ADD COURSE */}
        {currentView === 'add' && (
          <>
            <Text style={styles.pageTitle}>Add New Course</Text>
            <Text style={styles.pageSubtitle}>
              Enter your course information below.
            </Text>

            <View style={styles.formCard}>
              <Text style={styles.inputLabel}>Course Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Database Systems"
                value={courseName}
                onChangeText={setCourseName}
              />

              <Text style={styles.inputLabel}>Attendance (%)</Text>
              <TextInput
                style={styles.input}
                placeholder="0 - 100"
                keyboardType="numeric"
                value={attendance}
                onChangeText={setAttendance}
              />

              <Text style={styles.inputLabel}>Marks (%)</Text>
              <TextInput
                style={styles.input}
                placeholder="0 - 100"
                keyboardType="numeric"
                value={marks}
                onChangeText={setMarks}
              />

              {error !== '' && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>⚠ {error}</Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.8}
                onPress={addCourse}
              >
                <Text style={styles.buttonText}>Add Course</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={() => setCurrentView('home')}
            >
              <Text style={styles.backText}>← Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB' },
  scrollContent: { padding: 20, paddingTop: 55, paddingBottom: 40 },
  appTitle: { fontSize: 34, fontWeight: 'bold', color: '#234E70', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 25 },
  pageTitle: { fontSize: 30, fontWeight: 'bold', color: '#234E70', marginBottom: 6 },
  pageSubtitle: { fontSize: 15, color: '#777', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  infoCard: { backgroundColor: '#E8F1F8', borderRadius: 16, padding: 18, marginBottom: 25 },
  infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#234E70', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#555', lineHeight: 21 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  primaryButton: { backgroundColor: '#234E70', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 15 },
  secondaryButton: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 12, borderWidth: 1, borderColor: '#D7DEE6' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  secondaryButtonText: { color: '#234E70', fontSize: 16, fontWeight: 'bold' },
  searchInput: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 15, fontSize: 15, borderWidth: 1, borderColor: '#D9E0E7', marginBottom: 12 },
  sortButton: { backgroundColor: '#EDF3F9', borderRadius: 12, padding: 12, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#D7DEE6' },
  sortButtonText: { color: '#234E70', fontSize: 14, fontWeight: 'bold' },
  emptyCard: { backgroundColor: '#FFFFFF', padding: 30, borderRadius: 15, alignItems: 'center', marginBottom: 15 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#444', marginBottom: 5 },
  emptyText: { color: '#777' },
  chartCard: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 15, marginBottom: 18, elevation: 2, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  chartTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  chart: { borderRadius: 12, marginLeft: -10 },
  formCard: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 18, elevation: 2, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 7, marginTop: 5 },
  input: { backgroundColor: '#F7F8FA', borderWidth: 1, borderColor: '#D9E0E7', borderRadius: 10, padding: 14, fontSize: 15, marginBottom: 14 },
  errorBox: { backgroundColor: '#FDECEC', padding: 12, borderRadius: 10, marginBottom: 5 },
  errorText: { color: '#C0392B', fontSize: 14, fontWeight: 'bold' },
  backButton: { alignItems: 'center', padding: 15, marginTop: 10 },
  backText: { color: '#234E70', fontSize: 15, fontWeight: 'bold' },
});