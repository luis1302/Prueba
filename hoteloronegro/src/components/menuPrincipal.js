import React, { Component } from 'react';
import {Link} from "react-router-dom";
import logo from '../images/LogoHotel3.svg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HotelIcon from '@material-ui/icons/Hotel';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArchiveIcon from '@material-ui/icons/Archive';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
class Principal extends Component{
  constructor() {
  super();
  this.state={
    open:false,
    openHabitacion:false,
    openInforme:false,
    openRecepcion: false,
    openAdministracion: false,
    openLogin:false,
    openUsuarios:false,
    mouseX:0,
    rol: ''
  }
  this.handleClose=this.handleClose.bind(this);
  this.handleOpen=this.handleOpen.bind(this);
  this.handleCloseHabi=this.handleCloseHabi.bind(this);
  this.handleOpenHabi=this.handleOpenHabi.bind(this);
  this.handleCloseInforme=this.handleCloseInforme.bind(this);
  this.handleOpenInforme=this.handleOpenInforme.bind(this);
  this.handleCloseAdministracion=this.handleCloseAdministracion.bind(this);
  this.handleOpenAdministracion=this.handleOpenAdministracion.bind(this);
  this.handleCloseRecepcion=this.handleCloseRecepcion.bind(this);
  this.handleOpenRecepcion=this.handleOpenRecepcion.bind(this);
  this.handleOpenLogin=this.handleOpenLogin.bind(this);
  this.handleCloseLogin=this.handleCloseLogin.bind(this);
  this.handleOpenUsuarios=this.handleOpenUsuarios.bind(this);
  this.handleCloseUsuarios=this.handleCloseUsuarios.bind(this);
}

componentWillMount() {
  const rol = sessionStorage.getItem('rol');
  this.setState({rol});
}

handleOpen(event){
  event.preventDefault();
    this.setState({
      mouseX: event.clientX - 40,
    });
    this.setState({open:true});
}
handleClose(){
this.setState({open:false});
}

handleOpenHabi(event) {
  event.preventDefault();
    this.setState({
      mouseX: event.clientX - 40,
    });
    this.setState({openHabi:true});
}
handleCloseHabi(){
this.setState({openHabi:false});
}

handleOpenInforme(event) {
  event.preventDefault();
    this.setState({
      mouseX: event.clientX - 40,
    });
    this.setState({openInforme:true});
}
handleCloseInforme(){
this.setState({openInforme:false});
}

handleOpenAdministracion(event) {
  event.preventDefault();
    this.setState({
      mouseX: event.clientX - 40,
    });
    this.setState({openAdministracion:true});
}
handleCloseAdministracion(){
this.setState({openAdministracion:false});
}

handleOpenRecepcion(event) {
  event.preventDefault();
    this.setState({
      mouseX: event.clientX - 40,
    });
    this.setState({openRecepcion:true});
}
handleCloseRecepcion(){
this.setState({openRecepcion:false});
}

handleOpenLogin(event) {
  event.preventDefault();
    this.setState({
      mouseX: event.clientX - 40,
    });
    this.setState({openLogin:true});
}
handleCloseLogin(){
this.setState({openLogin:false});
}

handleOpenUsuarios(event) {
  event.preventDefault();
    this.setState({
      mouseX: event.clientX - 40,
    });
    this.setState({openUsuarios:true});
}
handleCloseUsuarios(){
this.setState({openUsuarios:false});
}

    render() {
      return (
        <div>
        <AppBar position="static" color="palette.info.main" style={{backgroundColor:'#e65100'}}>
          <Toolbar style={{justifyContent: 'flex-start'}}>
          <Link style={{textDecoration:'none'}} to='principal'><img src={logo} height="30" alt="logo"/></Link>
          <Button aria-controls="simple-menu" aria-haspopup="true" style={{color:'white', marginLeft:50}} onClick={this.handleOpen}>
          <PersonPinIcon/>
            Clientes
          </Button>
             <Menu
             id="simple-menu"
             open={this.state.open}
             onClose={this.handleClose}
             anchorReference="anchorPosition"
             anchorPosition={
                this.state.mouseX !== null ? { top: 5, left: this.state.mouseX } : undefined
              }
             >
             <MenuItem onClick={this.handleClose}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/cliente'>Ingresar Clientes</Link></MenuItem>
             <MenuItem onClick={this.handleClose}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/admCliente'>Administración Cliente</Link></MenuItem>
             </Menu>

              <Button aria-controls="simple-menu" aria-haspopup="true" style={{color:'white', marginLeft:80}} onClick={this.handleOpenHabi}>
              <HotelIcon />
                Habitaciones
              </Button>
               <Menu
                 id="simple-menu2"
                 open={this.state.openHabi}
                 onClose={this.handleCloseHabi}
                 anchorReference="anchorPosition"
                 anchorPosition={
                    this.state.mouseX !== null ? { top: 5, left: this.state.mouseX } : undefined
                  }
               >
               {
                 this.state.rol === 'admin'?
                 <MenuItem onClick={this.handleCloseHabitacion}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/habitacion'>Ingresar Habitación</Link></MenuItem>: ''
              }
                 <MenuItem onClick={this.handleCloseHabitacion}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/admHabitacion'>Administrar Habitación</Link></MenuItem>
               </Menu>


              <Button aria-controls="simple-menu" aria-haspopup="true" style={{color:'white', marginLeft:80}} onClick={this.handleOpenAdministracion}>
              <AssignmentTurnedInIcon />
                Administración
              </Button>
               <Menu
                 id="simple-menu2"
                 open={this.state.openAdministracion}
                 onClose={this.handleCloseAdministracion}
                 anchorReference="anchorPosition"
                 anchorPosition={
                    this.state.mouseX !== null ? { top: 5, left: this.state.mouseX } : undefined
                  }
               >
               <MenuItem onClick={this.handleCloseAdministracion}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/asignar'>Asignar Habitaciones</Link></MenuItem>
               <MenuItem onClick={this.handleCloseAdministracion}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/consultaAsignaciones'>Administrar Asignaciones</Link></MenuItem>
               {
                 this.state.rol === 'admin'?
               <MenuItem onClick={this.handleCloseAdministracion}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/kardexDiario'>Kardex Diario</Link></MenuItem>: ''
            }
               <MenuItem onClick={this.handleCloseAdministracion}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/CheckOUT'>Check Out</Link></MenuItem>

               </Menu>

             <Button aria-controls="simple-menu" aria-haspopup="true" style={{color:'white', marginLeft:80}} onClick={this.handleOpenInforme}>
             <AssignmentIcon/>
               Facturas
             </Button>
              <Menu
                id="simple-menu2"
                open={this.state.openInforme}
                onClose={this.handleCloseInforme}
                anchorReference="anchorPosition"
                anchorPosition={
                   this.state.mouseX !== null ? { top: 5, left: this.state.mouseX } : undefined
                 }
              >
              <MenuItem onClick={this.handleCloseInforme}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/admFacturas'>Administración de Facturas</Link></MenuItem>
              {
                this.state.rol === 'admin'?
              <MenuItem onClick={this.handleCloseInforme}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/kardexFacturas'>Kardex Facturas</Link></MenuItem>: ''
           }
              </Menu>

               <Button aria-controls="simple-menu" aria-haspopup="true" style={{color:'white', marginLeft:80}} onClick={this.handleOpenRecepcion}>
               <ArchiveIcon />
                 Reservas
               </Button>
                <Menu
                  id="simple-menu2"
                  open={this.state.openRecepcion}
                  onClose={this.handleCloseRecepcion}
                  anchorReference="anchorPosition"
                  anchorPosition={
                     this.state.mouseX !== null ? { top: 5, left: this.state.mouseX } : undefined
                   }
                >
                  <MenuItem onClick={this.handleCloseRecepcion}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/reservas'>Ingresar Reservas</Link></MenuItem>
                  <MenuItem onClick={this.handleCloseRecepcion}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/admreservas'>Administración de Reservas</Link></MenuItem>
                  <MenuItem onClick={this.handleCloseRecepcion}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/reservasDiarias'>Reservas Diarias</Link></MenuItem>

                </Menu>
                {
                  this.state.rol === 'admin'?
                  <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" style={{color:'white', marginLeft:60}} onClick={this.handleOpenUsuarios}>
                <SupervisedUserCircleIcon />
                  Usuarios
                </Button>
                 <Menu
                   id="simple-menu2"
                   open={this.state.openUsuarios}
                   onClose={this.handleCloseUsuarios}
                   anchorReference="anchorPosition"
                   anchorPosition={
                      this.state.mouseX !== null ? { top: 5, left: this.state.mouseX } : undefined
                    }
                 >
                   <MenuItem onClick={this.handleCloseUsuarios}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/usuarios'>Ingresar Usuarios</Link></MenuItem>
                   <MenuItem onClick={this.handleCloseUsuarios}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/admUsuarios'>Administración de Usuarios</Link></MenuItem>
                 </Menu>
                 </div>: ''
              }


                <Avatar alt="Remy Sharp" style={{backgroundColor:'white',marginLeft:350}} onClick={this.handleOpenLogin}>
                  <PersonIcon style={{color:'#e65100'}}/>
                </Avatar>
                <Menu
                  id="simple-menu2"
                  open={this.state.openLogin}
                  onClose={this.handleCloseLogin}
                  anchorReference="anchorPosition"
                  anchorPosition={
                     this.state.mouseX !== null ? { top: 5, left: this.state.mouseX } : undefined
                   }
                >
                  <MenuItem onClick={this.handleCloseLogin}><Link style={{color: '#0d47a1', textDecoration:'none'}} to='/login'><ExitToAppIcon/>Salir</Link></MenuItem>
                </Menu>
          </Toolbar>
      </AppBar>
      </div>


    );

    }
}
export default Principal;
