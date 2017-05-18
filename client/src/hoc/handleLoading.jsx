import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import { initAuthState } from '../actions/index';

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
      this.props.initAuthState();
    }

    render(){
      const { initAuthState, ...props } = this.props;

      if(props.loading){
        return this.renderSpinner();
      }
      
      else{
        return <ComposedComponent {...props}/>;
      }
    }
  };
  
  function mapStateToProps({ auth }){
    const { loggedIn, loading } = auth;
    return { loggedIn, loading };
  }
  
  function mapDispatchToProps(dispatch){
    return bindActionCreators({ initAuthState }, dispatch);
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(loadState);
}


