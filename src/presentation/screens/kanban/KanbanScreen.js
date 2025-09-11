import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/common/Card';

const {width} = Dimensions.get('window');

const KanbanScreen = ({navigation}) => {
  const [draggedTask, setDraggedTask] = useState(null);

  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      color: '#E3F2FD',
      tasks: [
        {id: 1, title: 'Design User Interface', assignee: 'John', priority: 'High', tags: ['Design', 'UI']},
        {id: 2, title: 'Write Documentation', assignee: 'Sarah', priority: 'Medium', tags: ['Docs']},
        {id: 3, title: 'Setup Testing Environment', assignee: 'Mike', priority: 'Low', tags: ['Testing']},
      ],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      color: '#FFF3E0',
      tasks: [
        {id: 4, title: 'API Integration', assignee: 'Lisa', priority: 'High', tags: ['API', 'Backend']},
        {id: 5, title: 'User Authentication', assignee: 'Tom', priority: 'High', tags: ['Auth', 'Security']},
      ],
    },
    {
      id: 'done',
      title: 'Done',
      color: '#E8F5E8',
      tasks: [
        {id: 6, title: 'Project Setup', assignee: 'John', priority: 'Medium', tags: ['Setup']},
        {id: 7, title: 'Database Schema', assignee: 'Sarah', priority: 'Medium', tags: ['Database']},
      ],
    },
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#F44336';
      case 'Medium': return '#FF9800';
      case 'Low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const moveTask = (taskId, fromColumn, toColumn) => {
    const newColumns = [...columns];
    const fromCol = newColumns.find(col => col.id === fromColumn);
    const toCol = newColumns.find(col => col.id === toColumn);
    
    const taskIndex = fromCol.tasks.findIndex(task => task.id === taskId);
    const task = fromCol.tasks[taskIndex];
    
    fromCol.tasks.splice(taskIndex, 1);
    toCol.tasks.push(task);
    
    setColumns(newColumns);
  };

  const renderTask = (task, columnId) => (
    <TouchableOpacity
      key={task.id}
      style={styles.taskCard}
      onPress={() => navigation.navigate('TaskDetails', {task})}
      onLongPress={() => setDraggedTask({task, columnId})}
      activeOpacity={0.8}>
      <View style={styles.taskHeader}>
        <View style={[styles.priorityIndicator, {backgroundColor: getPriorityColor(task.priority)}]} />
        <Text style={styles.taskTitle}>{task.title}</Text>
      </View>
      
      <View style={styles.taskTags}>
        {task.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.taskFooter}>
        <View style={styles.assignee}>
          <Text style={styles.assigneeIcon}>👤</Text>
          <Text style={styles.assigneeText}>{task.assignee}</Text>
        </View>
        <Text style={[styles.priority, {color: getPriorityColor(task.priority)}]}>
          {task.priority}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderColumn = (column) => (
    <View key={column.id} style={[styles.column, {backgroundColor: column.color}]}>
      <View style={styles.columnHeader}>
        <Text style={styles.columnTitle}>{column.title}</Text>
        <View style={styles.taskCount}>
          <Text style={styles.taskCountText}>{column.tasks.length}</Text>
        </View>
      </View>
      
      <ScrollView style={styles.columnContent} showsVerticalScrollIndicator={false}>
        {column.tasks.map(task => renderTask(task, column.id))}
        <TouchableOpacity style={styles.addTaskButton}>
          <Text style={styles.addTaskIcon}>➕</Text>
          <Text style={styles.addTaskText}>Add Task</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Drop Zone for Dragged Tasks */}
      {draggedTask && draggedTask.columnId !== column.id && (
        <TouchableOpacity
          style={styles.dropZone}
          onPress={() => {
            moveTask(draggedTask.task.id, draggedTask.columnId, column.id);
            setDraggedTask(null);
          }}>
          <Text style={styles.dropZoneText}>Drop here</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Simple Tab Header */}
      <View style={styles.simpleHeader}>
        <Text style={styles.headerTitle}>Kanban Board</Text>
        <Text style={styles.headerSubtitle}>Mobile App Development</Text>
      </View>

      <ScrollView
        horizontal
        style={styles.kanbanContainer}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.kanbanContent}>
        {columns.map(renderColumn)}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Text style={styles.fabIcon}>➕</Text>
      </TouchableOpacity>

      {/* Cancel Drag */}
      {draggedTask && (
        <TouchableOpacity 
          style={styles.cancelDrag}
          onPress={() => setDraggedTask(null)}>
          <Text style={styles.cancelText}>❌ Cancel</Text>
        </TouchableOpacity>
      )}
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
  kanbanContainer: {
    flex: 1,
  },
  kanbanContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  column: {
    width: width * 0.8,
    marginRight: 16,
    borderRadius: 8,
    padding: 12,
    minHeight: 400,
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  taskCount: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  taskCountText: {
    fontSize: 12,
    color: '#212121',
    fontWeight: '600',
  },
  columnContent: {
    flex: 1,
  },
  taskCard: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  priorityIndicator: {
    width: 4,
    height: 16,
    borderRadius: 2,
    marginRight: 8,
    marginTop: 2,
  },
  taskTitle: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '600',
    flex: 1,
  },
  taskTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#757575',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignee: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assigneeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  assigneeText: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  priority: {
    fontSize: 10,
    fontWeight: '600',
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    marginTop: 8,
  },
  addTaskIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  addTaskText: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  fabIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  dropZone: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
  },
  dropZoneText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  cancelDrag: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#F44336',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default KanbanScreen;