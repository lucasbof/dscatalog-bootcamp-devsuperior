import React from 'react';
import { View, TextInput } from 'react-native';
import { theme } from '../styles';

type Props = {
    placeholder: string;
    search: string;
    setSearch: Function;
}

const SearchInput = ({ placeholder, search, setSearch }: Props) => {
    return (
        <View style={theme.inputContainer}>
            <TextInput 
                style={theme.searchInput} 
                placeholder={placeholder}
                value={search}
                onChangeText={text => setSearch(text)} 
            />
        </View>
    );
};

export default SearchInput;