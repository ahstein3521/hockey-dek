import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

const seasons = ['','Winter', 'Spring', 'Summer', 'Fall'];


export default class SeasonCard extends Component {

  state = { expanded: false };

  handleExpandChange = expanded => this.setState({ expanded });

  handleExpand = () => this.setState({expanded: true});
  
  handleReduce = () => this.setState({expanded: false});
  

  render() {
    const {season: { team: { name, hockeyType }, quarter, year }} = this.props;
    return (
      <Card 
        style={{marginTop:20}}
        expanded={this.state.expanded} 
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          title={`${name}, ${hockeyType}`}
          subtitle={seasons[quarter]+" "+year}
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