import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableNativeFeedback,
  Image
} from 'react-native';
import { connect } from 'react-redux';

var getRandomUser = require('../actions/getRandomUser');

class RandomUserContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getRandomUser();
  }

  renderUserImage(user) {
    return (
      <View
        style={{
          flex: 0.4,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image
        style={{
            width: 100,
            height: 100,
            backgroundColor: 'transparent',
            borderRadius: 60,
            borderWidth: 2,
            borderColor: 'white'
          }}
          resizeMode={Image.resizeMode.cover}
          source={{uri: user.picture.large}}
        />
      </View>
    );
  }

  renderUserInfo(user) {
    return (
      <View
        style={{
          flex: 0.6,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          {this.toTitleCase(user.name.first + ' ' + user.name.last)}
        </Text>

        <Text
          style={{
            fontSize: 10,
            color: 'white'
          }}
        >
          { user.email }
        </Text>

        <Text
          style={{
            fontSize: 10,
            color: 'white'
          }}
        >
          { user.phone }
        </Text>
      </View>
    );
  }

  toTitleCase(str)
  {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'powderblue'}}>
        {(this.props.loading) && <Text>Loading user data...</Text>}

        <View style={{flex: 0.2, flexDirection: 'row', backgroundColor: 'steelblue'}}>
          {(this.props.user) && this.renderUserImage(this.props.user)}
          {(this.props.user) && this.renderUserInfo.bind(this)(this.props.user)}
        </View>

        <View style={{flex: 0.8}}>

        </View>

      </View>
    );
  }
}

function mapStateToProps(state) {
    var loading = state.loading;
    var user = (state.user) ? state.user : null;
    return { user, loading };
}

const mapDispatchToProps = {
  getRandomUser
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(RandomUserContainer);
