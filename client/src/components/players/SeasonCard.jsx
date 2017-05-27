import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

const seasons = ['','Winter', 'Spring', 'Summer', 'Fall'];

const formatTeam = (_id) => {
  const id = _id.split('-');
  id.pop();

  return id.join(" ").toUpperCase();

}

export default class SeasonCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {

    return (
      <Card 
        style={{marginTop:20}}
        expanded={this.state.expanded} 
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          title={formatTeam(this.props._id.team)}
          subtitle={seasons[this.props._id.quarter]+" "+this.props._id.year}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <table style={{}}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Played</th>
              </tr>
            </thead>
            <tbody>
            {
              this.props.checkIns.map(({date, attended}) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{attended? 'Yes' : 'No'}</td>
                </tr>
              ))
            }
            </tbody>
            <tfoot>
              <tr>
                <td>{"Total Checkins: "+ this.props.totalPlayed}</td>
              </tr>
            </tfoot>  
          </table>
        </CardText>
      </Card>
    );
  }
}