import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const ClockifyScreen = ({navigation}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentTask, setCurrentTask] = useState('Design User Interface');

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hours.toString().padStart(2, '0') + ':' + 
           minutes.toString().padStart(2, '0') + ':' + 
           secs.toString().padStart(2, '0');
  };

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (elapsedTime > 0) {
        Alert.alert('Time Logged', formatTime(elapsedTime) + ' has been saved for "' + currentTask + '"');
        setElapsedTime(0);
      }
    } else {
      setIsRunning(true);
    }
  };

  const todayEntries = [
    {id: 1, task: 'Design User Interface', project: 'Mobile App Development', duration: '2:30:00', time: '09:00 - 11:30'},
    {id: 2, task: 'Code Review', project: 'Website Redesign', duration: '1:15:00', time: '13:00 - 14:15'},
    {id: 3, task: 'Client Meeting', project: 'Marketing Campaign', duration: '0:45:00', time: '15:00 - 15:45'},
  ];

  const weekStats = [
    {label: 'Today', hours: '6h 30m', color: '#2196F3'},
    {label: 'This Week', hours: '32h 15m', color: '#4CAF50'},
    {label: 'This Month', hours: '128h 45m', color: '#FF9800'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Simple Header */}
      <View style={styles.simpleHeader}>
        <Text style={styles.headerTitle}>Time Tracking</Text>
        <Text style={styles.headerSubtitle}>Track your productivity</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Timer Section */}
        <Card style={styles.timerCard}>
          <View style={styles.timerDisplay}>
            <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
            <Text style={styles.timerStatus}>
              {isRunning ? '⏱️ Timer Running' : '⏸️ Timer Stopped'}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.taskInput} onPress={() => Alert.alert('Edit Task', 'Task editing will be implemented')}>
            <Text style={styles.taskIcon}>📝</Text>
            <Text style={styles.taskText}>{currentTask}</Text>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
          
          <View style={styles.projectSelector}>
            <Text style={styles.projectIcon}>📁</Text>
            <Text style={styles.selectedProject}>Mobile App Development</Text>
            <Text style={styles.dropdownIcon}>⬇️</Text>
          </View>
          
          <View style={styles.timerControls}>
            <Button
              title={isRunning ? '⏹️ Stop' : '▶️ Start'}
              onPress={handleStartStop}
              variant={isRunning ? 'secondary' : 'primary'}
              style={styles.timerButton}
            />
            {elapsedTime > 0 && !isRunning && (
              <Button
                title="🔄 Reset"
                onPress={() => setElapsedTime(0)}
                variant="outline"
                style={styles.resetButton}
              />
            )}
          </View>
        </Card>

        {/* Stats Section */}
        <Card style={styles.statsCard}>
          <Text style={styles.sectionTitle}>📊 Statistics</Text>
          <View style={styles.statsContainer}>
            {weekStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={[styles.statHours, {color: stat.color}]}>{stat.hours}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Today's Entries */}
        <Card style={styles.entriesCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📋 Today's Entries</Text>
            <TouchableOpacity onPress={() => Alert.alert('View All', 'Full time report will be implemented')}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {todayEntries.map(entry => (
            <View key={entry.id} style={styles.entryItem}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTask}>{entry.task}</Text>
                <Text style={styles.entryDuration}>{entry.duration}</Text>
              </View>
              <View style={styles.entryDetails}>
                <Text style={styles.entryProject}>{entry.project}</Text>
                <Text style={styles.entryTime}>{entry.time}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>🚀 Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.actionIcon}>▶️</Text>
              <Text style={styles.actionText}>Start Last Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.actionIcon}>📈</Text>
              <Text style={styles.actionText}>Time History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionText}>Export Report</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  simpleHeader: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  timerCard: {
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  timerDisplay: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
    fontFamily: 'monospace',
  },
  timerStatus: {
    fontSize: 16,
    color: '#757575',
    marginTop: 8,
  },
  taskInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  taskIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#212121',
    flex: 1,
  },
  editIcon: {
    fontSize: 16,
  },
  projectSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  projectIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  selectedProject: {
    fontSize: 16,
    color: '#212121',
    flex: 1,
  },
  dropdownIcon: {
    fontSize: 16,
  },
  timerControls: {
    flexDirection: 'row',
    width: '100%',
  },
  timerButton: {
    flex: 1,
    marginRight: 8,
  },
  resetButton: {
    flex: 0.5,
  },
  statsCard: {
    padding: 16,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  statHours: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  entriesCard: {
    padding: 16,
    marginBottom: 16,
  },
  entryItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  entryTask: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '600',
    flex: 1,
  },
  entryDuration: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  entryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryProject: {
    fontSize: 12,
    color: '#757575',
  },
  entryTime: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  actionsCard: {
    padding: 16,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    minWidth: 80,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#212121',
    textAlign: 'center',
  },
});

export default ClockifyScreen;