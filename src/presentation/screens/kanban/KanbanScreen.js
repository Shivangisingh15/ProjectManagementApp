import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
  Animated,
  PanResponder,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/common/Card';

const {width, height} = Dimensions.get('window');

const KanbanScreen = ({navigation}) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced drag & drop state
  const dragPosition = useRef(new Animated.ValueXY()).current;
  const dragScale = useRef(new Animated.Value(1)).current;
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  // Mock projects data
  const projects = [
    {
      id: 1,
      name: 'Mobile App Development',
      description: 'React Native project management app',
      progress: 75,
      totalTasks: 24,
      completedTasks: 18,
      team: [
        {id: 1, name: 'John Smith', avatar: 'JS', role: 'PM'},
        {id: 2, name: 'Sarah Johnson', avatar: 'SJ', role: 'Designer'},
        {id: 3, name: 'Mike Wilson', avatar: 'MW', role: 'Developer'},
        {id: 4, name: 'Lisa Chen', avatar: 'LC', role: 'Developer'},
      ],
      color: '#2196F3',
      deadline: '2024-03-15',
    },
    {
      id: 2,
      name: 'E-commerce Website',
      description: 'Online shopping platform with payment integration',
      progress: 45,
      totalTasks: 18,
      completedTasks: 8,
      team: [
        {id: 5, name: 'Tom Davis', avatar: 'TD', role: 'Developer'},
        {id: 6, name: 'Anna Brown', avatar: 'AB', role: 'Designer'},
        {id: 7, name: 'Chris Lee', avatar: 'CL', role: 'QA'},
      ],
      color: '#4CAF50',
      deadline: '2024-04-20',
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      description: 'Digital marketing strategy and content creation',
      progress: 90,
      totalTasks: 12,
      completedTasks: 11,
      team: [
        {id: 8, name: 'Emma Wilson', avatar: 'EW', role: 'Marketing'},
        {id: 9, name: 'David Miller', avatar: 'DM', role: 'Content'},
      ],
      color: '#FF9800',
      deadline: '2024-02-28',
    },
  ];

  // Enhanced kanban columns with restrictions
  const [kanbanColumns, setKanbanColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      color: '#E3F2FD',
      allowedPriorities: ['high', 'medium', 'low', 'cool'],
      tasks: [
        {
          id: 1,
          title: 'Design User Authentication Flow',
          description: 'Create wireframes and user flow for login/signup process',
          assignee: {name: 'Sarah Johnson', avatar: 'SJ'},
          priority: 'high',
          tags: ['Design', 'UI/UX'],
          dueDate: '2024-02-20',
          comments: 3,
          attachments: 2,
          estimatedHours: 8,
        },
        {
          id: 2,
          title: 'Setup CI/CD Pipeline',
          description: 'Configure automated testing and deployment workflow',
          assignee: {name: 'Mike Wilson', avatar: 'MW'},
          priority: 'medium',
          tags: ['DevOps', 'Automation'],
          dueDate: '2024-02-22',
          comments: 1,
          attachments: 0,
          estimatedHours: 6,
        },
        {
          id: 3,
          title: 'Database Schema Design',
          description: 'Design and document database structure for user data',
          assignee: {name: 'Lisa Chen', avatar: 'LC'},
          priority: 'low',
          tags: ['Backend', 'Database'],
          dueDate: '2024-02-25',
          comments: 0,
          attachments: 1,
          estimatedHours: 4,
        },
        {
          id: 10,
          title: 'Cool Feature Research',
          description: 'Research and prototype cool new features',
          assignee: {name: 'John Smith', avatar: 'JS'},
          priority: 'cool',
          tags: ['Research', 'Innovation'],
          dueDate: '2024-02-28',
          comments: 2,
          attachments: 0,
          estimatedHours: 12,
        },
      ],
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      color: '#FFF3E0',
      allowedPriorities: ['high', 'medium', 'low', 'cool'],
      tasks: [
        {
          id: 4,
          title: 'API Integration',
          description: 'Integrate REST APIs for user authentication and data management',
          assignee: {name: 'Mike Wilson', avatar: 'MW'},
          priority: 'high',
          tags: ['API', 'Backend'],
          dueDate: '2024-02-18',
          comments: 5,
          attachments: 3,
          estimatedHours: 10,
        },
        {
          id: 5,
          title: 'User Testing',
          description: 'Conduct usability testing with beta users',
          assignee: {name: 'John Smith', avatar: 'JS'},
          priority: 'medium',
          tags: ['Testing', 'UX'],
          dueDate: '2024-02-21',
          comments: 2,
          attachments: 1,
          estimatedHours: 5,
        },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      color: '#F3E5F5',
      allowedPriorities: ['high', 'medium', 'low'], // Cool priority not allowed in review
      tasks: [
        {
          id: 7,
          title: 'Code Review for Login Module',
          description: 'Review and approve login functionality implementation',
          assignee: {name: 'Mike Wilson', avatar: 'MW'},
          priority: 'high',
          tags: ['Review', 'Frontend'],
          dueDate: '2024-02-19',
          comments: 2,
          attachments: 1,
          estimatedHours: 3,
        },
      ],
    },
    {
      id: 'testing',
      title: 'Testing',
      color: '#E8F5E8',
      allowedPriorities: ['high', 'medium', 'low'], // Cool priority not allowed in testing
      tasks: [
        {
          id: 8,
          title: 'QA Testing Dashboard',
          description: 'Comprehensive testing of dashboard functionality',
          assignee: {name: 'Tom Davis', avatar: 'TD'},
          priority: 'medium',
          tags: ['QA', 'Testing'],
          dueDate: '2024-02-20',
          comments: 1,
          attachments: 0,
          estimatedHours: 8,
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      color: '#C8E6C9',
      allowedPriorities: ['high', 'medium', 'low'], // Cool priority CANNOT be moved to done
      tasks: [
        {
          id: 6,
          title: 'Project Setup and Architecture',
          description: 'Initialize React Native project with folder structure',
          assignee: {name: 'Mike Wilson', avatar: 'MW'},
          priority: 'high',
          tags: ['Setup', 'Architecture'],
          dueDate: '2024-02-15',
          comments: 4,
          attachments: 2,
          estimatedHours: 12,
        },
      ],
    },
  ]);

  // Filter options
  const filterOptions = [
    {id: 'all', label: 'All Tasks', icon: '📋'},
    {id: 'my_tasks', label: 'My Tasks', icon: '👤'},
    {id: 'high_priority', label: 'High Priority', icon: '🔥'},
    {id: 'due_soon', label: 'Due Soon', icon: '⏰'},
    {id: 'overdue', label: 'Overdue', icon: '🚨'},
  ];

  // Today's tasks for current user
  const todaysTasks = [
    {
      id: 101,
      title: 'Review API Documentation',
      project: 'Mobile App Development',
      priority: 'high',
      dueTime: '10:00 AM',
      status: 'todo',
    },
    {
      id: 102,
      title: 'Update User Interface Components',
      project: 'Mobile App Development',
      priority: 'medium',
      dueTime: '2:00 PM',
      status: 'in_progress',
    },
    {
      id: 103,
      title: 'Client Meeting Preparation',
      project: 'E-commerce Website',
      priority: 'high',
      dueTime: '4:00 PM',
      status: 'todo',
    },
  ];

  // Enhanced pan responder for smooth drag & drop
  const createPanResponder = (task, columnId) => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        setIsDragging(true);
        setDraggedTask({task, columnId});
        
        // Animate scale up
        Animated.spring(dragScale, {
          toValue: 1.1,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: (evt, gestureState) => {
        dragPosition.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
        
        // Check which column we're over
        const touchX = evt.nativeEvent.pageX;
        const columnWidth = width * 0.8;
        const columnIndex = Math.floor((touchX - 16) / (columnWidth + 16));
        
        if (columnIndex >= 0 && columnIndex < kanbanColumns.length) {
          const targetColumn = kanbanColumns[columnIndex];
          setDragOverColumn(targetColumn.id);
        } else {
          setDragOverColumn(null);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const touchX = evt.nativeEvent.pageX;
        const columnWidth = width * 0.8;
        const columnIndex = Math.floor((touchX - 16) / (columnWidth + 16));
        
        if (columnIndex >= 0 && columnIndex < kanbanColumns.length) {
          const targetColumn = kanbanColumns[columnIndex];
          if (targetColumn.id !== columnId) {
            moveTask(task.id, columnId, targetColumn.id);
          }
        }
        
        // Reset animations
        Animated.parallel([
          Animated.spring(dragPosition, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }),
          Animated.spring(dragScale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();
        
        setIsDragging(false);
        setDraggedTask(null);
        setDragOverColumn(null);
      },
    });
  };

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

  const canMoveTask = (task, fromColumn, toColumn) => {
    // Check if the target column allows this priority
    const targetCol = kanbanColumns.find(col => col.id === toColumn);
    if (!targetCol.allowedPriorities.includes(task.priority)) {
      return false;
    }
    
    // Special rule: Cool priority tasks cannot be moved to done
    if (task.priority === 'cool' && toColumn === 'done') {
      return false;
    }
    
    return true;
  };

  const moveTask = (taskId, fromColumn, toColumn) => {
    const newColumns = [...kanbanColumns];
    const fromCol = newColumns.find(col => col.id === fromColumn);
    const toCol = newColumns.find(col => col.id === toColumn);
    
    const taskIndex = fromCol.tasks.findIndex(task => task.id === taskId);
    const task = fromCol.tasks[taskIndex];
    
    // Check if move is allowed
    if (!canMoveTask(task, fromColumn, toColumn)) {
      let message = '';
      if (task.priority === 'cool' && toColumn === 'done') {
        message = 'Cool priority tasks cannot be marked as done! They\'re too cool to finish! 😎';
      } else {
        message = `${getPriorityIcon(task.priority)} ${task.priority} priority tasks cannot be moved to ${toCol.title}`;
      }
      
      Alert.alert('Move Restricted', message);
      return;
    }
    
    fromCol.tasks.splice(taskIndex, 1);
    toCol.tasks.push(task);
    
    setKanbanColumns(newColumns);
    
    Alert.alert('Task Moved', `"${task.title}" moved to ${toCol.title}`);
  };

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetailScreen', {task});
  };

  const handleAddTask = () => {
    navigation.navigate('AddTaskScreen', {
      projectId: selectedProject?.id,
      projectName: selectedProject?.name,
    });
  };

  // Filter tasks based on search and filter criteria
  const getFilteredTasks = (tasks) => {
    let filtered = tasks;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply selected filter
    switch (selectedFilter) {
      case 'my_tasks':
        // This would filter by current user in a real app
        filtered = filtered.filter(task => task.assignee.name === 'You');
        break;
      case 'high_priority':
        filtered = filtered.filter(task => task.priority === 'high');
        break;
      case 'due_soon':
        // Filter tasks due within 3 days
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
        filtered = filtered.filter(task => {
          const dueDate = new Date(task.dueDate);
          return dueDate <= threeDaysFromNow;
        });
        break;
      case 'overdue':
        const today = new Date();
        filtered = filtered.filter(task => {
          const dueDate = new Date(task.dueDate);
          return dueDate < today;
        });
        break;
    }
    
    return filtered;
  };

  const getTotalEstimatedHours = (tasks) => {
    return tasks.reduce((total, task) => total + (task.estimatedHours || 0), 0);
  };

  // Render project card
  const renderProjectCard = (project) => (
    <TouchableOpacity
      key={project.id}
      style={[styles.projectCard, {borderLeftColor: project.color}]}
      onPress={() => setSelectedProject(project)}>
      <View style={styles.projectCardHeader}>
        <Text style={styles.projectName}>{project.name}</Text>
        <Text style={styles.projectProgress}>{project.progress}%</Text>
      </View>
      <Text style={styles.projectDescription}>{project.description}</Text>
      
      <View style={styles.projectStats}>
        <Text style={styles.projectStat}>
          📋 {project.completedTasks}/{project.totalTasks} tasks
        </Text>
        <Text style={styles.projectStat}>
          📅 {project.deadline}
        </Text>
      </View>
      
      <View style={styles.teamAvatars}>
        {project.team.slice(0, 3).map((member, index) => (
          <View key={member.id} style={[styles.avatar, {marginLeft: index * -8}]}>
            <Text style={styles.avatarText}>{member.avatar}</Text>
          </View>
        ))}
        {project.team.length > 3 && (
          <View style={[styles.avatar, {marginLeft: -8, backgroundColor: '#757575'}]}>
            <Text style={styles.avatarText}>+{project.team.length - 3}</Text>
          </View>
        )}
      </View>
      
      <View style={[styles.progressBar, {backgroundColor: project.color + '20'}]}>
        <View style={[styles.progressFill, {
          backgroundColor: project.color,
          width: `${project.progress}%`
        }]} />
      </View>
    </TouchableOpacity>
  );

  // Render today's task
  const renderTodaysTask = (task) => (
    <Card key={task.id} style={styles.todayTaskCard}>
      <View style={styles.todayTaskHeader}>
        <View style={styles.todayTaskInfo}>
          <Text style={styles.todayTaskTitle}>{task.title}</Text>
          <Text style={styles.todayTaskProject}>{task.project}</Text>
        </View>
        <View style={styles.todayTaskMeta}>
          <Text style={styles.todayTaskTime}>{task.dueTime}</Text>
          <View style={[styles.priorityBadge, {backgroundColor: getPriorityColor(task.priority)}]}>
            <Text style={styles.priorityText}>{getPriorityIcon(task.priority)}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  // Enhanced kanban task with improved drag handling
  const renderKanbanTask = (task, columnId) => {
    const panResponder = createPanResponder(task, columnId);
    const isBeingDragged = draggedTask?.task.id === task.id;
    
    return (
      <Animated.View
        key={task.id}
        style={[
          styles.kanbanTaskCard,
          isBeingDragged && {
            transform: [
              {translateX: dragPosition.x},
              {translateY: dragPosition.y},
              {scale: dragScale}
            ],
            zIndex: 1000,
            elevation: 10,
          }
        ]}
        {...panResponder.panHandlers}>
        
        <TouchableOpacity
          style={styles.taskContent}
          onPress={() => handleTaskPress(task)}
          activeOpacity={0.8}>
          
          <View style={styles.taskHeader}>
            <View style={[styles.priorityIndicator, {backgroundColor: getPriorityColor(task.priority)}]} />
            <Text style={styles.taskTitle}>{task.title}</Text>
            {task.priority === 'cool' && <Text style={styles.coolBadge}>COOL</Text>}
          </View>
          
          <Text style={styles.taskDescription}>{task.description}</Text>
          
          <View style={styles.taskTags}>
            {task.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.taskMetaRow}>
            <Text style={styles.estimatedHours}>⏱️ {task.estimatedHours}h</Text>
            <Text style={styles.dueDate}>📅 {task.dueDate}</Text>
          </View>
          
          <View style={styles.taskFooter}>
            <View style={styles.taskAssignee}>
              <View style={styles.taskAvatar}>
                <Text style={styles.taskAvatarText}>{task.assignee.avatar}</Text>
              </View>
              <Text style={styles.assigneeName}>{task.assignee.name}</Text>
            </View>
            
            <View style={styles.taskMeta}>
              {task.comments > 0 && (
                <Text style={styles.metaItem}>💬 {task.comments}</Text>
              )}
              {task.attachments > 0 && (
                <Text style={styles.metaItem}>📎 {task.attachments}</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Enhanced kanban column with filtering and drag indicators
  const renderKanbanColumn = (column) => {
    const filteredTasks = getFilteredTasks(column.tasks);
    const totalHours = getTotalEstimatedHours(filteredTasks);
    const isDragTarget = dragOverColumn === column.id;
    
    return (
      <View key={column.id} style={[
        styles.kanbanColumn, 
        {backgroundColor: column.color},
        isDragTarget && styles.dragTargetColumn
      ]}>
        <View style={styles.columnHeader}>
          <View style={styles.columnTitleContainer}>
            <Text style={styles.columnTitle}>{column.title}</Text>
            <View style={styles.taskCount}>
              <Text style={styles.taskCountText}>{filteredTasks.length}</Text>
            </View>
          </View>
          <Text style={styles.columnHours}>⏱️ {totalHours}h</Text>
        </View>
        
        <ScrollView style={styles.columnContent} showsVerticalScrollIndicator={false}>
          {filteredTasks.map(task => renderKanbanTask(task, column.id))}
          
          <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
            <Text style={styles.addTaskIcon}>➕</Text>
            <Text style={styles.addTaskText}>Add Task</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Enhanced drop indicator */}
        {isDragging && draggedTask?.columnId !== column.id && (
          <View style={[
            styles.dropIndicator,
            canMoveTask(draggedTask.task, draggedTask.columnId, column.id) 
              ? styles.validDropIndicator 
              : styles.invalidDropIndicator
          ]}>
            <Text style={styles.dropIndicatorText}>
              {canMoveTask(draggedTask.task, draggedTask.columnId, column.id) 
                ? '✅ Drop here' 
                : '❌ Cannot drop'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  // Filter bar component
  const renderFilterBar = () => (
    <View style={styles.filterBar}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {filterOptions.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.activeFilterButton
            ]}
            onPress={() => setSelectedFilter(filter.id)}>
            <Text style={styles.filterIcon}>{filter.icon}</Text>
            <Text style={[
              styles.filterLabel,
              selectedFilter === filter.id && styles.activeFilterLabel
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  if (selectedProject) {
    // Show Enhanced Kanban Board for selected project
    return (
      <SafeAreaView style={styles.container}>
        {/* Enhanced Project Header */}
        <View style={styles.projectHeader}>
          <TouchableOpacity onPress={() => setSelectedProject(null)}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.projectInfo}>
            <Text style={styles.selectedProjectName}>{selectedProject.name}</Text>
            <Text style={styles.selectedProjectProgress}>{selectedProject.progress}% Complete</Text>
          </View>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
            <Text style={styles.filterToggle}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filter Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddTask}>
            <Text style={styles.addButtonText}>➕ Add</Text>
          </TouchableOpacity>
        </View>

        {showFilters && renderFilterBar()}

        {/* Kanban Board */}
        <ScrollView
          horizontal
          style={styles.kanbanContainer}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.kanbanContent}>
          {kanbanColumns.map(renderKanbanColumn)}
        </ScrollView>

        {/* Drag status indicator */}
        {isDragging && (
          <View style={styles.dragStatus}>
            <Text style={styles.dragStatusText}>
              Dragging: {draggedTask?.task.title}
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }

  // Show Project Selection View
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Project Board</Text>
          <Text style={styles.headerSubtitle}>Select a project to view tasks</Text>
        </View>

        {/* Recent Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📁 Recent Projects</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.projectsContainer}>
            {projects.map(renderProjectCard)}
          </ScrollView>
        </View>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Today's Tasks</Text>
          {todaysTasks.map(renderTodaysTask)}
        </View>

        {/* Quick Stats */}
        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>📊 Quick Overview</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{projects.length}</Text>
              <Text style={styles.statLabel}>Active Projects</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{todaysTasks.length}</Text>
              <Text style={styles.statLabel}>Today's Tasks</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {projects.reduce((sum, p) => sum + p.completedTasks, 0)}
              </Text>
              <Text style={styles.statLabel}>Completed Tasks</Text>
            </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#757575',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  projectsContainer: {
    paddingRight: 16,
  },
  projectCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    borderLeftWidth: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
  },
  projectProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
  projectDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
    marginBottom: 12,
  },
  projectStats: {
    marginBottom: 12,
  },
  projectStat: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  teamAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  todayTaskCard: {
    padding: 16,
    marginBottom: 12,
  },
  todayTaskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayTaskInfo: {
    flex: 1,
  },
  todayTaskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  todayTaskProject: {
    fontSize: 12,
    color: '#757575',
  },
  todayTaskMeta: {
    alignItems: 'flex-end',
  },
  todayTaskTime: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  priorityBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityText: {
    fontSize: 12,
  },
  statsCard: {
    padding: 16,
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
    textAlign: 'center',
  },
  // Enhanced Kanban Board Styles
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  projectInfo: {
    flex: 1,
    alignItems: 'center',
  },
  selectedProjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  selectedProjectProgress: {
    fontSize: 12,
    color: '#757575',
  },
  filterToggle: {
    fontSize: 20,
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: '#F8F9FA',
    marginRight: 12,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  filterBar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 8,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  activeFilterButton: {
    backgroundColor: '#E3F2FD',
  },
  filterIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  filterLabel: {
    fontSize: 12,
    color: '#757575',
  },
  activeFilterLabel: {
    color: '#1976D2',
    fontWeight: '600',
  },
  kanbanContainer: {
    flex: 1,
  },
  kanbanContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  kanbanColumn: {
    width: width * 0.8,
    marginRight: 16,
    borderRadius: 12,
    padding: 12,
    minHeight: 500,
  },
  dragTargetColumn: {
    borderWidth: 2,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
  },
  columnHeader: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  columnTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
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
    paddingVertical: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskCountText: {
    fontSize: 12,
    color: '#212121',
    fontWeight: '600',
  },
  columnHours: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500',
  },
  columnContent: {
    flex: 1,
  },
  kanbanTaskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    padding: 12,
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
    fontWeight: '600',
    color: '#212121',
    flex: 1,
    lineHeight: 18,
  },
  coolBadge: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    fontSize: 8,
    fontWeight: 'bold',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  taskDescription: {
    fontSize: 12,
    color: '#757575',
    lineHeight: 16,
    marginBottom: 8,
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
  taskMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  estimatedHours: {
    fontSize: 10,
    color: '#9E9E9E',
  },
  dueDate: {
    fontSize: 10,
    color: '#FF9800',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskAssignee: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  taskAvatarText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  assigneeName: {
    fontSize: 10,
    color: '#757575',
    flex: 1,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    fontSize: 10,
    color: '#9E9E9E',
    marginLeft: 8,
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
  dropIndicator: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  validDropIndicator: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderColor: '#4CAF50',
  },
  invalidDropIndicator: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    borderColor: '#F44336',
  },
  dropIndicatorText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  dragStatus: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dragStatusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default KanbanScreen;