import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header';
import ChatCard from '../../components/ChatCard';
import { chatThreads } from '../../data/chats';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Header title="Messages" showNotification />
      
      {chatThreads.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No messages yet</Text>
        </View>
      ) : (
        <FlatList
          data={chatThreads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatCard chat={item} />}
          contentContainerStyle={styles.chatList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
});