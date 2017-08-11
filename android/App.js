import React from 'react';
import { AppRegistry, TouchableHighlight, StyleSheet, Text, View, Platform, TextInput, Button, Alert, ScrollView } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'


class Card extends React.Component{
  render(){
    return(
      <TouchableHighlight onPress={this.props.onPress}>
      <View style={this.props.style}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.initials}>
              <Text>{this.props.initials}</Text>
          </View>
          <View style={styles.cardtext}>
            <Text style={{fontWeight:'bold'}}>{this.props.name}</Text>
            <Text>{this.props.shortDescription}</Text>
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

  handleCardPress(styles, item) {
    this.props.navigation.navigate('Card', { styles, item });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.home}>
        <ScrollView style={styles.scroll}>
          {data.map(item => (
            <Card
              key={item.id}
              style={styles.card}
              initials={item.initials}
              name={item.name}
              shortDescription={item.shortDescription}
              onPress={() => this.handleCardPress(styles, item)}
            />
          ))}
        </ScrollView>
        <ActionButton 
          buttonColor='lightgreen'
          rotate={0}
          onPress={() => this.props.navigation.navigate('Editor', {title: 'Add', styles, isEditing:false})}
        />
      </View>  
    );
  }
}





class CardScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.item.name,
    headerRight: <Button title="Edit" onPress={() => navigation.navigate('Editor', {title: 'Edit', styles, isEditing:false})} />
  });
  render() {
        const { params } = this.props.navigation.state;
    return (
      <View style={params.styles.cardscreen}>
        <View style={params.styles.cardscreentext}>
          <Text>{params.item.description}</Text>
        </View>
      </View>
    );
  }
}





class EditorScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: this.props.isEditing ? this.props.item.firstName : '',
      lastName: this.props.isEditing ? this.props.item.lastName : '',
      phone: this.props.isEditing ? this.props.item.phone : '',
      description: this.props.isEditing ? this.props.item.description : '',
    }
  }
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: 
      <Button
        title="OK"
        onPress={() => {
          //addCard(inputFN.value, inputLN.value, inputP.value, inputD.value)
          navigation.goBack()
        }}
      />
  });
  render(){
    const { params } = this.props.navigation.state;
    return(
      <View style={params.styles.editorScreen}>
        <View style={{flexDirection: 'row'}}>
          <Text style={params.styles.header}>First Name: </Text>
          <TextInput
            placeholder={params.isEditing ? params.item.name:"First Name"}
            name="inputFN"
            autoCapitalize="words"
            style={params.styles.input}
            onChangeText={(firstName) => this.setState({firstName})}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={params.styles.header}>Last Name: </Text>
          <TextInput
            placeholder={params.isEditing ? params.item.name:"Last Name"}
            name="inputLN"
            autoCapitalize="words"
            style={params.styles.input}
            onChangeText={(lastName) => this.setState({lastName})}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={params.styles.header}>Phone: </Text>
          <TextInput
            placeholder={params.isEditing ? params.item.phone:"Phone"}
            name="inputP"
            autoCapitalize="words"
            keyboardType="phone-pad"
            style={params.styles.input}
            onChangeText={(phone) => this.setState({phone})}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={params.styles.header}>Description: </Text>
          <TextInput
            placeholder={params.isEditing ? params.item.shortDescription:"Description"}
            name="inputD"
            autoCapitalize="words"
            style={params.styles.input}
            onChangeText={(description) => this.setState({description})}
          />
        </View>
      </View>
    );
  }
}









const ScreenNavigator = StackNavigator({
  Home: {screen: HomeScreen},
  Card: {screen: CardScreen},
  Editor: {screen: EditorScreen},
  
});

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
         <ScreenNavigator /> 
      </Provider>
    );
  }
} 







const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 0,
  },
  cardscreen: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'snow',
  },
  cardscreenhead: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: 'lavender',
  },
  editorScreen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  card:{
    borderWidth: 1,
    marginTop: 1,
    backgroundColor: 'snow'
  },
  initials: {
    flex: 20,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender',
  },

  header: {
    fontWeight: 'bold',
    flex: 25,
    marginTop: 5,
  },
  cardtext: {
    height: 60,
    flex: 80,
    justifyContent: 'center',
  },
  cardscreentext: {
    height: 60,
    flex: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    color: 'red',
  },
  input: {
    backgroundColor: 'snow',
    flex: 75,
    marginTop: 5,
  },
});




let store = createStore(combineReducers({cards, inputs}))

function cards(state = [], action) {
  switch (action.type) {
    case 'ADD_CARD':
      return [
        ...state,
        {
          id: action.id,
          initials: '',
          name: action.name,
          shortDescription: action.description,
          phone: action.phone,
          description: '',
        }
      ]
    default:
      return state
  }
}

function inputs(state = [], action) {
  switch (action.type){
    case 'PASS_INPUTS':
      return state
    default:
      return state
  }
}

function addCard(fn, ln, p, d) {
  return {
    type: ADD_CARD,
    fn, ln, p, d
  }
}

/*
Card:
id
First Name
Last Name
Phone
Description
Initials
*/

const data = [
  {
    id: 1,
    initials: 'JD',
    name: 'Jack Daw',
    shortDescription: 'Outcasts',
    phone: '1',
    description: '123'+'alfgnaaglajogsm;,h;a,;f;asf'+'asf;agjloajdhag;kaphjapg'+
    'asgl;jnalgjadjhpdjkshjpdskgp;jsaogdjsz;hbnms;djhodsgh,;'+'algshadisghangloasjgoasglamlgkma',
  },
  {
    id: 2,
    initials: 'R',
    name: 'Ramos',
    shortDescription: 'Arcanists',
    phone: '2',
    description: '234',
  },
  {
    id: 3,
    initials: 'SC',
    name: 'Sonnia Criid',
    shortDescription: 'The Guild',
    phone: '3',
    description: '345',
  },
  {
    id: 4,
    initials: 'L',
    name: 'Lilith',
    shortDescription: 'Neverborns',
    phone: '4',
    description: '456',
  },
  {
    id: 5,
    initials: 'A',
    name: 'Asami',
    shortDescription: 'Ten Thunders',
    phone: '5',
    description: '567',
  },
  {
    id: 6,
    initials: 'N',
    name: 'Nicodem',
    shortDescription: 'Ressurectonists',
    phone: '6',
    description: '678',
  },
  {
    id: 7,
    initials: 'O',
    name: 'Ophelia',
    shortDescription: 'Gremlins',
    phone: '7',
    description: '789',
  },
];

export default App;