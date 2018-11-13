import React, {Component} from 'react';
import {Platform, StyleSheet, View, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation';
import ActionButton from 'react-native-action-button';
import moment from 'moment';

export default class WorkItem extends Component {

  state = {
      workItems: [],
  }

  static navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item', {});
    const title = item.name || 'Work Section';
    return {
        title,
    };
  };

  componentDidMount() {
    Orientation.lockToLandscape();
    const { navigation } = this.props;
    const item = navigation.getParam('item', {});
    let counter = 1;
    const workItems = item.workItems || [];
    this.setState({ workItems });
    // if(item.sectionId) {
    //     workItems.forEach((element, i) => {
    //         element.id = `${item.sectionId}${counter}`;
    //         workItems[i] = {...element};
    //         counter++;
    //     });
    //     this.setState({ workItems });
    // }
  }

  componentWillUnmount() {
      Orientation.unlockAllOrientations();
  }

  async setCompletedStatus(workItem, status) {
    const { navigation } = this.props;
    const tour = navigation.getParam('tour', {});
    const db = navigation.getParam('db', {});
    const completedWorkItems = tour.completedWorkItems || []; 
    const hasItem = completedWorkItems.find(item => item.itemId === workItem.id);
    if(!hasItem) {
        const object = {
            itemId: workItem.id,
            completed: `${status}`,
            completedAt: moment().format("YYYY-MM-DD"),
        };
        completedWorkItems.push({...object});
        await tour.atomicSet('completedWorkItems', completedWorkItems);
    }
  }

  isCompleted(workItem) {
    const { navigation } = this.props;
    const tour = navigation.getParam('tour', {});  
    const completedWorkItems = tour.completedWorkItems || []; 
    const hasItem = completedWorkItems.find(item => item.itemId === workItem.id);
    return hasItem ? false : true;
  }

  render() {
    const { workItems } = this.state;
    return (
      <View style={styles.container}>
        {
            workItems.map((item, index) => (
                <ImageBackground
                    key={index}
                    style={styles.imageBackground}
                    source={{
                        uri: item.photoUrl,
                        cache: 'only-if-cached',
                    }}
                >
                    {
                        this.isCompleted(item) &&
                        <ActionButton
                            position="left"
                            buttonColor="rgba(51,51,255,0.8)"
                            size={75}
                            renderIcon={() => <Icon name="md-checkmark" color="white" size={30} />}
                            onPress={() => this.setCompletedStatus(item, true)}
                        />
                    }
                    {
                        this.isCompleted(item) &&
                        <ActionButton
                            position="center"
                            buttonColor="rgba(0,255,255,0.8)"
                            size={75}
                            renderIcon={() => <Icon name="md-close" color="white" size={30} />}
                            onPress={() => this.setCompletedStatus(item, false)}
                        />
                    }
                    <ActionButton
                        buttonColor="rgba(127,0,255,0.8)"
                        size={75}
                        renderIcon={() => <Icon name="md-text" color="white" size={30} />}
                        onPress={() => { console.log("hi")}}
                    />
                </ImageBackground>
            ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex', 
    flexDirection: 'row'
  },
  imageBackground: {
    flex: 1, 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems:'flex-end', 
    justifyContent: 'space-around',
    paddingBottom: 40,
    margin: 5,
  },
  itemContainer: {
    padding: 10,
  },
});
