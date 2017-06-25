import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import { initializeApp } from '../actions/index';
import { Redirect } from 'react-router-dom';

const style = {
  position:'absolute',
  top:0,
  left:0,
  width:'100%',
  height: '100%',
  background:'white',
  zIndex:2001,
  display:'flex',
  justifyContent: 'center',
  alignItems:'center',
};


export default function(ComposedComponent){

  class loadState extends Component{
    
    renderSpinner(){
      return (
        <div style={style}>
          <CircularProgress 
            size={80} 
            thickness={3.5}
          />
        </div>
      )
    }

    componentWillMount(){
      //Get authentication status from the server
      //This switches off the loading state as long as a success response is received
   
      this.props.initializeApp();
    }

    render(){
   
      const { loggedIn, loading, ...props } = this.props;
    
      if ( loading ){

        return this.renderSpinner();
      }
      //Redirect instantly if the user is not logged in 
      else if ( !loggedIn ){
        
        return <Redirect to="/login"/>
      }
      //Render the desired content
      else{
        return <ComposedComponent {...props}/>;
      }
    }
  };
  
  function mapStateToProps({ auth, menu }){

    const { loggedIn, loading } = auth;
    return { loggedIn, loading, menuOpen: menu.open };
  }
  
  function mapDispatchToProps(dispatch){
    return bindActionCreators({ initializeApp }, dispatch);
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(loadState);
}


