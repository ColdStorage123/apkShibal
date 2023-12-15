import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Notification = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch and set notifications from your data source
    // You can filter and organize them into today and yesterday
    const todayNotifications = [
      { message: 'Notification 1', date: '2023-08-12T10:00:00' },
      { message: 'Notification 2', date: '2023-08-12T15:30:00' },
    ]; // Replace with your data
    const yesterdayNotifications = [
      { message: 'Notification 3', date: '2023-08-11T08:45:00' },
      { message: 'Notification 4', date: '2023-08-11T20:15:00' },
    ]; // Replace with your data
    setNotifications({ today: todayNotifications, yesterday: yesterdayNotifications });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Today</Text>
      <FlatList
        data={notifications.today}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
            <View style={styles.notificationContainer}>
              <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
              <Text style={styles.notificationText}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionHeader}>Yesterday</Text>
      <FlatList
        data={notifications.yesterday}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
            <View style={styles.notificationContainer}>
              <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
              <Text style={styles.notificationText}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  notificationContainer: {
    backgroundColor: '#ffffff', // Customize the background color
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  notificationDate: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  notificationText: {
    color: '#000',
    fontSize: 16,
  },
});

export default Notification;
