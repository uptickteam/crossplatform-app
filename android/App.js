import React from 'react';
import { AppRegistry, TouchableHighlight, StyleSheet, Text, View, Platform, TextInput, Button, Alert, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';


const data = [
  {
    id: 1,
    name: 'John Doe',
    description: 'Some description'
  },
  {
    id: 42,
    name: 'Jane Doe',
    description: 'Some descrsdfsdfsdf'
  }
];


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
      <TouchableHighlight onPress={this.props.onPress}>
      <View style={this.props.style}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.photo} />
          <View style={styles.text}>
            <Text>{this.props.name}</Text>
            <Text>{this.props.description}</Text>
            {/* <View style={styles.buttons}>
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
            </View> */}
          </View>
        </View>  
      </View>
      </TouchableHighlight>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Cards',
  };

  handleCardPress(item) {
    this.props.navigation.navigate('Card', { item });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.home}>
        <View style={{height: 20}} />
        <ScrollView style={styles.scroll}>
          {data.map(item => (
            <Card
              key={item.id}
              style={styles.card}
              name={item.name}
              description='-'
              onPress={() => this.handleCardPress(item)}
            />
          ))}
        </ScrollView>
      </View>  
    );
  }
}

class CardScreen extends React.Component {
  static navigationOptions = {
    title: 'Card Screen'
  };
  render() {
        const { params } = this.props.navigation.state;

    return (
      <View>
        <Card style={styles.card} name={params.item.name} description={params.description}/>
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: {screen: HomeScreen},
  Card: {screen: CardScreen},
});

const styles = StyleSheet.create({
  home: {
    flex: 1,
    height: 100,
    justifyContent: 'space-between',
    marginTop: 0,
  },
  card:{
    borderWidth: 1,
    marginTop: 5,
  },
  photo: {
    flex: 20,
    height: 75,
    backgroundColor: 'blue',
  },
  text: {
    backgroundColor: 'skyblue',
    height: 75,
    flex: 80,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default SimpleApp;