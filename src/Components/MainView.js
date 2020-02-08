/*
  Main view of the app. It displays all the playlists from the API
*/

import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import Player from './Player'

class MainView extends React.Component {

  // We need to use isLoading to manage the asynchronous task
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  // Function to display the detail of a playlist
  _displayDetailForPlaylist = (idPlaylist) => {
    console.log("Display playlist with id " + idPlaylist)
    this.props.navigation.navigate("Playlist", {idPlaylist: idPlaylist})
  }

  // Fetching all playlists from the api
  componentDidMount(){
    return fetch('https://afternoon-waters-49321.herokuapp.com/v1/browse/featured-playlists')
      .then((response) => response.json())
      .then((responseJson) => {

        // dataSource will contain the response from the json
        this.setState({
          isLoading: false,
          dataSource: responseJson.playlists.items,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    // We display a loader when we waiting for the api's response
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <Text style={styles.bigWhite}>Editor's picks</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            // I wanted to create a PlaylistItem to separate the code but it didn't work
            <TouchableOpacity style={{ flex: 1, flexDirection: 'column', margin: 1 }}
                  onPress={() => this._displayDetailForPlaylist(item.id)}>
              <Image style={styles.imagePlaylist} source={{ uri: item.images[0].url }} />
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={({id}, index) => id}
        />

        {/* Display the player for task 4*/}
        <Player/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  bigWhite: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  imagePlaylist: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 8
  },
});

export default MainView
