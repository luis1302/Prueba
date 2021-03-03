import React, { Component } from 'react';
import Principal from './menuPrincipal';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

class Habitacion extends Component {
      constructor() {
      super();
      this.state={
          habitaciones:[],
          codigo:'Habitacion',
          valor:'',
          numero_personas:'',
          descripcion:'',
          disponibilidad:'Si',
          limpieza:'No Requiere',
          buscar: '',
          tipo: 'Sencilla',
          open:false,
          open2:false,
          mostrarEdit: false
      }
      this.ingresar = this.ingresar.bind(this);
      this.isFloat = this.isFloat.bind(this);
      this.isText = this.isText.bind(this);
      this.isNumber = this.isNumber.bind(this);
      this.setValor = this.setValor.bind(this);
      this.validarCampos = this.validarCampos.bind(this);
      this.setCodigo=this.setCodigo.bind(this);
      this.setNumero_personas=this.setNumero_personas.bind(this);
      this.setDescripcion=this.setDescripcion.bind(this);
      this.setDisponibilidad=this.setDisponibilidad.bind(this);
      this.setLimpieza=this.setLimpieza.bind(this);
      this.setTipo=this.setTipo.bind(this);
      this.abrirAlert=this.abrirAlert.bind(this);
    }

    isText(text) {
      const re = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$/;
      console.log('ES TEXTO ?: ', re.test(String(text)));
      return re.test(String(text));
    }

    isFloat(number){
      const re=/^([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
      return re.test(String(number));
    }

    isNumber(number) {
      const re = /^[0-9]*$/;
      return re.test(String(number));
    }

    setCodigo(evt){
      this.setState({codigo:evt.target.value});
    }

    setTipo(evt){
      this.setState({tipo:evt.target.value});
    }

    setValor(evt){
      if(this.isFloat(evt.target.value) ) {
        this.setState({valor:evt.target.value});
      }
    }

    setNumero_personas(evt){
      if( this.isNumber(evt.target.value) ) {
      this.setState({numero_personas:evt.target.value});
      }
    }

    setDescripcion(evt){
      this.setState({descripcion:evt.target.value});
    }

    setDisponibilidad(evt){
          this.setState({disponibilidad:evt.target.value});
    }

    setLimpieza(evt){
      this.setState({limpieza:evt.target.value});
    }

    validarCampos = () => {
      var resultado = true;
      if( this.state.codigo.length> 0 && this.state.valor.length> 0
          && this.state.numero_personas.length> 0 && this.state.descripcion.length> 0 && this.state.disponibilidad.length> 0) {
        resultado = false;
      }
      return resultado;
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

    ingresar() {
        const busqueda =  this.state.codigo;
        axios.get("http://localhost:8000/api/consultaCodigo/" + busqueda).then(rest => {
          const habitaciones = rest.data;
          this.setState({habitaciones});

          if(habitaciones.length > 0){
            this.abrirAlert2();
          }
          else{
            axios.post("http://localhost:8000/api/guardarHabitacion", {
                  codigo: this.state.codigo,
                  tipo: this.state.tipo,
                  valor: this.state.valor,
                  numero_personas: this.state.numero_personas,
                  descripcion: this.state.descripcion,
                  disponibilidad: this.state.disponibilidad,
                  limpieza: this.state.limpieza

              })
              .then(res=>{
                this.setState({codigo:'Habitacion',valor:'',numero_personas:'',descripcion:''})
                console.log(res.data);
              })
                  .catch(function (error) {
                      console.log(error);
                  });
                  this.abrirAlert();
              }
          });
  }

  render() {
    return (
          <div>
          <Principal/>

          <Container maxWidth="sm">
          <Grid style={{marginTop: 40}} container>
            <Grid>
            <LocalHotelIcon style={{ fontSize: 50, color:"#bf360c"  }}/>
            </Grid>
            <Grid>
            <h3 style={{color:"#bf360c" }}>
            Ingresar Habitacion
            </h3>
            </Grid>
          </Grid>
          <br></br>
          <Grid container spacing={9}>
            <Grid>
          <h4 className="hola">Nota:</h4>
          </Grid>
          <Grid>
          <h4> Todos los campos deben estar llenos.</h4>
          </Grid>
          </Grid>

          <Grid container spacing={3}>
          <Grid item xs={12}>
          <TextField
          style={{marginTop: 20}}
          id="codigo"
          name="codigo"
          label="Ingrese el numero de habitacion"
          margin="normal"
          fullWidth
          helperText = "Ejem: Habitacion200"
          value={this.state.codigo}
          onChange={this.setCodigo}
          />
          </Grid>

          <Grid item sm = {6}>
          <TextField
          id="numero_personas"
          name="numero_personas"
          label="Numero de personas"
          helperText = "Ingrese el numero MAXIMO de personas"
          value={this.state.numero_personas}
          onChange={this.setNumero_personas}
          />
          </Grid>

          <Grid item xs={6}>
          <TextField
          id="valor"
          name="valor"
          label="Precio de la habitacion por persona"
          helperText = "Ejem: 10.00"
          fullWidth
          value={this.state.valor}
          onChange={this.setValor}
          />
          </Grid>

          <Grid item xs={12}>
          <TextField
          id="descripcion"
          name="descripcion"
          label="Descripcion de la Habitacion"
          helperText = "Que incluye? Ejem: Aire Acondicionado, Agua Caliente, etc."
          fullWidth
          value={this.state.descripcion}
          onChange={this.setDescripcion}
          />
          </Grid>
          <Grid item xs={4}>
          <InputLabel id="demo-simple-select-label3">Tipo de Habitacion</InputLabel>
            <Select
              labelId="demo-simple-select-label3"
              id="tipo"
              margin="dense"
              value={this.state.tipo}
              onChange={this.setTipo}
            >
              <MenuItem value="Sencilla" >Sencilla</MenuItem>
              <MenuItem value="Doble" >Doble</MenuItem>
              <MenuItem value="Triple" >Triple</MenuItem>
          </Select>
          </Grid>

          <Grid item xs={4}>
          <InputLabel id="demo-simple-select-label">Disponibilidad</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="disponibilidad"
              value={this.state.disponibilidad}
              onChange={this.setDisponibilidad}
            >
              <MenuItem value="Si" >Si</MenuItem>
              <MenuItem value="No" >No</MenuItem>
          </Select>
          </Grid>

          <Grid item xs={4}>
          <InputLabel id="demo-simple-select-label2">Requiere limpieza</InputLabel>
            <Select
              labelId="demo-simple-select-label2"
              id="limpieza"
              value={this.state.limpieza}
              onChange={this.setLimpieza}
            >
              <MenuItem value="No Requiere" >No Requiere</MenuItem>
              <MenuItem value="Requiere" >Requiere</MenuItem>
          </Select>
          </Grid>
          </Grid>

          <Button
            onClick = {this.ingresar}
            style={{marginLeft:180, marginTop: 30, marginBottom:20}}
            variant="contained" type="submit"
            text-align="center"
            disabled={this.validarCampos()}
          >
              <SaveIcon/>
              Guardar
          </Button>

          <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="success">
            Habitacion GUARDADA exitosamente.
          </MuiAlert>
          </Snackbar>
          <Snackbar open={this.state.open2} autoHideDuration={1500} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="error">
            El numero de Habitacion indicado ya existe actualmente.
          </MuiAlert>
          </Snackbar>
          </Container>

     </div>
    );
  }
}

export default Habitacion;
