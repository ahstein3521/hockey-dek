import { 
    accent2Color
} from '../../theme'; 

export const searchStyle = {
  card:{
    marginBottom:30, 
  },
  wrapper:{
    width:'70%', 
    margin:'0 auto'
  },
  label:{
    fontSize:'1.3em'
  },
  input:{
    fontSize:'1.5em'
  }
}

export const tabStyles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  tab:{
    fontWeight:'bold'
  },

  inkbar: {
    background:accent2Color, 
  }  
};

export const basicInfoStyle = {
  submitBtn:{
    style:{marginTop:40},
  },
  formRow:{
    display:'flex',
    justifyContent:'space-around'
  },
  form:{
    width:'80%',
    margin:'10px auto',
    padding: 10
  }  
}