import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';


import { primary3Color } from '../../../../theme';

export default class SeasonCard extends Component {

  state = { expanded: false };

  handleExpandChange = expanded => this.setState({ expanded });

  handleExpand = () => this.setState({expanded: true});
  
  handleReduce = () => this.setState({expanded: false});
  

  render() {
    if (!this.props.season) return <noScript/>
    const {season: { team, hockeyType, displayName }} = this.props;
    return (
      <Card 
        style={{marginTop:20}}
        expanded={this.state.expanded} 
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          style={{backgroundColor: primary3Color }}
          title={`${team}, ${hockeyType}`}
          subtitle={displayName}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          {this.props.children}
        </CardText>
      </Card>
    );
  }
}