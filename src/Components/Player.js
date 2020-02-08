import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
//import SoundPlayer from 'react-native-sound-player'

class Player extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isPlaying: false }
  }

  render() {

    // Launch the player with the sound preview
    /*if (this.props.url) {
      SoundPlayer.playUrl(this.props.url)
    }*/

    return(<View style={styles.bottomContainer}>

      <View style={styles.content_container}>
        <Text style={styles.white_text}>{this.props.title}</Text>
        <Text style={styles.grey_text}>{this.props.artist}</Text>
      </View>

      <Image
        style={styles.player_image}
        source={require('../assets/pause-button.png')}
      />

    </View>)

  }
}

const styles = StyleSheet.create({
  grey_text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#7a7676'
  },
  white_text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  image: {
    width: 120,
    height: 120,
    margin: 5,
    backgroundColor: 'gray'
  },
  bottomContainer:{
    flexDirection: 'row',
    backgroundColor: 'pink'
  } ,
  player_image: {
    width: 32,
    height: 32,
    margin: 5,
    backgroundColor: 'pink'
  },
  content_container: {
    flex: 1,
    margin: 5,
    flexDirection: 'column'
  }
})

export default Player
