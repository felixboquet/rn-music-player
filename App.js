import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://afternoon-waters-49321.herokuapp.com/v1/browse/featured-playlists')
      .then((response) => response.json())
      .then((responseJson) => {

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
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <Image style={styles.imagePlaylist} source={{ uri: item.images[0].url }} />
            </View>
          )}
          numColumns={2}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
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
  },
});
