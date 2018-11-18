import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import List, { listStyles } from '../components/List';
import { getData } from '../dbStore/asyncStorage';

export default class Section extends Component {
  static navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item', {});
    const title = item.name || 'Tour Section';
    return {
      title,
    };
  };

  state = {
    sectionList: {},
  }

  async componentDidMount() {
    // const { navigate, getParam } = this.props.navigation;
    // const tour = getParam('item', {});
    
    const list = await getData("workList") || [];
    // find work related to tour
    // ...

    this.setState({ sectionList: list });
  }

  renderSection = ({item, index}) => {
    const { navigate, getParam } = this.props.navigation;
    const tour = getParam('item', {});
    const db = getParam('db', {});
    return(
        <View style={listStyles.itemContainer} key={item.sectionId}>
            <View style={listStyles.leftContainer}>
                <Text>{item.name || item.sectionId}</Text>
                <Text>
                    {(item.workItems || []).length} Spots
                </Text>
            </View>
            <View style={listStyles.rightContainer}>
                <Button
                    onPress={() => navigate("WorkSection", { item, tour, db })}
                    title={"Go to"}
                    color="#841584"
                    accessibilityLabel="Go to work sections"
                />
            </View>
            
        </View>
    )
  }
  
  render() {
    const { navigation } = this.props;
    const { sectionList } = this.state;
    return (
      <View style={styles.container}>
        <List 
          indexKey="sectionId"
          data={sectionList}
          renderItem={this.renderSection}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
