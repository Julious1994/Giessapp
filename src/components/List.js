import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ToolbarAndroid, FlatList} from 'react-native';


export const List = ({data, ...props}) => {
  const _keyExtractor = (item, index) => `${item[props.indexKey || 'id']}`;
  return (
    <FlatList
      contentInset={{ bottom: 20 }}
    
      data={data}
      renderItem={props.renderItem}
      keyExtractor={_keyExtractor}
    />
  )
}

export default List;

export const listStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#545454',
    borderBottomWidth: 0.5,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    marginTop: '1%',
  }
});
