 import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';

const DashboardScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title="Dashboard" subtitle="Welcome back!" />
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Project Overview</Text>
          <Text style={styles.cardText}>12 Active Projects</Text>
          <Text style={styles.cardText}>84 Completed Tasks</Text>
          <Text style={styles.cardText}>156 Hours Tracked</Text>
        </Card>
        
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Recent Activities</Text>
          <Text style={styles.cardText}>• John completed "Design Homepage"</Text>
          <Text style={styles.cardText}>• Sarah started "API Integration"</Text>
          <Text style={styles.cardText}>• Mike added "User Testing"</Text>
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
  card: {
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
});

export default DashboardScreen;
