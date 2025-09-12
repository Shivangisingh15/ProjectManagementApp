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
import Button from '../../components/common/Button';

const {height} = Dimensions.get('window');

const TaskDetailScreen = ({navigation, route}) => {
  const task = route?.params?.task || {};
  const [newComment, setNewComment] = useState('');

  // Mock additional data
  const currentUser = {
    name: 'You',
    avatar: 'YU',
    role: 'Frontend Developer',
  };

  const projectInfo = {
    name: 'Mobile App Development',
    role: 'Frontend Developer',
    team: [
      {id: 1, name: 'John Smith', avatar: 'JS', role: 'Project Manager'},
      {id: 2, name: 'Sarah Johnson', avatar: 'SJ', role: 'UI/UX Designer'},
      {id: 3, name: 'Mike Wilson', avatar: 'MW', role: 'Backend Developer'},
      {id: 4, name: 'Lisa Chen', avatar: 'LC', role: 'Frontend Developer'},
      {id: 5, name: 'Tom Davis', avatar: 'TD', role: 'QA Engineer'},
    ],
  };

  const comments = [
    {
      id: 1,
      author: 'John Smith',
      avatar: 'JS',
      text: 'Great progress on the wireframes! The user flow looks intuitive.',
      time: '2 hours ago',
      role: 'Project Manager',
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      avatar: 'SJ',
      text: 'Should we consider adding dark mode support for this component?',
      time: '1 day ago',
      role: 'UI/UX Designer',
    },
    {
      id: 3,
      author: 'Mike Wilson',
      avatar: 'MW',
      text: 'I can help with the backend integration once the design is finalized.',
      time: '2 days ago',
      role: 'Backend Developer',
    },
  ];

  const timeSpent = [
    {date: '2024-02-15', hours: 2.5, description: 'Initial wireframe creation'},
    {date: '2024-02-16', hours: 3.0, description: 'User flow design and iteration'},
    {date: '2024-02-17', hours: 1.5, description: 'Design review and adjustments'},
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      case 'cool': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '🌱';
      case 'cool': return '❄️';
      default: return '⚪';
    }
  };

  const handleEditTask = () => {
    navigation.navigate('AddTaskScreen', {
      editMode: true,
      taskData: task,
    });
  };

  const handleNeedHelp = () => {
    Alert.alert(
      'Need Help?',
      'Choose how you want to get help with this task:',
      [
        {text: 'Message Team', onPress: () => Alert.alert('Feature Coming', 'Team messaging will be available soon')},
        {text: 'Schedule Meeting', onPress: () => Alert.alert('Feature Coming', 'Meeting scheduler will be available soon')},
        {text: 'Add Comment', onPress: () => Alert.alert('Feature Coming', 'Quick comment feature coming soon')},
        {text: 'Cancel', style: 'cancel'},
      ]
    );
  };

  const renderComment = (comment) => (
    <View key={comment.id} style={styles.comment}>
      <View style={styles.commentHeader}>
        <View style={styles.commentAuthor}>
          <View style={styles.commentAvatar}>
            <Text style={styles.commentAvatarText}>{comment.avatar}</Text>
          </View>
          <View style={styles.commentInfo}>
            <Text style={styles.commentName}>{comment.author}</Text>
            <Text style={styles.commentRole}>{comment.role}</Text>
          </View>
        </View>
        <Text style={styles.commentTime}>{comment.time}</Text>
      </View>
      <Text style={styles.commentText}>{comment.text}</Text>
    </View>
  );

  const renderTimeEntry = (entry, index) => (
    <View key={index} style={styles.timeEntry}>
      <Text style={styles.timeDate}>{entry.date}</Text>
      <Text style={styles.timeHours}>{entry.hours}h</Text>
      <Text style={styles.timeDescription}>{entry.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Task Details</Text>
          <TouchableOpacity onPress={handleEditTask}>
            <Text style={styles.editButton}>✏️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Project & Role Info */}
          <Card style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectName}>{projectInfo.name}</Text>
              <Text style={styles.userRole}>Your Role: {currentUser.role}</Text>
            </View>
            <View style={styles.teamInfo}>
              <View style={styles.teamAvatars}>
                {projectInfo.team.slice(0, 3).map((member, index) => (
                  <View key={member.id} style={[styles.teamAvatar, {marginLeft: index * -8}]}>
                    <Text style={styles.teamAvatarText}>{member.avatar}</Text>
                  </View>
                ))}
                {projectInfo.team.length > 3 && (
                  <View style={[styles.teamAvatar, {marginLeft: -8, backgroundColor: '#757575'}]}>
                    <Text style={styles.teamAvatarText}>+{projectInfo.team.length - 3}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.teamCount}>{projectInfo.team.length} team members</Text>
            </View>
          </Card>

          {/* Task Info */}
          <Card style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <View style={[styles.priorityBadge, {backgroundColor: getPriorityColor(task.priority)}]}>
                <Text style={styles.priorityIcon}>{getPriorityIcon(task.priority)}</Text>
                <Text style={styles.priorityText}>{task.priority}</Text>
              </View>
            </View>
            <Text style={styles.taskDescription}>{task.description}</Text>
            
            <View style={styles.taskMeta}>
              <Text style={styles.metaItem}>📅 Due: {task.dueDate}</Text>
              <Text style={styles.metaItem}>👤 Assigned: {task.assignee?.name}</Text>
              <Text style={styles.metaItem}>💬 {comments.length} comments</Text>
              <Text style={styles.metaItem}>📎 {task.attachments || 0} attachments</Text>
              {task.estimatedHours && (
                <Text style={styles.metaItem}>⏱️ Estimated: {task.estimatedHours}h</Text>
              )}
            </View>

            <View style={styles.taskTags}>
              {task.tags?.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Time Tracking */}
          <Card style={styles.timeCard}>
            <Text style={styles.sectionTitle}>⏰ Time Spent</Text>
            {timeSpent.map(renderTimeEntry)}
            <Text style={styles.totalTime}>
              Total: {timeSpent.reduce((sum, entry) => sum + entry.hours, 0)}h
            </Text>
          </Card>

          {/* Help Button */}
          <Card style={styles.helpCard}>
            <TouchableOpacity style={styles.helpButton} onPress={handleNeedHelp}>
              <Text style={styles.helpIcon}>🆘</Text>
              <View style={styles.helpContent}>
                <Text style={styles.helpTitle}>Need Help?</Text>
                <Text style={styles.helpSubtitle}>Get assistance from your team</Text>
              </View>
            </TouchableOpacity>
          </Card>

          {/* Comments */}
          <Card style={styles.commentsCard}>
            <Text style={styles.sectionTitle}>💬 Comments</Text>
            {comments.map(renderComment)}
            
            <TouchableOpacity style={styles.addCommentButton}>
              <Text style={styles.addCommentText}>💭 Add a comment...</Text>
            </TouchableOpacity>
          </Card>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Button
              title="🏃‍♂️ Start Working"
              onPress={() => Alert.alert('Started', 'Timer started for this task')}
              style={styles.actionButton}
            />
            <Button
              title="✅ Mark Complete"
              onPress={() => Alert.alert('Completed', 'Task marked as complete')}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>

          <View style={{height: 40}} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  safeArea: {
    backgroundColor: '#FAFAFA',
    height: height * 0.85,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  closeButton: {
    fontSize: 18,
    color: '#757575',
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  editButton: {
    fontSize: 18,
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  projectCard: {
    padding: 16,
    marginBottom: 16,
  },
  projectHeader: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  teamAvatarText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  teamCount: {
    fontSize: 12,
    color: '#757575',
  },
  taskCard: {
    padding: 16,
    marginBottom: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
    marginRight: 12,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  priorityText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  taskDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
    marginBottom: 16,
  },
  taskMeta: {
    marginBottom: 12,
  },
  metaItem: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  taskTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#757575',
  },
  timeCard: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  timeEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  timeDate: {
    fontSize: 12,
    color: '#757575',
    width: 80,
  },
  timeHours: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2196F3',
    width: 40,
  },
  timeDescription: {
    fontSize: 12,
    color: '#212121',
    flex: 1,
  },
  totalTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'right',
    marginTop: 8,
  },
  helpCard: {
    marginBottom: 16,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  helpIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 2,
  },
  helpSubtitle: {
    fontSize: 12,
    color: '#F57C00',
  },
  commentsCard: {
    padding: 16,
    marginBottom: 16,
  },
  comment: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  commentAvatarText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  commentInfo: {
    flex: 1,
  },
  commentName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#212121',
  },
  commentRole: {
    fontSize: 10,
    color: '#757575',
  },
  commentTime: {
    fontSize: 10,
    color: '#9E9E9E',
  },
  commentText: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 18,
  },
  addCommentButton: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  addCommentText: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default TaskDetailScreen;