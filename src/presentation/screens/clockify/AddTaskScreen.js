import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const AddTaskScreen = ({navigation}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [hours, setHours] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const projects = [
    'Mobile App Development',
    'E-commerce Website',
    'Internal Tools',
    'Marketing Campaign',
    'Client Consultation'
  ];

  const handleSaveTask = () => {
    if (!taskTitle.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }
    if (!hours.trim() || isNaN(parseFloat(hours))) {
      Alert.alert('Error', 'Please enter valid hours');
      return;
    }
    if (!selectedProject) {
      Alert.alert('Error', 'Please select a project');
      return;
    }

    // Here you would save the task to your state/database
    Alert.alert(
      'Task Saved!',
      `"${taskTitle}" has been added with ${hours} hours`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Task Entry</Text>
        <View style={styles.headerSpace} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.formCard}>
          <Input
            label="Task Title *"
            placeholder="What did you work on?"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />

          <Input
            label="Hours Worked *"
            placeholder="e.g., 2.5"
            value={hours}
            onChangeText={setHours}
            keyboardType="decimal-pad"
          />

          <View style={styles.projectSection}>
            <Text style={styles.projectLabel}>Project *</Text>
            <View style={styles.projectButtons}>
              {projects.map((proj, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.projectButton,
                    selectedProject === proj && styles.selectedProjectButton
                  ]}
                  onPress={() => setSelectedProject(proj)}>
                  <Text style={[
                    styles.projectButtonText,
                    selectedProject === proj && styles.selectedProjectButtonText
                  ]}>
                    {proj}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Input
            label="Description"
            placeholder="Describe what you accomplished..."
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
          />

          <View style={styles.formActions}>
            <Button
              title="Save Task"
              onPress={handleSaveTask}
              style={styles.saveButton}
            />
            <Button
              title="Cancel"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={styles.cancelButton}
            />
          </View>
        </Card>

        {/* Tips Card */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Tips</Text>
          <Text style={styles.tipsText}>
            • Be specific about what you accomplished{'\n'}
            • Round hours to nearest 0.25 (15 minutes){'\n'}
            • Include any challenges or blockers{'\n'}
            • Mention tools or technologies used
          </Text>
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
  header: {
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
    fontSize: 20,
    color: '#757575',
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  headerSpace: {
    width: 28,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  formCard: {
    padding: 20,
    marginBottom: 16,
  },
  projectSection: {
    marginBottom: 16,
  },
  projectLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 12,
  },
  projectButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  projectButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedProjectButton: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  projectButtonText: {
    fontSize: 12,
    color: '#757575',
  },
  selectedProjectButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  formActions: {
    marginTop: 20,
  },
  saveButton: {
    marginBottom: 12,
  },
  cancelButton: {
    marginBottom: 4,
  },
  tipsCard: {
    padding: 16,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
});

export default AddTaskScreen;