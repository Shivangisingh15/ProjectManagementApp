import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const AddTaskScreen = ({navigation, route}) => {
  const {editMode = false, taskData = {}, projectId, projectName} = route?.params || {};

  const [formData, setFormData] = useState({
    title: taskData.title || '',
    description: taskData.description || '',
    priority: taskData.priority || 'medium',
    status: taskData.status || 'todo',
    assignee: taskData.assignee || null,
    tags: taskData.tags || [],
    dueDate: taskData.dueDate || '',
    project: taskData.project || projectName || 'Mobile App Development',
  });

  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showAssigneePicker, setShowAssigneePicker] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');

  // Mock data
  const priorities = [
    {id: 'high', name: 'High Priority', icon: '🔥', color: '#F44336'},
    {id: 'medium', name: 'Medium Priority', icon: '⚡', color: '#FF9800'},
    {id: 'low', name: 'Low Priority', icon: '🌱', color: '#4CAF50'},
    {id: 'cool', name: 'Cool Priority', icon: '❄️', color: '#2196F3'},
  ];

  const statuses = [
    {id: 'todo', name: 'To Do', color: '#E3F2FD'},
    {id: 'in_progress', name: 'In Progress', color: '#FFF3E0'},
    {id: 'review', name: 'Review', color: '#F3E5F5'},
    {id: 'testing', name: 'Testing', color: '#E8F5E8'},
    // Note: 'done' is intentionally excluded based on requirement
  ];

  const teamMembers = [
    {id: 1, name: 'John Smith', avatar: 'JS', role: 'Project Manager'},
    {id: 2, name: 'Sarah Johnson', avatar: 'SJ', role: 'UI/UX Designer'},
    {id: 3, name: 'Mike Wilson', avatar: 'MW', role: 'Backend Developer'},
    {id: 4, name: 'Lisa Chen', avatar: 'LC', role: 'Frontend Developer'},
    {id: 5, name: 'Tom Davis', avatar: 'TD', role: 'QA Engineer'},
    {id: 6, name: 'Anna Brown', avatar: 'AB', role: 'DevOps Engineer'},
  ];

  const suggestedTags = ['Frontend', 'Backend', 'Design', 'Testing', 'Bug Fix', 'Feature', 'Documentation', 'Research'];

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert('Validation Error', 'Task title is required');
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert('Validation Error', 'Task description is required');
      return false;
    }
    if (!formData.assignee) {
      Alert.alert('Validation Error', 'Please assign the task to a team member');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const taskPayload = {
      ...formData,
      id: editMode ? taskData.id : Date.now(),
      createdAt: editMode ? taskData.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: editMode ? taskData.comments : 0,
      attachments: editMode ? taskData.attachments : 0,
    };

    // Here you would normally call your task service
    console.log('Saving task:', taskPayload);
    
    Alert.alert(
      editMode ? 'Task Updated' : 'Task Created',
      `"${formData.title}" has been ${editMode ? 'updated' : 'created'} successfully`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
    setNewTag('');
    setShowTagInput(false);
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const renderPriorityPicker = () => (
    <Modal visible={showPriorityPicker} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Priority</Text>
          {priorities.map(priority => (
            <TouchableOpacity
              key={priority.id}
              style={[styles.pickerItem, formData.priority === priority.id && styles.selectedItem]}
              onPress={() => {
                setFormData(prev => ({...prev, priority: priority.id}));
                setShowPriorityPicker(false);
              }}>
              <Text style={styles.pickerIcon}>{priority.icon}</Text>
              <Text style={styles.pickerText}>{priority.name}</Text>
              {formData.priority === priority.id && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
          ))}
          <Button title="Cancel" onPress={() => setShowPriorityPicker(false)} variant="secondary" />
        </View>
      </View>
    </Modal>
  );

  const renderStatusPicker = () => (
    <Modal visible={showStatusPicker} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Status</Text>
          {statuses.map(status => (
            <TouchableOpacity
              key={status.id}
              style={[styles.pickerItem, formData.status === status.id && styles.selectedItem]}
              onPress={() => {
                setFormData(prev => ({...prev, status: status.id}));
                setShowStatusPicker(false);
              }}>
              <View style={[styles.statusIndicator, {backgroundColor: status.color}]} />
              <Text style={styles.pickerText}>{status.name}</Text>
              {formData.status === status.id && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
          ))}
          <Button title="Cancel" onPress={() => setShowStatusPicker(false)} variant="secondary" />
        </View>
      </View>
    </Modal>
  );

  const renderAssigneePicker = () => (
    <Modal visible={showAssigneePicker} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Assign to Team Member</Text>
          <ScrollView style={styles.assigneeList}>
            {teamMembers.map(member => (
              <TouchableOpacity
                key={member.id}
                style={[styles.assigneeItem, formData.assignee?.id === member.id && styles.selectedItem]}
                onPress={() => {
                  setFormData(prev => ({...prev, assignee: member}));
                  setShowAssigneePicker(false);
                }}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberAvatarText}>{member.avatar}</Text>
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
                {formData.assignee?.id === member.id && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button title="Cancel" onPress={() => setShowAssigneePicker(false)} variant="secondary" />
        </View>
      </View>
    </Modal>
  );

  const renderTagInput = () => (
    <Modal visible={showTagInput} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Tag</Text>
          
          <TextInput
            style={styles.tagInput}
            placeholder="Enter tag name..."
            value={newTag}
            onChangeText={setNewTag}
            autoFocus
          />
          
          <Text style={styles.suggestedTitle}>Suggested Tags:</Text>
          <View style={styles.suggestedTags}>
            {suggestedTags.filter(tag => !formData.tags.includes(tag)).map(tag => (
              <TouchableOpacity
                key={tag}
                style={styles.suggestedTag}
                onPress={() => addTag(tag)}>
                <Text style={styles.suggestedTagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.tagModalActions}>
            <Button title="Add" onPress={() => addTag(newTag)} style={styles.tagModalButton} />
            <Button title="Cancel" onPress={() => {
              setNewTag('');
              setShowTagInput(false);
            }} variant="secondary" style={styles.tagModalButton} />
          </View>
        </View>
      </View>
    </Modal>
  );

  const selectedPriority = priorities.find(p => p.id === formData.priority);
  const selectedStatus = statuses.find(s => s.id === formData.status);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {editMode ? 'Edit Task' : 'Add New Task'}
        </Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Project Info */}
        <Card style={styles.projectCard}>
          <Text style={styles.projectLabel}>Project</Text>
          <Text style={styles.projectName}>{formData.project}</Text>
        </Card>

        {/* Task Title */}
        <Card style={styles.inputCard}>
          <Text style={styles.inputLabel}>Task Title *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter task title..."
            value={formData.title}
            onChangeText={(text) => setFormData(prev => ({...prev, title: text}))}
            multiline={false}
          />
        </Card>

        {/* Task Description */}
        <Card style={styles.inputCard}>
          <Text style={styles.inputLabel}>Description *</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Describe the task in detail..."
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({...prev, description: text}))}
            multiline={true}
            numberOfLines={4}
          />
        </Card>

        {/* Priority & Status Row */}
        <View style={styles.row}>
          <Card style={[styles.inputCard, styles.halfCard]}>
            <Text style={styles.inputLabel}>Priority</Text>
            <TouchableOpacity 
              style={styles.picker}
              onPress={() => setShowPriorityPicker(true)}>
              <Text style={styles.pickerIcon}>{selectedPriority?.icon}</Text>
              <Text style={styles.pickerValue}>{selectedPriority?.name}</Text>
            </TouchableOpacity>
          </Card>

          <Card style={[styles.inputCard, styles.halfCard]}>
            <Text style={styles.inputLabel}>Status</Text>
            <TouchableOpacity 
              style={styles.picker}
              onPress={() => setShowStatusPicker(true)}>
              <View style={[styles.statusDot, {backgroundColor: selectedStatus?.color}]} />
              <Text style={styles.pickerValue}>{selectedStatus?.name}</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Assignee */}
        <Card style={styles.inputCard}>
          <Text style={styles.inputLabel}>Assign To *</Text>
          <TouchableOpacity 
            style={styles.assigneePicker}
            onPress={() => setShowAssigneePicker(true)}>
            {formData.assignee ? (
              <View style={styles.selectedAssignee}>
                <View style={styles.assigneeAvatar}>
                  <Text style={styles.assigneeAvatarText}>{formData.assignee.avatar}</Text>
                </View>
                <View style={styles.assigneeDetails}>
                  <Text style={styles.assigneeName}>{formData.assignee.name}</Text>
                  <Text style={styles.assigneeRole}>{formData.assignee.role}</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.placeholderText}>Select team member...</Text>
            )}
          </TouchableOpacity>
        </Card>

        {/* Tags */}
        <Card style={styles.inputCard}>
          <View style={styles.tagHeader}>
            <Text style={styles.inputLabel}>Tags</Text>
            <TouchableOpacity onPress={() => setShowTagInput(true)}>
              <Text style={styles.addTagButton}>+ Add Tag</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tagsContainer}>
            {formData.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity onPress={() => removeTag(tag)}>
                  <Text style={styles.removeTag}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
            {formData.tags.length === 0 && (
              <Text style={styles.placeholderText}>No tags added</Text>
            )}
          </View>
        </Card>

        {/* Due Date */}
        <Card style={styles.inputCard}>
          <Text style={styles.inputLabel}>Due Date</Text>
          <TextInput
            style={styles.textInput}
            placeholder="YYYY-MM-DD"
            value={formData.dueDate}
            onChangeText={(text) => setFormData(prev => ({...prev, dueDate: text}))}
          />
        </Card>

        <View style={{height: 40}} />
      </ScrollView>

      {/* Modals */}
      {renderPriorityPicker()}
      {renderStatusPicker()}
      {renderAssigneePicker()}
      {renderTagInput()}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cancelButton: {
    fontSize: 16,
    color: '#757575',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  saveButton: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  projectCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#E3F2FD',
  },
  projectLabel: {
    fontSize: 12,
    color: '#1976D2',
    marginBottom: 4,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  inputCard: {
    padding: 16,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#212121',
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  halfCard: {
    flex: 1,
    marginHorizontal: 8,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FAFAFA',
  },
  pickerIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  pickerValue: {
    fontSize: 16,
    color: '#212121',
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  assigneePicker: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FAFAFA',
  },
  selectedAssignee: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assigneeAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  assigneeAvatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  assigneeDetails: {
    flex: 1,
  },
  assigneeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  assigneeRole: {
    fontSize: 12,
    color: '#757575',
  },
  placeholderText: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  tagHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addTagButton: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: 24,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 4,
  },
  removeTag: {
    fontSize: 14,
    color: '#9E9E9E',
    fontWeight: 'bold',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedItem: {
    backgroundColor: '#E3F2FD',
  },
  pickerText: {
    fontSize: 16,
    color: '#212121',
    flex: 1,
    marginLeft: 8,
  },
  checkMark: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  statusIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  assigneeList: {
    maxHeight: 300,
  },
  assigneeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  memberAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  memberRole: {
    fontSize: 12,
    color: '#757575',
  },
  tagInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  suggestedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  suggestedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  suggestedTag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  suggestedTagText: {
    fontSize: 12,
    color: '#757575',
  },
  tagModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagModalButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default AddTaskScreen;