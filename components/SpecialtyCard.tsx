import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, Brain, Stethoscope, Bone, Eye, Bluetooth as Tooth } from 'lucide-react-native';

interface SpecialtyCardProps {
  specialty: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
}

export default function SpecialtyCard({ specialty }: SpecialtyCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/search?specialty=${specialty.name}`);
  };

  const renderIcon = () => {
    const iconProps = { size: 24, color: specialty.color };
    
    switch (specialty.icon) {
      case 'heart':
        return <Heart {...iconProps} />;
      case 'brain':
        return <Brain {...iconProps} />;
      case 'stethoscope':
        return <Stethoscope {...iconProps} />;
      case 'bone':
        return <Bone {...iconProps} />;
      case 'eye':
        return <Eye {...iconProps} />;
      case 'tooth':
        return <Tooth {...iconProps} />;
      default:
        return <Stethoscope {...iconProps} />;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${specialty.color}20` }]}>
        {renderIcon()}
      </View>
      <Text style={styles.name}>{specialty.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    width: 100,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
});