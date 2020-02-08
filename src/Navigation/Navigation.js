// Navigation/Navigation.js
// Here we are going to put all the navigation of the app

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import PlaylistView from '../Components/PlaylistView'
import MainView from '../Components/MainView'
import Player from '../Components/Player'

// Navigation between the playlists and the detail of a playlist
const MainStackNavigator = createStackNavigator({
  Main: {
    screen: MainView
  },
  Playlist: {
    screen: PlaylistView
  }
})

export default createAppContainer(MainStackNavigator)
