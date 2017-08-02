import React from 'react';
import { StyleSheet, Text, View, Platform, TextInput, Button, Alert, ScrollView } from 'react-native';

class UserOS extends React.Component {
  constructor(props){
    super(props);
    this.state={
      message: '',
    };
  }
  render(){ 
    const msg = Platform.select({
      ios: {message: 'iOS'},
      android: {message: 'Android'},
    });
    return(
      <Text>{msg.message}</Text>
    );
  }  
}

class Card extends React.Component{
  render(){
    return(
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.photo} />
          <View style={styles.text}>
            <Text>Name: {this.props.name}</Text>
            <Text>Adress: {this.props.adress}</Text>
            <View style={styles.buttons}>
              <Button
                title="+"
                onPress={() => {Alert.alert('Add')}}
                color="grey"
              />
              <Button
                title="/"
                onPress={() => {Alert.alert('Edit')}}
                color="grey"
              />
              <Button
                title="-"
                onPress={() => {Alert.alert('Delete')}}
                color="grey"
              />
            </View>
          </View>
        </View>  
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.cards}>
        <View style={{height: 20}} />
        <ScrollView style={styles.scroll}>
          <Card style={styles.card} name='Nikita' adress='SNT' />
          <Text />
          <Card name='' adress='' />
          <Text />
          <Card name='' adress='' />
          <Text />
          <Card name='' adress='' />
          <Text />
          <Card name='' adress='' />
          <Text />
          <Card name='' adress='' />
          <Text />
          <Card name='' adress='' />
          <Text />
          <Card name='' adress='' />
          <Text />
          <Card name='' adress='' />
          <Text />
        </ScrollView>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  cards: {
    flex: 1,
    height: 100,
    justifyContent: 'space-between',
  },
  scroll: {
    //flexWrap: 'wrap',
    //margin: 10,
  },
  card:{
    borderWidth: 10,
  },
  photo: {
    flex: 20,
    backgroundColor: 'blue',
  },
  text: {
    backgroundColor: 'skyblue',
    flex: 80,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
