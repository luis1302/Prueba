<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Facades\Requests;
use App\factura;

class facturaDP extends Controller
{
    //
    public function postFactura(Request $request)
   {
        $registro = new factura();
        $registro->id=$request->input('idFactura');
        $registro->idCliente = $request->input('idCli');
        $registro->nombre = $request->input('nombre');
        $registro->apellido = $request->input('apellido');
        $registro->fechaEmision = substr($request->input('fechaSalida'), 0, 10);
        $registro->subtotal = $request->input('valorTotal');
        $registro->iva = $request->input('valorIva');
        $registro->total = $request->input('valorPagar');
        $registro->estado = $request->input('estado');
        $registro->save();
        return 'Exito';
  }

  public function consultaGeneralFactura(){
      try{
      $factura = \App\factura::all();
      return json_encode($factura);
     }
      catch (Exception $e) {
      report($e);
      return $error;
     }
  }

  public function kardexFacturas($fechaEntrada){
      try{
      $factura = \App\factura::all();
      $aux = 0;
      $fecha=substr($fechaEntrada, 0, 10);
      $resultado = null;
        for($i = 0;$i < count($factura);$i++)
        {
            if($factura[$i]->fechaEmision == $fecha)
            {
                $resultado[$aux] = $factura[$i];
                $aux++;
            }
        }
        if($resultado != null){
           return json_encode($resultado);
         }
       else return false;
     }
     catch (Exception $e){
      report($e);
      return $error;
    }
  }
/*
  public function anularFactura ($id){
      try{
      $cliente=\App\facturas::findOrFail($id);
      $cliente ->estado='Anulada';
      $cliente->save();
      return 'Usuario eliminado exitosamente';
      }
      catch (Exception $e) {
          report($e);
          return $error;
      }
  }*/

  public function anularFactura($id)
  {
      try{
      $factura=\App\factura::where('id','=',$id);
      $factura->update(['estado'=>'Anulada']);
      return 'Cliente actualizado exitosamente';
    }
      catch (Exception $e) {
          report($e);
          return 'Error!, Verifique que los datos esten ingresados correctamente';
      }
  }

  public function facturaIdCliente($idCliente){
      try{
      $factura = \App\factura::all();
      $aux = 0;
      $resultado = null;
        for($i = 0;$i < count($factura);$i++)
        {
            if($factura[$i]->idCliente == $idCliente)
            {
                $resultado[$aux] = $factura[$i];
                $aux++;
            }
        }
        if($resultado != null){
           return json_encode($resultado);
         }
       else return false;
     }
     catch (Exception $e){
      report($e);
      return $error;
    }
  }

  public function facturaId($id){
      try{
      $factura = \App\factura::all();
      $aux = 0;
      $resultado = null;
        for($i = 0;$i < count($factura);$i++)
        {
            if($factura[$i]->id == $id)
            {
                $resultado[$aux] = $factura[$i];
                $aux++;
            }
        }
        if($resultado != null){
           return json_encode($resultado);
         }
       else return false;
     }
     catch (Exception $e){
      report($e);
      return $error;
    }
  }

  public function facturaEstado($estado){
      try{
      $factura = \App\factura::all();
      $aux = 0;
      $resultado = null;
        for($i = 0;$i < count($factura);$i++)
        {
            if($factura[$i]->estado == $estado)
            {
                $resultado[$aux] = $factura[$i];
                $aux++;
            }
        }
        if($resultado != null){
           return json_encode($resultado);
         }
       else return false;
     }
     catch (Exception $e){
      report($e);
      return $error;
    }
  }

}
