import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


class CustomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      x: 5,
      z: 9
    }
  }


  componentDidMount = () => {
     this.changeState()
  }

  changeState = () => {
    this.setState(priorState => ({ color: (priorState.x < 10 ? 'green' : 'red'), x: priorState.x + 1 }));
    setTimeout(this.changeState, 1000);
  }

  render() {
    const bg = this.state.color;
    const myX = this.state.x;

    return (
       <View>
         <Text style={{backgroundColor: bg}}>{this.props.myCustomText}</Text>
         <Text style={{fontSize: 35}}>{myX}</Text>
       </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hooray CS5356. Updated</Text>
        <CustomComponent myCustomText="blahblahblah"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
