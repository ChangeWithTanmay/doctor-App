import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Send } from 'lucide-react-native';
import Header from '../../components/Header';
import { chatThreads, messages } from '../../data/chats';
import { format } from 'date-fns';

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const chatThread = chatThreads.find(chat => chat.id === id);
  const chatMessages = messages[id as string] || [];
  
  const [newMessage, setNewMessage] = useState('');
  
  if (!chatThread) {
    return (
      <View style={styles.container}>
        <Header title="Chat" showBack />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Chat not found</Text>
        </View>
      </View>
    );
  }

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    
    // In a real app, this would send the message to the server
    // and update the messages list
    setNewMessage('');
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isUser = item.senderId === 'user';
    
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessageContainer : styles.otherMessageContainer
      ]}>
        {!isUser && (
          <Image source={{ uri: chatThread.participantImage }} style={styles.avatar} />
        )}
        
        <View style={[
          styles.messageBubble,
          isUser ? styles.userMessageBubble : styles.otherMessageBubble
        ]}>
          <Text style={[
            styles.messageText,
            isUser ? styles.userMessageText : styles.otherMessageText
          ]}>
            {item.text}
          </Text>
          <Text style={[
            styles.messageTime,
            isUser ? styles.userMessageTime : styles.otherMessageTime
          ]}>
            {format(new Date(item.timestamp), 'h:mm a')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Header title={chatThread.participantName} showBack />
      
      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        inverted
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            newMessage.trim() === '' && styles.disabledSendButton
          ]}
          onPress={handleSend}
          disabled={newMessage.trim() === ''}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userMessageBubble: {
    backgroundColor: '#0066CC',
  },
  otherMessageBubble: {
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#333333',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherMessageTime: {
    color: '#8E8E93',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  disabledSendButton: {
    backgroundColor: '#0066CC80',
  },
});