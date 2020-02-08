/*
  Details of a playlist
*/

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image, FlatList } from 'react-native'

class PlaylistView extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://afternoon-waters-49321.herokuapp.com/v1/playlists/'+this.props.navigation.state.params.idPlaylist)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.main_container}>
        <View style={styles.topContainer}>
          <Image
            style={styles.image}
            source={{uri: this.state.dataSource.images[0].url}}
          />
          <View style={styles.content_container}>
              <Text style={styles.title_text}>{this.state.dataSource.name}</Text>
              <Text style={styles.grey_text}>{this.state.dataSource.type}</Text>
              <Text style={styles.white_text}>{this.state.dataSource.description}</Text>
              <Text style={styles.grey_text}>{this.state.dataSource.followers.total} followers</Text>
          </View>

        </View>

        <View style={styles.listContainer}>

          <FlatList
            data={this.state.dataSource.tracks.items}
            renderItem={({item}) => (
              <View style={styles.itemList}>
                <Text style={styles.white_text}>{item.track.name}</Text>
                <Text style={styles.grey_text}>{item.track.artists[0].name}</Text>
              </View>
            )}
            keyExtractor={({id}, index) => id}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: 'black',
    flex:1
  },
  topContainer:{
    flexDirection: 'row',
    flex: 1
  } ,
  listContainer:{
    flex: 3
  },
  itemList:{
    height: 64,
    flex: 1
  } ,
  image: {
    width: 120,
    height: 120,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5,
    flexDirection: 'column'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    paddingRight: 5
  },
  grey_text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#7a7676'
  },
  white_text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  }
})

export default PlaylistView
