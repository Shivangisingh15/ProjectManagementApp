import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/common/Card';

const {width} = Dimensions.get('window');

const ClockifyScreen = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());
  const [streak, setStreak] = useState(12);

  // Mock data for today's entries with status
  const [todayEntries, setTodayEntries] = useState([
    {
      id: 1,
      title: 'UI/UX Design Review',
      project: 'Mobile App Development',
      hours: '2.5',
      description: 'Reviewed and updated user interface components, created new mockups for dashboard',
      addedAt: '09:00 AM',
      status: 'approved', // approved, pending, rejected
      reviewedBy: 'John Manager',
      reviewDate: '2 hours ago'
    },
    {
      id: 2,
      title: 'Client Meeting',
      project: 'E-commerce Website',
      hours: '1.0',
      description: 'Discussed project requirements and timeline with client stakeholders',
      addedAt: '11:30 AM',
      status: 'pending',
      reviewedBy: null,
      reviewDate: null
    },
    {
      id: 3,
      title: 'Code Review',
      project: 'Internal Tools',
      hours: '1.5',
      description: 'Reviewed pull requests and provided feedback on authentication module',
      addedAt: '02:15 PM',
      status: 'rejected',
      reviewedBy: 'Sarah Lead',
      reviewDate: '1 hour ago'
    }
  ]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get consecutive 5 days around current date
  const getConsecutiveDates = () => {
    const today = new Date();
    const currentDate = today.getDate();
    const dates = [];
    
    for (let i = -2; i <= 2; i++) {
      const date = new Date(today);
      date.setDate(currentDate + i);
      dates.push({
        date: date.getDate(),
        day: dayNames[date.getDay()],
        month: date.getMonth(),
        year: date.getFullYear(),
        isPast: i < 0,
        isToday: i === 0,
        isFuture: i > 0,
        fullDate: date
      });
    }
    
    return dates;
  };

  const consecutiveDates = getConsecutiveDates();

  const renderHorizontalCalendar = () => {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalCalendar}>
        {consecutiveDates.map((dateObj, index) => {
          const isSelected = dateObj.date === selectedDate;
          const isToday = dateObj.isToday;
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateButton,
                isToday && styles.todayButton,
                isSelected && styles.selectedButton,
              ]}
              onPress={() => setSelectedDate(dateObj.date)}>
              <Text style={[
                styles.dayLabel,
                isToday && styles.todayDayLabel,
                isSelected && styles.selectedDayLabel,
              ]}>
                {dateObj.day}
              </Text>
              <Text style={[
                styles.dateNumber,
                isToday && styles.todayDateNumber,
                isSelected && styles.selectedDateNumber,
              ]}>
                {dateObj.date}
              </Text>
              {!dateObj.isFuture && (
                <View style={[
                  styles.entryDot,
                  isSelected && styles.selectedEntryDot
                ]} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const calculateTotalHours = () => {
    return todayEntries.reduce((total, entry) => total + parseFloat(entry.hours), 0).toFixed(1);
  };

  const handleAddTask = () => {
    navigation.navigate('AddTaskScreen');
  };

  // Handle Edit Task
  const handleEditTask = (task) => {
    navigation.navigate('AddTaskScreen', { 
      editMode: true, 
      taskData: task 
    });
  };

  // Handle Delete Task
  const handleDeleteTask = (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task entry?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTodayEntries(todayEntries.filter(entry => entry.id !== taskId));
            Alert.alert('Success', 'Task entry deleted successfully');
          },
        },
      ]
    );
  };

  // Get status info
  const getStatusInfo = (status) => {
    switch (status) {
      case 'approved':
        return {
          icon: '✅',
          text: 'Approved',
          color: '#4CAF50',
          bgColor: '#E8F5E8'
        };
      case 'pending':
        return {
          icon: '⏳',
          text: 'Pending Review',
          color: '#FF9800',
          bgColor: '#FFF3E0'
        };
      case 'rejected':
        return {
          icon: '❌',
          text: 'Needs Revision',
          color: '#F44336',
          bgColor: '#FFEBEE'
        };
      default:
        return {
          icon: '⏳',
          text: 'Pending',
          color: '#9E9E9E',
          bgColor: '#F5F5F5'
        };
    }
  };

  const renderTaskEntry = (entry) => {
    const statusInfo = getStatusInfo(entry.status);
    
    return (
      <Card key={entry.id} style={styles.entryCard}>
        {/* Status Badge */}
        <View style={[styles.statusBadge, {backgroundColor: statusInfo.bgColor}]}>
          <Text style={styles.statusIcon}>{statusInfo.icon}</Text>
          <Text style={[styles.statusText, {color: statusInfo.color}]}>
            {statusInfo.text}
          </Text>
        </View>

        <View style={styles.entryHeader}>
          <View style={styles.entryTitle}>
            <Text style={styles.taskTitle}>{entry.title}</Text>
            <Text style={styles.projectName}>{entry.project}</Text>
          </View>
          <View style={styles.entryHours}>
            <Text style={styles.hoursText}>{entry.hours}h</Text>
            <Text style={styles.timeAdded}>{entry.addedAt}</Text>
          </View>
        </View>

        <Text style={styles.taskDescription}>{entry.description}</Text>

        {/* Review Info */}
        {entry.reviewedBy && (
          <View style={styles.reviewInfo}>
            <Text style={styles.reviewText}>
              Reviewed by <Text style={styles.reviewerName}>{entry.reviewedBy}</Text> • {entry.reviewDate}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.entryActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEditTask(entry)}>
            <Text style={styles.actionIcon}>✏️</Text>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeleteTask(entry.id)}>
            <Text style={styles.actionIcon}>🗑️</Text>
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
          {entry.status === 'rejected' && (
            <TouchableOpacity 
              style={styles.resubmitButton}
              onPress={() => handleEditTask(entry)}>
              <Text style={styles.resubmitIcon}>🔄</Text>
              <Text style={styles.resubmitText}>Revise</Text>
            </TouchableOpacity>
          )}
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Month/Year and Streak */}
        <View style={styles.topSection}>
          <View style={styles.monthYearContainer}>
            <Text style={styles.monthText}>{monthNames[currentMonth]}</Text>
            <Text style={styles.yearText}>{currentYear}</Text>
          </View>
          <TouchableOpacity style={styles.streakButton}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakNumber}>{streak}</Text>
            <Text style={styles.streakLabel}>day streak</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Calendar */}
        <Card style={styles.calendarCard}>
          {renderHorizontalCalendar()}
        </Card>

        {/* Add Task Button */}
        <Card style={styles.addTaskCard}>
          <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
            <Text style={styles.addTaskIcon}>➕</Text>
            <Text style={styles.addTaskText}>Add your task here</Text>
          </TouchableOpacity>
        </Card>

        {/* Daily Summary */}
        <Card style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>
              📅 {monthNames[currentMonth]} {selectedDate}, {currentYear}
            </Text>
            <Text style={styles.totalHours}>{calculateTotalHours()}h total</Text>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{todayEntries.length}</Text>
              <Text style={styles.summaryLabel}>Tasks</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{calculateTotalHours()}h</Text>
              <Text style={styles.summaryLabel}>Hours</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                {todayEntries.filter(e => e.status === 'approved').length}
              </Text>
              <Text style={styles.summaryLabel}>Approved</Text>
            </View>
          </View>
        </Card>

        {/* Today's Entries */}
        <View style={styles.entriesSection}>
          <Text style={styles.sectionTitle}>📋 Today's Entries</Text>
          {todayEntries.length > 0 ? (
            todayEntries.map(renderTaskEntry)
          ) : (
            <Card style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={styles.emptyTitle}>No entries yet</Text>
              <Text style={styles.emptySubtitle}>Add your first task to get started</Text>
            </Card>
          )}
        </View>

        {/* Status Legend */}
        <Card style={styles.legendCard}>
          <Text style={styles.legendTitle}>📊 Status Guide</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>✅</Text>
              <Text style={styles.legendText}>Approved by senior</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>⏳</Text>
              <Text style={styles.legendText}>Pending review</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>❌</Text>
              <Text style={styles.legendText}>Needs revision</Text>
            </View>
          </View>
        </Card>

        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthYearContainer: {
    flex: 1,
  },
  monthText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
  },
  yearText: {
    fontSize: 16,
    color: '#757575',
    marginTop: 2,
  },
  streakButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakIcon: {
    fontSize: 20,
  },
  streakNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 2,
  },
  streakLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  calendarCard: {
    paddingVertical: 16,
    marginBottom: 16,
  },
  horizontalCalendar: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    minWidth: width - 32,
  },
  dateButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 60,
    marginHorizontal: 4,
  },
  todayButton: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  selectedButton: {
    backgroundColor: '#2196F3',
  },
  dayLabel: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500',
    marginBottom: 4,
  },
  todayDayLabel: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  selectedDayLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dateNumber: {
    fontSize: 18,
    color: '#212121',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  todayDateNumber: {
    color: '#2196F3',
  },
  selectedDateNumber: {
    color: '#FFFFFF',
  },
  entryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
  },
  selectedEntryDot: {
    backgroundColor: '#FFFFFF',
  },
  addTaskCard: {
    marginBottom: 16,
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  addTaskIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  addTaskText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  summaryCard: {
    padding: 16,
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  totalHours: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  entriesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  entryCard: {
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingRight: 80, // Space for status badge
  },
  entryTitle: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  projectName: {
    fontSize: 12,
    color: '#757575',
  },
  entryHours: {
    alignItems: 'flex-end',
  },
  hoursText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  timeAdded: {
    fontSize: 10,
    color: '#9E9E9E',
    marginTop: 2,
  },
  taskDescription: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewInfo: {
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  reviewText: {
    fontSize: 12,
    color: '#757575',
  },
  reviewerName: {
    fontWeight: '600',
    color: '#212121',
  },
  entryActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    marginLeft: 8,
  },
  actionIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500',
  },
  resubmitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    marginLeft: 8,
  },
  resubmitIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  resubmitText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  legendCard: {
    padding: 16,
    marginBottom: 16,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#757575',
    flex: 1,
  },
});

export default ClockifyScreen;