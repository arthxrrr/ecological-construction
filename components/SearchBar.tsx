import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  onFilter?: () => void;
  onCancel?: () => void;
}

export const SearchBar = ({
  onSearch,
  placeholder = 'Pesquisar produtos...',
  onFilter,
  onCancel,
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleCancel = () => {
    setQuery('');
    setIsActive(false);
    onCancel?.();
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, isActive && styles.searchContainerActive]}>
        <Ionicons
          name="search"
          size={20}
          color="#9ca3af"
          style={styles.icon}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#d1d5db"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            onSearch(text);
          }}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons
              name="close-circle"
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        )}

        {onFilter && !query && (
          <TouchableOpacity onPress={onFilter} style={styles.filterButton}>
            <Ionicons
              name="funnel"
              size={20}
              color="#10b981"
            />
          </TouchableOpacity>
        )}
      </View>

      {isActive && onCancel && (
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons
            name="close"
            size={24}
            color="#10b981"
          />
        </TouchableOpacity>
      )}

      {query.length > 0 && !isActive && (
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchContainerActive: {
    borderColor: '#10b981',
    backgroundColor: '#ffffff',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
  },
  filterButton: {
    paddingLeft: 8,
  },
  searchButton: {
    backgroundColor: '#F57C00',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});