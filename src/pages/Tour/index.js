import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableNativeFeedback } from 'react-native';
import moment from 'moment';
import List, { listStyles } from '../../components/List';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import dbStore, { DB_NAME, SYNC_URL } from '../../dbStore/config';
import tourSchema from '../../dbStore/Schema';
import { tours as tourData } from '../../dbStore/tourData';
import Service from '../../service';
import { setData } from '../../dbStore/asyncStorage';
import TourForm from './Form';

export default class Tour extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Tours',
        headerRight: (
            <View style={{ marginRight: 20, }}>
            <TouchableNativeFeedback
                onPress={navigation.getParam('syncData')}            
            >
                <Icon name="md-sync" color="blue" size={35} />
            </TouchableNativeFeedback>
            </View>
        ),
    }
  };

  constructor(props) {
      super(props);
      this.state = {
        tours: [],
        modalVisible: false,
        tour: {},
      }
      this.subs = [];
      this.service = new Service();
  }

  async componentDidMount() {
    this.props.navigation.setParams({ syncData: this._syncData });
    const database = new dbStore();
    this.loadDataInBackground();
    this.db = await database.createDatabase();
    await this.setTourSchema();
    await this.setDummyTours();
    await this.findTours();
  }

  /**
   * loads worklist data from http url.
   * without waiting response 
   */
  loadDataInBackground() {
    this.service.get("worklist").then(result => {
        console.log('resss', result);
        if(result.worklist) {
            setData('workList', result.worklist).then(res => {
                console.log('result', res);
            });
        }
    });
  }

  _syncData = async () => {
    console.log('sync data');
    this.loadDataInBackground();
    await this.findTours();
  }

  async setTourSchema() {
    const collectionName = 'tours';
    const tourCollection = await this.db.collection({
        name: collectionName,
        schema: {...tourSchema},
    });
    tourCollection.sync({
        remote: SYNC_URL + DB_NAME + '/',
        options: {
            live: true,
            retry: true,
        },
    });
  }

  async setDummyTours() {
    const dummyTours = tourData || [];
    for (let i = 0; i < dummyTours.length; i++) {
        const object = dummyTours[i];
        this.db.tours.upsert({...object});
    }
  }

  async findTours() {
    const sub = this.db.tours
    .find()
    .$.subscribe(tours => {
        if (!tours) return;
        console.log('observable fired');
        this.setState({ tours: tours });
    });
    this.subs.push(sub);
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  setModalVisible(value) {
    this.setState({ modalVisible: value, tour: {} })
  }

  handleFieldChange = (field, value) => {
    const { tour } = this.state;
    tour[field] = value;
    this.setState({ tour });
  }

  addNewTour() {
    const { tour, tours } = this.state;
    const object = {
        ...tour,
        id: '',
        createdAt: moment().format('DD-MM-YYYY'),
        completedWorkItems: [],
    }
    // add item
    tours.push({...object});
    this.setState({ tours });
    this.setModalVisible(false);
  }

  renderTour = ({item, index}) => {
    const date = moment(item.createdAt, "DD-MM-YYYY");
    const { navigate } = this.props.navigation;
    return(
        <View style={listStyles.itemContainer} key={item.id}>
            <View style={listStyles.leftContainer}>
                <Text>{item.name}</Text>
                <Text>
                    {date.fromNow()}
                </Text>
            </View>
            <View style={listStyles.rightContainer}>
                <Button
                    onPress={() => navigate("Section", { item, db: this.db })}
                    title="Start"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
            
        </View>
    )
  }

  render() {
    const { tour } = this.state;
    return (
      <View style={styles.container}>
        <List 
            data={this.state.tours}
            renderItem={this.renderTour}
        />
        <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={() => this.setModalVisible(true)}
        />
        <TourForm 
          modalVisible={this.state.modalVisible}
          tour={tour}
          addNewTour={() => this.addNewTour()}
          handleFieldChange={this.handleFieldChange}
          setModalVisible={e => this.setModalVisible(e)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  itemContainer: {
    padding: 10,
  }
});
