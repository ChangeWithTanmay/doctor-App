import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChatThread } from '../types';
import { format, isToday, isYesterday } from 'date-fns';

interface ChatCardProps {
  chat: ChatThread;
}

export default function ChatCard({ chat }: ChatCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/chat/${chat.id}`);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MM/dd/yyyy');
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: chat.participantImage }} style={styles.avatar} />
        {chat.unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{chat.unreadCount}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{chat.participantName}</Text>
          <Text style={styles.time}>{formatTime(chat.lastMessageTime)}</Text>
        </View>
        <Text 
          style={[styles.message, chat.unreadCount > 0 && styles.unreadMessage]} 
          numberOfLines={1}
        >
          {chat.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  time: {
    fontSize: 14,
    color: '#8E8E93',
  },
  message: {
    fontSize: 14,
    color: '#666666',
  },
  unreadMessage: {
    fontWeight: '500',
    color: '#333333',
  },
});