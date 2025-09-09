 import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const WorkspaceScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title="My Workspace" subtitle="TechCorp Solutions" />
      <ScrollView style={styles.content}>
        <Card style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Workspace Overview</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Team Members</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Active Projects</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Open Tasks</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.membersCard}>
          <Text style={styles.cardTitle}>Team Members</Text>
          <View style={styles.memberItem}>
            <View style={styles.memberAvatar}>
              <Text style={styles.avatarText}>JS</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>John Smith</Text>
              <Text style={styles.memberRole}>Project Manager</Text>
            </View>
            <View style={styles.statusIndicator} />
          </View>
          
          <View style={styles.memberItem}>
            <View style={styles.memberAvatar}>
              <Text style={styles.avatarText}>SJ</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Sarah Johnson</Text>
              <Text style={styles.memberRole}>UI/UX Designer</Text>
            </View>
            <View style={styles.statusIndicator} />
          </View>
          
          <View style={styles.memberItem}>
            <View style={styles.memberAvatar}>
              <Text style={styles.avatarText}>MW</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Mike Wilson</Text>
              <Text style={styles.memberRole}>Frontend Developer</Text>
            </View>
            <View style={[styles.statusIndicator, {backgroundColor: '#FFC107'}]} />
          </View>
        </Card>

        <Card style={styles.activityCard}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <Text style={styles.activityText}>• Sarah completed "Design Homepage"</Text>
          <Text style={styles.activityText}>• Mike started "API Integration"</Text>
          <Text style={styles.activityText}>• Lisa joined the workspace</Text>
          <Text style={styles.activityText}>• Tom updated project timeline</Text>
        </Card>

        <Card style={styles.actionsCard}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <Button
            title="Invite Team Member"
            onPress={() => Alert.alert('Invite', 'Team invitation will be implemented')}
            style={styles.actionButton}
          />
          <Button
            title="Create New Project"
            onPress={() => Alert.alert('Create', 'Project creation will be implemented')}
            variant="secondary"
            style={styles.actionButton}
          />
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
  overviewCard: {
    padding: 16,
    marginBottom: 16,
  },
  membersCard: {
    padding: 16,
    marginBottom: 16,
  },
  activityCard: {
    padding: 16,
    marginBottom: 16,
  },
  actionsCard: {
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
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
    textAlign: 'center',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  memberRole: {
    fontSize: 12,
    color: '#757575',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  activityText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  actionButton: {
    marginBottom: 12,
  },
});

export default WorkspaceScreen;
