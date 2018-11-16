import React, {Component} from 'react';
import {Platform, StyleSheet, View, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation';
import ActionButton from 'react-native-action-button';
import { CachedImage } from 'react-native-cached-image';
import moment from 'moment';

const dummyItems = [
    {id: '888-555-555', photoUrl: 'https://www.keralatourism.org/images/picture/categoryimages/vertical/others20131028124330.jpg'},
    {id: '898-355-155', photoUrl: 'https://www.keralatourism.org/images/picture/categoryimages/vertical/forts20131028124238.jpg'},
    {id: '823-565-355', photoUrl: 'https://www.keralatourism.org/images/picture/categoryimages/vertical/picnic_spots20131028124405.jpg'},
    {id: '189-568-458', photoUrl: 'https://www.keralatourism.org/images/picture/categoryimages/vertical/places_of_interest20131028124431.jpg'},
]

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
    const { navigation } = this.props;
    const item = navigation.getParam('item', {});

    Orientation.lockToLandscape();

    let workItems = item.workItems || [];
    // workItems = [...workItems, ...dummyItems];
    workItems = workItems.filter(item => !this.isCompleted(item))
    
    this.setState({ workItems });
  }

  componentWillUnmount() {
      Orientation.unlockAllOrientations();
  }

  async setCompletedStatus(workItem, status, index) {
    const { navigation } = this.props;
    const { workItems } = this.state;
    const tour = navigation.getParam('tour', {});
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
    workItems.splice(index, 1);
    this.setState({ workItems });
  }

  isCompleted(workItem) {
    const { navigation } = this.props;
    const tour = navigation.getParam('tour', {});  
    const completedWorkItems = tour.completedWorkItems || []; 
    const hasItem = completedWorkItems.find(item => item.itemId === workItem.id);
    return hasItem ? true : false;
  }

  render() {
    const { workItems } = this.state;
    const items = workItems.slice(0, 3);
    return (
      <View style={styles.container}>
        {
            items.map((item, index) => (
                <CachedImage
                    resizeMode="cover"
                    key={index}
                    style={styles.imageBackground}
                    source={{
                        uri: item.photoUrl,
                        cache: 'only-if-cached',
                    }}
                >
                    <ActionButton
                        position="left"
                        buttonColor="rgba(51,51,255,0.8)"
                        size={75}
                        renderIcon={() => <Icon name="md-checkmark" color="white" size={30} />}
                        onPress={() => this.setCompletedStatus(item, true, index)}
                    />
                    <ActionButton
                        position="center"
                        buttonColor="rgba(0,255,255,0.8)"
                        size={75}
                        renderIcon={() => <Icon name="md-close" color="white" size={30} />}
                        onPress={() => this.setCompletedStatus(item, false, index)}
                    />
                    <ActionButton
                        buttonColor="rgba(127,0,255,0.8)"
                        size={75}
                        renderIcon={() => <Icon name="md-text" color="white" size={30} />}
                        onPress={() => { console.log("hi")}}
                    />
                </CachedImage>
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
