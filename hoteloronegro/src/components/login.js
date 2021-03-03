import React, { Component } from 'react';
import logo from '../images/LogoHotel3.svg';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

class Login extends Component {
      constructor() {
      super();
      this.state={
          usuarios:[],
          user:'',
          password:'',
          resultado:'',
          estado:false,
          open:false,
          open2:false,
          mostrarEdit: false
      }
    }

    setUser = eve => {
      this.setState({user:eve.target.value});
    }
    setPassword = eve => {
      this.setState({password:eve.target.value});
    }

    cerrar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({open:false});
      this.setState({open2:false});
    };

    abrirAlert(){
      this.setState({open:true});
    }

    abrirAlert2(){
      this.setState({open2:true});
    }

    login = () => {
      axios.post('http://127.0.0.1:8000/api/login',{
        user: this.state.user,
        password: this.state.password
      }).then(res=>{
        this.setState({resultado:res.data});
        console.log('res: ', res.data);
        if(res.data){
          sessionStorage.setItem('rol',res.data.rol);
          this.props.history.push('/principal');
          this.setState({user:'',password:''});
          console.log('bien');
        }
        else{
          this.abrirAlert2();
          this.setState({user:'',password:''});
        }
      });
    }


  render() {
    return (
          <div>
          <Box align="center" width="35%" borderRadius={16} boxShadow={3} borderColor="#424242" bgColor='#9e9e9e'
              color="text.primary" m={3} border={3} fontStyle="Italic" style={{marginLeft:500, marginTop:150,backgroundColor:'#fafafa'}}>

          <Grid style={{alignContent:'center'}} container>
            <Grid item xs={12}>
            <img style={{marginTop:40}} src={logo} height="60" alt='logo'/>
            </Grid>
            <br></br>
            <br></br>
            <Grid item xs ={12}>
            <TextField
            id="id"
            name="id"
            label="Usuario"
            margin="normal"
            value={this.state.user}
            onChange={this.setUser}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            />
            </Grid>
            <br></br>
            <br></br>
            <Grid item xs={12}>
            <br></br>
            <TextField
            id="outlined-password-input"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.setPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
            />
            </Grid>
            <Grid item xs={12}>
            <br></br>
            <Button
              style={{align:'center',marginTop: 20, marginBottom:20}}
              variant="contained" type="submit"
              onClick={this.login}
            >
                Ingresar
            </Button>
            </Grid>
          </Grid>
          </Box>

          <Snackbar open={this.state.open2} anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          autoHideDuration={3000} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="error">
            Usuario o Contraseña INCORRECTOS.
          </MuiAlert>
          </Snackbar>
     </div>
    );
  }
}

export default Login;
