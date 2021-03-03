import React, { Component } from 'react';
import Principal from './menuPrincipal';
import principal from '../images/principal.jpg';
import principal3 from '../images/principal3.jpg';
import Grid from '@material-ui/core/Grid';

import CssBaseline from '@material-ui/core/CssBaseline';

class Inicio extends Component {


  render() {
    return (
          <div>

          <Principal/>
          <CssBaseline />
          <Grid container spacing={4}>
          <Grid item sm={6}>
          <img src={principal3} alt="imagen1"/>

          </Grid>
          <Grid item sm={6}>
          <img src={principal} alt="imagen2"/>
          </Grid>
          </Grid>
          </div>
    );
  }
}

export default Inicio;
