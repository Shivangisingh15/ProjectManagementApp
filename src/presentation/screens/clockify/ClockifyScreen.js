 import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const ClockifyScreen = ({navigation}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

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
        Alert.alert('Time Logged', formatTime(elapsedTime) + ' has been saved!');
        setElapsedTime(0);
      }
    } else {
      setIsRunning(true);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Time Tracking" subtitle="Track your productivity" />
      <ScrollView style={styles.content}>
        <Card style={styles.timerCard}>
          <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
          <Text style={styles.timerStatus}>
            {isRunning ? 'Timer Running' : 'Timer Stopped'}
          </Text>
          <Text style={styles.taskDescription}>Working on: Design User Interface</Text>
          <Button
            title={isRunning ? 'Stop Timer' : 'Start Timer'}
            onPress={handleStartStop}
            variant={isRunning ? 'secondary' : 'primary'}
            style={styles.timerButton}
          />
        </Card>

        <Card style={styles.statsCard}>
          <Text style={styles.cardTitle}>Today's Summary</Text>
          <Text style={styles.statText}>Total Time: 6h 30m</Text>
          <Text style={styles.statText}>Tasks Completed: 3</Text>
          <Text style={styles.statText}>Current Project: Mobile App</Text>
        </Card>

        <Card style={styles.entriesCard}>
          <Text style={styles.cardTitle}>Recent Entries</Text>
          <View style={styles.entryItem}>
            <Text style={styles.entryTask}>Design User Interface</Text>
            <Text style={styles.entryTime}>2:30:00</Text>
          </View>
          <View style={styles.entryItem}>
            <Text style={styles.entryTask}>Code Review</Text>
            <Text style={styles.entryTime}>1:15:00</Text>
          </View>
          <View style={styles.entryItem}>
            <Text style={styles.entryTask}>Client Meeting</Text>
            <Text style={styles.entryTime}>0:45:00</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  timerCard: {
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  timerStatus: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: '#212121',
    marginBottom: 24,
    textAlign: 'center',
  },
  timerButton: {
    minWidth: 120,
  },
  statsCard: {
    padding: 16,
    marginBottom: 16,
  },
  entriesCard: {
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  statText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  entryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  entryTask: {
    fontSize: 14,
    color: '#212121',
    flex: 1,
  },
  entryTime: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});

export default ClockifyScreen;

