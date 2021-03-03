import React, { Component } from 'react';
import Principal from './menuPrincipal';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import checkout from '../images/checkout.png';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import InputBase from '@material-ui/core/InputBase';
class CheckOut extends Component {
      constructor() {
      super();
      this.state={
          idCli:'',
          nombre:'',
          apellido:'',
          telefono:'',
          direccion:'',
          id: '',
          fechaEntrada:moment().format('YYYY-MM-DD'),
          horaEntrada:moment().format('YYYY-MM-DDTHH:mm'),
          fechaSalida: moment().format('YYYY-MM-DD'),
          horaSalida: moment().format('YYYY-MM-DDTHH:mm'),
          habitaciones:[],
          asignaciones:[],
          clientes:[],
          facturas:[],
          habitacionesCheckout:[],
          codigo:'',
          descripcion:'',
          abono:'',
          personas_habitacion:'',
          disponibilidad:'',
          idHabitacion:'',
          idCliente:'',
          limpieza:'',
          buscar: '',
          resultado: '',
          open0:false,
          open:false,
          open2:false,
          mostrarDialogo:false,
          mostrarDialogoFactura:false,
          contadorDias:0,
          valorTotal:0,
          valorIva:0,
          valorPagar:0,
          idFactura:0
      }
            this.ingresarFactura = this.ingresarFactura.bind(this);
            this.abrirAlertTabla=this.abrirAlertTabla.bind(this);
    }


    isNumber(number) {
      const re = /^[0-9]*$/;
      return re.test(String(number));
    }

    cerrar = (event, reason) => {

      if (reason === 'clickaway') {
        return;
      }
      this.setState({open2:false});
      this.setState({open:false, open0:false});
    };

    cerrarDialogos=(event,reason)=>{
      if (reason === 'clickaway') {
        return;
      }
      this.setState({mostrarDialogo:false});
      this.setState({mostrarDialogoFactura:false});
    }

    setId = eve => {
      this.setState({id:eve.target.value});
    }

    setIdHabitacion = eve => {
      this.setState({idHabitacion:eve.target.value});
    }

    setAbono = eve => {
      this.setState({abono:eve.target.value});
    }

    setPersonas_habitacion = evt => {
      if( this.isNumber(evt.target.value) ) {
      this.setState({personas_habitacion:evt.target.value});
      }
    }

    setFechaEntrada = eve =>{
      this.setState({fechaEntrada:eve.target.value});
    }

    setFechaSalida = eve =>{
      this.setState({fechaSalida:eve.target.value});
    }

    handleChange = event => {
      this.setState({ buscar: event.target.value});
    }

    setIdCli = eve => {
      this.setState({idCli: eve.target.value});
    }

    setNombre = eve => {
      this.setState({nombre: eve.target.value});
    }

    setApellido = eve => {
      this.setState({apellido: eve.target.value});
    }

    setDireccion = eve => {
      this.setState({direccion: eve.target.value});
    }

    setTelefono = eve => {
      this.setState({telefono: eve.target.value});
    }

    checkout = (habitacion) =>  {
      this.setState({mostrarDialogo:false});
      var valorTotalTemp =this.state.valorTotal;
      var iva=this.state.valorIva;
      var pago=this.state.valorPagar;
      var numero=(this.state.idFactura).toString();
      this.setState({mostrarFactura: true});
      const busqueda=this.state.id;
      const fecha2=new Date(this.state.fechaSalida);
      const fecha1=new Date(this.state.fechaEntrada);
      var contadorDias= (fecha2.getTime() - fecha1.getTime()) / (1000 * 3600 * 24);
      if (contadorDias === 0 ) {contadorDias = 1; }

      var habitacionesCheckoutNuevo = this.state.habitacionesCheckout;
      var res=numero.padStart(8,"0");//numerofactura

      const asignacionSeleccionada = this.state.asignaciones.filter(asign => asign.id === busqueda)[0];

      axios.get("http://localhost:8000/api/consultaCodigo/" + asignacionSeleccionada.idHabitacion).then(rest => {
        const habitaciones = rest.data[0];
        asignacionSeleccionada.habitacion=habitaciones;
        asignacionSeleccionada.valorTotal = habitaciones.valor * asignacionSeleccionada.personas_habitacion * contadorDias;
        valorTotalTemp += asignacionSeleccionada.valorTotal;

        iva=(valorTotalTemp*0.12).toFixed(2);
        iva=parseFloat(iva);
        pago=valorTotalTemp+iva;

        habitacionesCheckoutNuevo.push(asignacionSeleccionada);
        this.setState({habitacionesCheckout: habitacionesCheckoutNuevo});

         this.setState({contadorDias, valorTotal:valorTotalTemp, valorIva:iva,valorPagar:pago, idFactura:res});
         axios.put('http://127.0.0.1:8000/api/AsignacionCheckOut/'+busqueda,{
           fechaSalida: this.state.fechaSalida,
           horaSalida: this.state.horaSalida
         })
         .then(res=>{
           axios.put('http://localhost:8000/api/HabitacionCheckOut/'+this.state.idHabitacion, {
             })
           .then(res=>{
             axios.get('http://127.0.0.1:8000/api/Consultacheckout/'+this.state.idCliente).then(res=>{
               const asignaciones = res.data;
                 if(asignaciones.length > 0){
                 this.setState({asignaciones});
                 }
                 else{
                   this.setState({asignaciones:[]});
                   this.abrirAlertTabla();
                 }
               })
         })
       })
               .catch(function (error) {
                   console.log(error);
                     });
      });
            this.abrirAlert();
    }

    handleChange = event => {
        this.setState({ buscar: event.target.value});
      }

    abrirAlertTabla(){
      this.setState({open2:true});
    }

    abrirAlert(){
      this.setState({open:true});
    }

    abrirAlertFactura(){
      this.setState({open0:true});
    }

    handleClose0 = () => {
      this.setState({MostrarDialogo: false});
    };

    handleCloseFactura = () => {
      this.setState({mostrarDialogoFactura: false});
    };

    ingresarFactura() {
      axios.post("http://localhost:8000/api/guardarFactura", {
            idFactura: this.state.idFactura,
            idCli: this.state.idCli,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            fechaSalida: this.state.fechaSalida,
            valorTotal: this.state.valorTotal,
            valorIva: this.state.valorIva,
            valorPagar:this.state.valorPagar,
            estado:'Correcto'

        })
        .then(res=>{
           this.setState({buscar:'',asignaciones:[],habitacionesCheckout:[], mostrarDialogoFactura:false, mostrarFactura:false})
          console.log(res.data);
        })
            .catch(function (error) {
                console.log(error);
            });
            this.abrirAlertFactura();
      }

    busquedaCliente = event =>{
      const busqueda=this.state.idCli;

      if(this.state.idCli.length > 0){
        axios.get("http://localhost:8000/api/consultaClientesId/" + busqueda).then(rest => {
          const clientes = rest.data;
          if(clientes.length > 0){
            this.setState({
              idCli: clientes[0].id,
              nombre: clientes[0].nombre,
              apellido: clientes[0].apellido,
              direccion: clientes[0].direccion,
              telefono:clientes[0].telefono
            });
          }
          else{
            this.setState({
              nombre: '',
              apellido: '',
              direccion: '',
              telefono: ''
            });
          }
        });
      }
    }

    busquedaParametros = event => {

        const busqueda =  this.state.buscar;

        axios.get("http://localhost:8000/api/consultaCheckOutId/" + busqueda).then(rest => {
          const asignaciones = rest.data;
          if(asignaciones.length > 0){
          this.setState({asignaciones});
          }
          else{
            this.abrirAlertTabla();
          }

          axios.get("http://localhost:8000/api/consultaClientesId/" + busqueda).then(rest => {
            const clientes = rest.data;

              this.setState({
                idCli: clientes[0].id,
                nombre: clientes[0].nombre,
                apellido: clientes[0].apellido,
                direccion: clientes[0].direccion,
                telefono:clientes[0].telefono
              });
          })

          axios.get('http://127.0.0.1:8000/api/consultaFacturas').then(res=>{
              this.setState({facturas:res.data, idFactura:res.data.length});
            })
        });
    }

  render() {
    return (
          <div>
          <Principal />
          <h2 style={{fontStyle: 'italic', marginLeft: 50}}><PeopleAltIcon style={{fontSize:40}}/> Habitaciones Ocupadas</h2>
          <Grid container spacing={10}>
          <Grid item xs={3}>
          <TextField
            label="Ingrese la cedula o pasaporte del cliente"
            value={this.state.buscar}
            onChange={this.handleChange}
            fullWidth
            margin="normal"
            style={{marginLeft:50}}
            type="text" name="id"
          />
          </Grid>
          <Grid item xs={3}>
          <Button style={{marginTop:22}} onClick={this.busquedaParametros} color="primary">
            Consultar
          </Button>
          </Grid>
          </Grid>
          {this.state.asignaciones.map((asignacion, key)=> <Grid item xs={5} style={{display: 'inline-block', marginTop: 30,marginLeft:50}}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Check Out"
                height="140"
                widht='210'
                image={checkout}
                title="Check Out"
              />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {asignacion.idHabitacion}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                Id Cliente:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {asignacion.idCliente}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
          <Button onClick={() => {this.setState({idHabitacion:asignacion.idHabitacion, idCliente:asignacion.idCliente, fechaEntrada:asignacion.fechaEntrada, id:asignacion.id, mostrarDialogo:true})}} size="small" color="primary">
            Check Out
          </Button>          
      </CardActions>
    </Card>
    </Grid> )}
    <br></br>
    <br></br>
    { this.state.mostrarFactura ?
    <Button onClick={()=>{this.setState({mostrarDialogoFactura:true})}} style={{marginLeft:50}} size="medium" color="primary" variant="contained">
      Factura
    </Button> :''}

    <Dialog
        fullScreen
        open={this.state.mostrarDialogoFactura}
        onClose={this.handleCloseFactura}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <AppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.handleCloseFactura} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" >
              Cerrar
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogTitle style={{marginTop:50, textAlign:'center'}} id="alert-dialog-title">Factura</DialogTitle>
        <Box align="center" width="45%" boxShadow={3} borderColor="#3f51b5" bgcolor="background.paper"
            color="text.primary" p={2} mx='auto' border={3}>
        <DialogContent>
          <Grid container>
          <Grid item xs={6}>
          <Typography style={{fontSize:25, fontWeight:900}}>HOTEL</Typography>
          <Typography style={{fontSize:25, fontStyle: 'italic', fontWeight:900}}>"ORO NEGRO"</Typography>
          <Typography style={{fontSize:12, fontWeight:700}}>SERVICIO DE HOSPEDAJE EN HOTELES</Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography style={{fontSize:12, textAlign:'right'}}>Castillo Rosales Maria Eufemia</Typography>
          <Typography style={{fontSize:12, fontWeight:700, textAlign:'right'}}>Dir. Av. Quito 262 y</Typography>
          <Typography style={{fontSize:12, fontWeight:700, textAlign:'right'}}>Pasaje Gonzanama</Typography>
          <Typography style={{fontSize:12, fontWeight:700, textAlign:'right'}}>Telf. 062-830-174</Typography>
          <Typography style={{fontSize:12, textAlign:'right'}}>LAGO AGRIO - SUCUMBIOS - ECUADOR</Typography>
          </Grid>
          </Grid>
          <br></br>
          <Box align="center" width="95%" borderColor="#3f51b5" bgcolor="background.paper"
              color="text.primary" p={2} mx='auto' border={2}>
          <Grid container>
          <Grid item xs={5}>
          <Typography style={{fontSize:20, fontWeight:500}}>RUC. 1101170494001</Typography>
          <Typography style={{fontSize:25, fontStyle: 'italic', fontWeight:1000}}>FACTURA</Typography>
          </Grid>
          <Grid item xs={2}>
          <Typography style={{fontSize:14, textAlign:'center'}}>Serie:</Typography>
          <Typography style={{fontSize:14, textAlign:'center'}}>001-001</Typography>
          <Typography style={{fontSize:14, textAlign:'center'}}>00</Typography>
          </Grid>
          <Grid item xs={5}>
          <Typography style={{fontSize:30, textAlign:'center', color:'red'}}>Nº {this.state.idFactura}</Typography>
          <Typography style={{fontSize:20, textAlign:'center', fontColor:'red'}}>AUT.SRI 1125582016</Typography>
          </Grid>
          </Grid>
          </Box>
          <br></br>

          <Grid>
          <Box align="center" width="97.5%" borderColor="#3f51b5" bgcolor="background.paper"
              color="text.primary" p={1} mx='auto' border={2}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Typography style={{fontSize:12, marginTop:5,textAlign:'left', fontWeight:700}}>Nombre:</Typography>
                </Grid>
                <Grid item xs={3}>
                <InputBase
                box-sizing='border-box'
                margin='none'
                  value={this.state.nombre} onChange={this.setNombre}
                  style={{marginLeft:-200,font:'small-caption', color:'black'
              }}
                 inputProps={{ 'aria-label': 'naked' }}
               />
               </Grid>
               <Grid item xs={3}>
              <Typography style={{fontSize:12, marginTop:5,textAlign:'left', fontWeight:700}}>Apellido:</Typography>
              </Grid>
              <Grid item xs={3}>
               <InputBase
               box-sizing='border-box'
                 value={this.state.apellido} onChange={this.setApellido}
                 style={{ marginLeft:-200, font:'small-caption', color:'black',
                 margin:'none'}}
                inputProps={{ 'aria-label': 'naked' }}
              />
                </Grid>
                </Grid>
          </Box>

          <Box borderTop={0} align="center" width="97.5%" borderColor="#3f51b5" bgcolor="background.paper"
              color="text.primary" p={1} mx='auto' border={2}>
              <Grid container spacing={1}>
                <Grid item xs={1.5}>
                  <Typography style={{fontSize:12, textAlign:'left', marginTop:5, fontWeight:700}}>Dirección:</Typography>
                </Grid>
              <Grid item xs={8}>
              <InputBase

              box-sizing='border-box'
                value={this.state.direccion} onChange={this.setDireccion}
                style={{font:'small-caption',marginLeft:-250, marginTop:-20, color:'black'
            }}
               inputProps={{ 'aria-label': 'naked' }}
             />
              </Grid>
            </Grid>
          </Box>

          <Box borderTop={0} align="center" width="97.5%" borderColor="#3f51b5" bgcolor="background.paper"
              color="text.primary" p={1} mx='auto' border={2}>
              <Grid container spacing={1}>
                <Grid item xs={1}>
                  <Typography style={{fontSize:12, textAlign:'left', marginTop:5,fontWeight:700}}>Fecha:</Typography>
                </Grid>
              <Grid item xs={6}>
                <Typography style={{fontSize:12,marginTop:5, textAlign:'left'}}>{(this.state.fechaSalida).substring(0,10)}</Typography>
              </Grid>
              <Grid item xs={0.5}>
                <Typography style={{fontSize:12, textAlign:'left', marginTop:5,fontWeight:700}}>Telf:</Typography>
              </Grid>
              <Grid item xs={4}>
              <InputBase
              box-sizing='border-box'
                value={this.state.telefono} onChange={this.setTelefono}
                style={{font:'small-caption',marginLeft:-50, marginTop:-5, color:'black'
            }}
               inputProps={{ 'aria-label': 'naked' }}
             />
              </Grid>
            </Grid>
          </Box>

          <Box borderTop={0} align="center" width="97.5%" borderColor="#3f51b5" bgcolor="background.paper"
              color="text.primary" p={1} mx='auto' border={2}>
              <Grid container spacing={1}>
                <Grid item xs={0.5}>
                  <Typography style={{fontSize:12, textAlign:'left', marginTop:5,fontWeight:700}}>RUC</Typography>
                </Grid>
              <Grid item xs={6}>
              <InputBase
              box-sizing='border-box'
                value={this.state.idCli} onChange={this.setIdCli}
                onBlur={(e) => {this.busquedaCliente(e);}}
                style={{font:'small-caption',marginLeft:-150, color:'black'
            }}
               inputProps={{ 'aria-label': 'naked' }}
             />
              </Grid>
            </Grid>
          </Box>
          </Grid>
          <br></br>
          <Box align="center" width="100%" borderColor="#3f51b5" bgcolor="background.paper"
              color="text.primary" mx='auto' border={2.5}>
            <Grid container>

              <Grid item xs={2}>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={2}>
                <Typography style={{fontSize:12, textAlign:'center', fontWeight:700}}>CANT.</Typography>
              </Box>
              </Grid>

            <Grid item xs={6}>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={2}>
                <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>DESCRIPCION</Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
            <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={2}>
                <Typography style={{fontSize:12, textAlign:'center', fontWeight:700}}>V.UNIT</Typography>
            </Box>
            </Grid>
            <Grid item xs={2}>
            <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderTop={0}>
                <Typography style={{fontSize:12, textAlign:'center', fontWeight:700}}>V.TOTAL</Typography>
            </Box>
            </Grid>
          </Grid>
          </Box>

          {this.state.habitacionesCheckout.map((asignacion, key)=>
          <Box align="center" width="100%" borderColor="#3f51b5" bgcolor="background.paper"
              color="text.primary" mx='auto' borderTop={0} border={2.5}>
            <Grid container>

              <Grid item xs={2}>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={2}>
              <br></br>
                <Typography style={{fontSize:12, textAlign:'center'}}>{asignacion.personas_habitacion}</Typography>
              </Box>
              </Grid>

            <Grid item xs={6}>
              <Box widht='100%' borderColor="black" bgcolor="background.paper" borderRight={2}>
                <Box widht='100%' borderColor="black" bgcolor="background.paper" borderLeft={2} style={{marginLeft:-2}}>
                <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>{asignacion.idHabitacion}</Typography>
                </Box>
                <Box widht='100%' borderColor="black" bgcolor="background.paper" borderLeft={2} style={{marginLeft:-2}}>
                <Typography style={{fontSize:12, textAlign:'CENTER'}}>Fecha de Entrada: {asignacion.fechaEntrada}</Typography>
                </Box>
                <Box widht='100%' borderColor="black" bgcolor="background.paper" borderLeft={2} style={{marginLeft:-2}}>
                  <Typography style={{fontSize:12, textAlign:'CENTER'}}>Fecha de Salida: {this.state.fechaSalida}</Typography>
                  <Typography style={{fontSize:12, textAlign:'CENTER'}}>Cantidad Total de Dias: {this.state.contadorDias}</Typography>
                  <Typography style={{fontSize:12, textAlign:'CENTER'}}>ABONO: $ {asignacion.abono}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
            <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={2}>
              <br></br>
                <Typography style={{fontSize:12, textAlign:'center'}}>{asignacion.habitacion.valor}</Typography>
              <br></br>
              <br></br>
            </Box>
            </Grid>
            <Grid item xs={2}>
            <br></br>
                <Typography style={{fontSize:12, textAlign:'center'}}>{asignacion.valorTotal}</Typography>
            </Grid>
          </Grid>
          </Box>)}

          <Box align="center" width="100%" borderColor="#3f51b5" bgcolor="background.paper"
              color="text.primary" mx='auto' borderTop={0} border={2.5}>
            <Grid container>
              <Grid item xs={4}>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={0}>
                <Typography style={{fontSize:12, textAlign:'center', fontWeight:700}}>F. Autorizada</Typography>
              </Box>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={2}>
              <br></br>
              </Box>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={2}>
              <br></br>
              </Box>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={2}>
              <br></br>
              </Box>

              </Grid>
              <Grid item xs={4}>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper">
                <Typography style={{fontSize:12, textAlign:'center', fontWeight:700}}>F. Cliente</Typography>
              </Box>
              </Grid>

            <Grid item xs={2}>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderTop={0} border={2} style={{marginLeft:-2}}>
                <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>SUB.Total 12%</Typography>
              </Box>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderTop={0} border={2} style={{marginLeft:-2}}>
                <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>SUB.Total 0%</Typography>
              </Box>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderTop={0} border={2} style={{marginLeft:-2}}>
                <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>IVA 0%</Typography>
              </Box>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderTop={0} border={2} style={{marginLeft:-2}}>
                <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>IVA 12%</Typography>
              </Box>
              <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderTop={0} borderBottom={0} border={2} style={{marginLeft:-2}}>
                <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>TOTAL</Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
            <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderBottom={2}>
              <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>{this.state.valorTotal}</Typography>
            </Box>
            <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderBottom={2}>
              <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>-</Typography>
            </Box>
            <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderBottom={2}>
              <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>-</Typography>
            </Box>
            <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderBottom={2}>
              <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>{this.state.valorIva}</Typography>
            </Box>
            <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper">
              <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>{this.state.valorPagar}</Typography>
            </Box>
            </Grid>
          </Grid>
          </Box>
          <Typography style={{fontSize:10, textAlign:'left'}}>ORG. ADQUIRIENTE COPIA EMISOR DOCUMENTO CATEGORIZADO NO</Typography>
        </DialogContent>


        <DialogActions>
          <Button onClick={this.cerrarDialogos} color="primary">
            Cancelar
          </Button>


          <Button onClick={this.ingresarFactura} color="primary" autoFocus>
            Confirmar
          </Button>

        </DialogActions>
        </Box>
      </Dialog>


    <Dialog
        open={this.state.mostrarDialogo}
        onClose={this.handleClose0}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Quiere Confirmar la Salida del cliente?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.state.idHabitacion}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cerrarDialogos} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.checkout} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

    <Snackbar open={this.state.open2} autoHideDuration={6000} onClose={this.cerrar}>
    <MuiAlert  onClose={this.cerrar} severity="error">
      No existen datos ingresados.
    </MuiAlert>
    </Snackbar>

    <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.cerrar}>
    <MuiAlert  onClose={this.cerrar} severity="success">
      CHEK-OUT COMPLETADO.
    </MuiAlert>
    </Snackbar>

    <Snackbar open={this.state.open0} autoHideDuration={3000} onClose={this.cerrar}>
    <MuiAlert  onClose={this.cerrar} severity="success">
      Factura ingresada exitosamente.
    </MuiAlert>
    </Snackbar>
     </div>
    );
  }
}

export default CheckOut;
