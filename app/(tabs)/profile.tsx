import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { User, Settings, FileText, CreditCard, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import Header from '../../components/Header';
import { user } from '../../data/user';

export default function ProfileScreen() {
  const menuItems = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: <User size={24} color="#0066CC" />,
      screen: '/profile/personal'
    },
    {
      id: 'medical',
      title: 'Medical Records',
      icon: <FileText size={24} color="#34C759" />,
      screen: '/profile/medical-records'
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard size={24} color="#FF9500" />,
      screen: '/profile/payment'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings size={24} color="#8E8E93" />,
      screen: '/profile/settings'
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={24} color="#5856D6" />,
      screen: '/profile/help'
    }
  ];

  return (
    <View style={styles.container}>
      <Header title="Profile" showNotification />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: user.image }} style={styles.profileImage} />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
        
        <View style={styles.menuContainer}>
          {menuItems.map(item => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                {item.icon}
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666666',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: '#333333',
  },
  menuArrow: {
    fontSize: 20,
    color: '#8E8E93',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF3B30',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 40,
    fontSize: 14,
    color: '#8E8E93',
  },
});