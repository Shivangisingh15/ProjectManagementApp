import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/common/Card';

const {width} = Dimensions.get('window');

const DashboardScreen = ({navigation}) => {
  const [stickyNotes, setStickyNotes] = useState([
    {id: 1, text: 'Call client at 3 PM', x: 50, y: 100, color: '#FFE082'},
    {id: 2, text: 'Review design mockups', x: 200, y: 150, color: '#A5D6A7'},
    {id: 3, text: 'Team meeting Friday', x: 80, y: 250, color: '#FFAB91'},
  ]);

  const [searchText, setSearchText] = useState('');

  const user = {
    name: 'John Smith',
    avatar: 'JS',
    greeting: 'Good morning! Ready to be productive?'
  };

  const stats = {
    totalHours: '156.5',
    todayHours: '6.5',
    projectsDone: 12,
    tasksToday: 8,
    weeklyHours: '32.5'
  };

  const kanbanSummary = {
    todo: 5,
    inProgress: 3,
    done: 12
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning!';
    if (hour < 17) return 'Good afternoon!';
    return 'Good evening!';
  };

  const renderStickyNote = (note) => (
    <View
      key={note.id}
      style={[
        styles.stickyNote,
        {
          backgroundColor: note.color,
          left: note.x,
          top: note.y,
        }
      ]}>
      <Text style={styles.stickyNoteText}>{note.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{user.avatar}</Text>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.greeting}>{getGreeting()}</Text>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
            />
            <Text style={styles.searchIcon}>🔍</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Time Tracking Summary */}
        <Card style={styles.timeCard}>
          <Text style={styles.cardTitle}>⏰ Time Tracking Summary</Text>
          <View style={styles.timeStats}>
            <View style={styles.timeStat}>
              <Text style={styles.timeNumber}>{stats.totalHours}h</Text>
              <Text style={styles.timeLabel}>Total Hours</Text>
            </View>
            <View style={styles.timeStat}>
              <Text style={styles.timeNumber}>{stats.todayHours}h</Text>
              <Text style={styles.timeLabel}>Today</Text>
            </View>
            <View style={styles.timeStat}>
              <Text style={styles.timeNumber}>{stats.weeklyHours}h</Text>
              <Text style={styles.timeLabel}>This Week</Text>
            </View>
          </View>
        </Card>

        {/* Kanban Summary */}
        <Card style={styles.kanbanCard}>
          <Text style={styles.cardTitle}>📋 Today's Tasks & Projects</Text>
          <View style={styles.kanbanSummary}>
            <View style={[styles.kanbanStat, {backgroundColor: '#E3F2FD'}]}>
              <Text style={styles.kanbanNumber}>{kanbanSummary.todo}</Text>
              <Text style={styles.kanbanLabel}>To Do</Text>
            </View>
            <View style={[styles.kanbanStat, {backgroundColor: '#FFF3E0'}]}>
              <Text style={styles.kanbanNumber}>{kanbanSummary.inProgress}</Text>
              <Text style={styles.kanbanLabel}>In Progress</Text>
            </View>
            <View style={[styles.kanbanStat, {backgroundColor: '#E8F5E8'}]}>
              <Text style={styles.kanbanNumber}>{kanbanSummary.done}</Text>
              <Text style={styles.kanbanLabel}>Completed</Text>
            </View>
          </View>
          <View style={styles.projectSummary}>
            <Text style={styles.projectText}>
              🎯 {stats.tasksToday} tasks to complete today
            </Text>
            <Text style={styles.projectText}>
              ✅ {stats.projectsDone} projects completed this month
            </Text>
          </View>
        </Card>

        {/* Weekly Stats */}
        <Card style={styles.weeklyCard}>
          <Text style={styles.cardTitle}>📊 Weekly Performance</Text>
          <View style={styles.weeklyStats}>
            <View style={styles.weeklyStat}>
              <Text style={styles.weeklyDay}>Mon</Text>
              <View style={[styles.weeklyBar, {height: 40}]} />
              <Text style={styles.weeklyHours}>6h</Text>
            </View>
            <View style={styles.weeklyStat}>
              <Text style={styles.weeklyDay}>Tue</Text>
              <View style={[styles.weeklyBar, {height: 50}]} />
              <Text style={styles.weeklyHours}>7.5h</Text>
            </View>
            <View style={styles.weeklyStat}>
              <Text style={styles.weeklyDay}>Wed</Text>
              <View style={[styles.weeklyBar, {height: 35}]} />
              <Text style={styles.weeklyHours}>5h</Text>
            </View>
            <View style={styles.weeklyStat}>
              <Text style={styles.weeklyDay}>Thu</Text>
              <View style={[styles.weeklyBar, {height: 45}]} />
              <Text style={styles.weeklyHours}>6.5h</Text>
            </View>
            <View style={styles.weeklyStat}>
              <Text style={styles.weeklyDay}>Fri</Text>
              <View style={[styles.weeklyBar, {height: 55}]} />
              <Text style={styles.weeklyHours}>8h</Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Text style={styles.cardTitle}>🚀 Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Kanban')}>
              <Text style={styles.actionIcon}>📋</Text>
              <Text style={styles.actionText}>View Kanban</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Clockify')}>
              <Text style={styles.actionIcon}>⏱️</Text>
              <Text style={styles.actionText}>Start Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Workspace')}>
              <Text style={styles.actionIcon}>👥</Text>
              <Text style={styles.actionText}>Team Chat</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={{height: 100}} />
      </ScrollView>

      {/* Sticky Notes Area */}
      <View style={styles.stickyNotesContainer}>
        {stickyNotes.map(renderStickyNote)}
        <TouchableOpacity 
          style={styles.addNoteButton}
          onPress={() => {
            const newNote = {
              id: Date.now(),
              text: 'New reminder...',
              x: Math.random() * (width - 120),
              y: Math.random() * 200 + 100,
              color: ['#FFE082', '#A5D6A7', '#FFAB91', '#F8BBD9'][Math.floor(Math.random() * 4)]
            };
            setStickyNotes([...stickyNotes, newNote]);
          }}>
          <Text style={styles.addNoteText}>+ Add Note</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  greetingContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  greeting: {
    fontSize: 12,
    color: '#757575',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    width: 120,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#212121',
  },
  searchIcon: {
    fontSize: 14,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#F44336',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  timeCard: {
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  timeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timeStat: {
    alignItems: 'center',
  },
  timeNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  timeLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  kanbanCard: {
    padding: 16,
    marginBottom: 16,
  },
  kanbanSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  kanbanStat: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  kanbanNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  kanbanLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  projectSummary: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
  },
  projectText: {
    fontSize: 14,
    color: '#212121',
    marginBottom: 4,
  },
  weeklyCard: {
    padding: 16,
    marginBottom: 16,
  },
  weeklyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 80,
  },
  weeklyStat: {
    alignItems: 'center',
  },
  weeklyDay: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  weeklyBar: {
    width: 20,
    backgroundColor: '#2196F3',
    borderRadius: 4,
    marginBottom: 4,
  },
  weeklyHours: {
    fontSize: 10,
    color: '#757575',
  },
  actionsCard: {
    padding: 16,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
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
  stickyNotesContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  stickyNote: {
    position: 'absolute',
    width: 100,
    height: 80,
    padding: 8,
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  stickyNoteText: {
    fontSize: 10,
    color: '#212121',
    textAlign: 'center',
  },
  addNoteButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addNoteText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;