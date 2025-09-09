import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';

const KanbanScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title="Kanban Board" subtitle="Mobile App Development" />
      <ScrollView style={styles.content}>
        <View style={styles.columnsContainer}>
          <Card style={[styles.column, {backgroundColor: '#E3F2FD'}]}>
            <Text style={styles.columnTitle}>To Do (3)</Text>
            <Card style={styles.taskCard}>
              <Text style={styles.taskTitle}>Design User Interface</Text>
              <Text style={styles.taskAssignee}>Assigned to: John</Text>
              <Text style={styles.taskPriority}>Priority: High</Text>
            </Card>
            <Card style={styles.taskCard}>
              <Text style={styles.taskTitle}>Write Documentation</Text>
              <Text style={styles.taskAssignee}>Assigned to: Sarah</Text>
              <Text style={styles.taskPriority}>Priority: Medium</Text>
            </Card>
          </Card>
          
          <Card style={[styles.column, {backgroundColor: '#FFF3E0'}]}>
            <Text style={styles.columnTitle}>In Progress (2)</Text>
            <Card style={styles.taskCard}>
              <Text style={styles.taskTitle}>API Integration</Text>
              <Text style={styles.taskAssignee}>Assigned to: Lisa</Text>
              <Text style={styles.taskPriority}>Priority: High</Text>
            </Card>
          </Card>
          
          <Card style={[styles.column, {backgroundColor: '#E8F5E8'}]}>
            <Text style={styles.columnTitle}>Done (2)</Text>
            <Card style={styles.taskCard}>
              <Text style={styles.taskTitle}>Project Setup</Text>
              <Text style={styles.taskAssignee}>Assigned to: John</Text>
              <Text style={styles.taskPriority}>Priority: Medium</Text>
            </Card>
          </Card>
        </View>
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
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    minHeight: 400,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
    textAlign: 'center',
  },
  taskCard: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  taskAssignee: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2,
  },
  taskPriority: {
    fontSize: 12,
    color: '#F44336',
    fontWeight: '500',
  },
});

export default KanbanScreen;

