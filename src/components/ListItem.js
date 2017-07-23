import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, LayoutAnimation, UIManager } from 'react-native';
import { connect } from 'react-redux';

import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {
  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  ExpandRow() {
    const { library, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
            <Text style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}>
              {library.description}
            </Text>
        </CardSection>
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { title, id } = this.props.library;

    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)}>
        <View>
          <CardSection>
            <Text style={titleStyle}>{title}</Text>
          </CardSection>
          {this.ExpandRow()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = (state, ownProps) => {
  return { expanded: state.selectedLibraryId === ownProps.library.id };
};

export default connect(mapStateToProps, actions)(ListItem);
