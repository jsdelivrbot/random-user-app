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
      <View >
        <Image
        style={{
            width: 120,
            height: 120,
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
      <View >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >
          {this.toTitleCase(user.name.first + ' ' + user.name.last)}
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
      <View style={{flex: 1, flexDirection: 'row', padding: 20, backgroundColor: 'powderblue'}}>
        {(this.props.loading) && <Text>Loading user data...</Text>}
        {(this.props.user) && this.renderUserImage(this.props.user)}
        {(this.props.user) && this.renderUserInfo.bind(this)(this.props.user)}
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
