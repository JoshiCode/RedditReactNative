/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


export class App extends React.Component{

  constructor(props){
    super(props);
    this.state = { test: [{"name":"joshi"},{"name":"mario"}, {"name":"luigi"}],prueba:[{"kind": "t3", "data": {"subreddit": "mexican", "author":"joshi"}},{"kind": "t3", "data": {"subreddit": "mexicano", "author":"nadie"}},], redditPosts:  [], textToSearch : '' };
  }
  
  /*componentDidMount = () => {
      return fetch('http://www.reddit.com/r/mexican/.json').then((response) => response.json()).then((responseJson) => {       
        this.setState({
          redditPosts:  JSON.stringify(responseJson.data.children),
        });
    }) .catch((error) => {
         console.error(error);
      });
  }*/
  getRedditResults(){
    return fetch('http://www.reddit.com/r/'+ this.state.textToSearch +'/.json').then((response) => response.json()).then((responseJson) => {       
        this.setState({
          redditPosts:  responseJson.data.children,
        });
      }).catch((error) => {
       console.error(error);
      });
  }
 render()
 {
   return(
   <Fragment>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Header />
        {global.HermesInternal == null ? null : (
          <View style={styles.engine}>
            <Text style={styles.footer}>Engine: Hermes</Text>
          </View>
        )}
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                placeholder="Type a word"
                onChangeText={(text) => this.setState({textToSearch: text})}
                value={this.state.textToSearch}
              />
               <Button
                onPress = {this.getRedditResults.bind(this)}
                title = "Search in Reddit!"
                color = "#17a2b8"
              />
 
          </View>
          <View style={styles.sectionContainer}>
          <Text>
               {this.state.redditPosts.length}
            </Text>
            <FlatList style={{flex:1,  borderColor: 'gray', borderWidth: 1, padding: 5}}
              data={this.state.redditPosts}
              renderItem={({item}) => <Text>{item.data.author}</Text>}
             
            />
          </View>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  </Fragment>);
 }

}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
