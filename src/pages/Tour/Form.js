import React from 'react';
import { TextInput, StyleSheet, Text, View, Button, Modal } from 'react-native';

const TourForm = ({tour, ...props}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={props.modalVisible}
    onRequestClose={() => props.setModalVisible(false)}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.headerTitle}>New Tour</Text>
        <View>
          <Text style={styles.inputLabel}>Tour Name</Text>
          <TextInput
              style={styles.inputField}
              onChangeText={(text) => props.handleFieldChange('name', text)}
              value={tour.name || ''}
          />
        </View>
        <View style={styles.buttonView}>
          <View style={{ marginRight: 15, }}>
              <Button
                  onPress={() => props.addNewTour()}
                  title="Save"
                  color="#841584"
              />
          </View>
          <View>
              <Button
                  onPress={() => props.setModalVisible(false)}
                  title="Cancel"
                  color="#841584"
              />
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

export default TourForm;

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%', 
    flexDirection: 'column', 
    alignItems: 'center', 
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContent: {
    backgroundColor: 'white',
    marginTop: '10%',
    minWidth: '50%',
    elevation: 4,
    padding: 20,
  },
  headerTitle: {
    fontSize: 30, 
    fontWeight: 'bold', 
    alignSelf: 'center'
  },
  buttonView: {
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    marginTop: 10
  },
  inputLabel: {
    fontSize: 20, 
    fontWeight: 'bold'
  },
  inputField: {
    height: 40, 
    borderBottomColor: 'gray', 
    borderBottomWidth: 2
  }
});
