import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const WorkspaceScreen = ({navigation}) => {
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Project Manager',
      email: 'john@techcorp.com',
      status: 'online',
      avatar: 'JS',
      lastActive: 'Active now',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      email: 'sarah@techcorp.com',
      status: 'online',
      avatar: 'SJ',
      lastActive: 'Active now',
    },
    {
      id: 3,
      name: 'Mike Wilson',
      role: 'Frontend Developer',
      email: 'mike@techcorp.com',
      status: 'away',
      avatar: 'MW',
      lastActive: '5 minutes ago',
    },
    {
      id: 4,
      name: 'Lisa Chen',
      role: 'Backend Developer',
      email: 'lisa@techcorp.com',
      status: 'offline',
      avatar: 'LC',
      lastActive: '2 hours ago',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#4CAF50';
      case 'away': return '#FF9800';
      case 'offline': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return '🟢';
      case 'away': return '🟡';
      case 'offline': return '⚫';
      default: return '⚫';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Simple Header */}
      <View style={styles.simpleHeader}>
        <Text style={styles.headerTitle}>My Workspace</Text>
        <Text style={styles.headerSubtitle}>TechCorp Solutions</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Workspace Overview */}
        <Card style={styles.overviewCard}>
          <Text style={styles.cardTitle}>🏢 Workspace Overview</Text>
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

        {/* Team Members */}
        <Card style={styles.membersCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.cardTitle}>👥 Team Members</Text>
            <TouchableOpacity onPress={() => Alert.alert('Invite Member', 'Member invitation will be implemented')}>
              <Text style={styles.inviteIcon}>➕</Text>
            </TouchableOpacity>
          </View>
          {teamMembers.map(member => (
            <View key={member.id} style={styles.memberItem}>
              <View style={styles.memberInfo}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.avatarText}>{member.avatar}</Text>
                  <Text style={[styles.statusIndicator, {color: getStatusColor(member.status)}]}>
                    {getStatusIcon(member.status)}
                  </Text>
                </View>
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                  <Text style={styles.memberEmail}>{member.email}</Text>
                </View>
              </View>
              <View style={styles.memberActions}>
                <Text style={styles.lastActive}>{member.lastActive}</Text>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>⋮</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Card>

        {/* Recent Activity */}
        <Card style={styles.activityCard}>
          <Text style={styles.cardTitle}>🔔 Recent Activity</Text>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>✅</Text>
            <Text style={styles.activityText}>
              <Text style={styles.activityUser}>Sarah Johnson</Text> completed "Design Homepage"
            </Text>
            <Text style={styles.activityTime}>2h ago</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>👋</Text>
            <Text style={styles.activityText}>
              <Text style={styles.activityUser}>Lisa Chen</Text> joined the workspace
            </Text>
            <Text style={styles.activityTime}>1d ago</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>📅</Text>
            <Text style={styles.activityText}>
              <Text style={styles.activityUser}>Tom Davis</Text> updated project timeline
            </Text>
            <Text style={styles.activityTime}>2d ago</Text>
          </View>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Text style={styles.cardTitle}>🚀 Quick Actions</Text>
          <Button
            title="📁 Create New Project"
            onPress={() => Alert.alert('Create Project', 'Project creation will be implemented')}
            style={styles.actionButtonFull}
          />
          <Button
            title="👥 Invite Team Member"
            onPress={() => Alert.alert('Invite', 'Team invitation will be implemented')}
            variant="secondary"
            style={styles.actionButtonFull}
          />
          <Button
            title="⚙️ Workspace Settings"
            onPress={() => Alert.alert('Settings', 'Settings will be implemented')}
            variant="outline"
            style={styles.actionButtonFull}
          />
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  inviteIcon: {
    fontSize: 20,
    color: '#2196F3',
  },
  overviewCard: {
    padding: 16,
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
    marginTop: 4,
  },
  membersCard: {
    padding: 16,
    marginBottom: 16,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  memberAvatar: {
    position: 'relative',
    marginRight: 12,
  },
  avatarText: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    fontSize: 14,
    color: '#212121',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    fontSize: 12,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '600',
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2,
  },
  memberEmail: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  memberActions: {
    alignItems: 'flex-end',
  },
  lastActive: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  actionButton: {
    padding: 4,
  },
  actionIcon: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  activityCard: {
    padding: 16,
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  activityIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: '#212121',
  },
  activityUser: {
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 12,
    color: '#9E9E9E',
    marginLeft: 8,
  },
  actionsCard: {
    padding: 16,
    marginBottom: 16,
  },
  actionButtonFull: {
    marginBottom: 12,
  },
});

export default WorkspaceScreen;