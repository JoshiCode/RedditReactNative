/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Fragment, Component} from 'react';
import axios from 'axios';
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
  Image,
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


    
    this.state = { redditPosts:  [], textToSearch : '' };
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
  renderItetemList(item)
  {
     return(
          
          <View style={{flexDirection: "row", flex: 1, borderBottomWidth: 1 ,borderBottomColor : "#d1d1d1", alignItems: "center", justifyContent:"center"}}>           
            <View style={{flex:1, }} >
              <Image style={{width: 60, height: 60, borderRadius: 60/2}} source={{uri: item.data.thumbnail}} ></Image>
            </View>
            <View style={{flex: 2, }}>
              <Text style={{color: "#20d2f4", fontSize: 14, paddingBottom: 5, fontFamily: "Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace"}}>{item.data.author}</Text>
              <Text style={{color: "black", fontFamily: "Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace", flexWrap: "wrap"}}> {item.data.title}</Text>
              <View style={{flexDirection:"row", flex:1}}>
                <View style={{flex:1}}><Image style={{width:16, height:16,}} source={require('./icon-sprite-comment.png')}></Image><Text style={styles.postSocial}>{item.data.num_comments} comments</Text></View>
                <View style={{flex:1}}><Image style={{width:16, height:16,}} source={require('./icon-sprite.png')}></Image><Text style={styles.postSocial}>{item.data.ups} ups</Text></View> 
                <View style={{flex:1}}><Image style={{width:16, height:16,}} source={require('./icon-sprite-downs.png')}></Image><Text style={styles.postSocial}>{item.data.downs} downs</Text></View>
            </View>
            </View>
          </View>
         );
  }
  getRedditResults(){
    /*return fetch('http://www.reddit.com/r/'+ this.state.textToSearch +'/.json').then((response) => response.json()).then((responseJson) => {       
        this.setState({
          redditPosts:  responseJson.data.children,
        });
      }).catch((error) => {
       console.error(error);
      });*/
      return axios.get('http://www.reddit.com/r/'+ this.state.textToSearch +'/.json').then(response => 
      this.setState({
        redditPosts:  response.data.data.children,
      }))
      .catch(error => {
        console.log(error);
      });
  }
 render()
 {
   return(
   <Fragment>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 2,marginBottom: 5}}
                placeholder="Type a word"
                onChangeText={(text) => this.setState({textToSearch: text})}
                value={this.state.textToSearch}
              />
               <Button
                style = {{padding: 2, margin: 3}}
                onPress = {this.getRedditResults.bind(this)}
                title = "Search in Reddit!"
                color = "#17a2b8"
              />
 
          </View>
          <View style={styles.sectionContainer}>
          <Text>
               Total Results: {this.state.redditPosts.length}
            </Text>
            <ScrollView style={{borderColor: "#d1d1d1", borderWidth: 1,}}>
            <FlatList style={{flex:1,  padding: 5}}
              data={this.state.redditPosts}
              renderItem={({item}) => this.renderItetemList(item)}
             
            />
            </ScrollView>
          </View>
        </View>
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
  postSocial: {
    fontFamily: "Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace",
    fontSize: 12,
    color: "black",
    paddingRight: 3,
  }
});

export default App;
