<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Facades\Requests;
use app\cliente;

class clienteDP extends Controller
{
    //
    public $error = 'Error!, Comunicarse con el administrador';

    public function post(Request $request)
   {
     if($this->consultaId($request->input('id'))==null){
        $registro = new cliente();
        $registro->id = $request->input('id');
        $registro->nombre = $request->input('nombre');
        $registro->apellido = $request->input('apellido');
        $registro->direccion = $request->input('direccion');
        $registro->telefono = $request->input('telefono');
        $registro->correo = $request->input('correo');
        $registro->save();
        return 'Exito';
      }
    else {
      return $this->consultaId($request->input('id'));
    }
  }

   public function put(Request $request, $id)
   {
       try{
       $cliente=\App\cliente::findOrFail($id);
       $cliente ->nombre=$request->input('nombre');
       $cliente ->apellido=$request->input('apellido');
       $cliente ->telefono=$request->input('telefono');
       $cliente ->direccion=$request->input('direccion');
       $cliente ->correo=$request->input('correo');
       $cliente->save();
       return 'Cliente actualizado exitosamente';}
       catch (Exception $e) {
           report($e);
           return 'Error!, Verifique que los datos esten ingresados correctamente';
       }

   }

   public function delete ($id){
       try{
       $cliente=\App\cliente::findOrFail($id);
       $cliente->delete();
       return 'Usuario eliminado exitosamente';
       }
       catch (Exception $e) {
           report($e);
           return $error;
       }
   }

   public function consultaGeneral(){
       try{
       $cliente = \App\cliente::all();
       return json_encode($cliente);
      }
       catch (Exception $e) {
       report($e);
       return $error;
      }
   }

   public function consultaId($id){
       try{
       $cliente = \App\cliente::all();
       $aux = 0;
       $resultado = null;
         for($i = 0;$i < count($cliente);$i++)
         {
             if($cliente[$i]->id == $id)
             {
                 $resultado[$aux] = $cliente[$i];
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

   function consultaNombre($nombre){
       try{
       $cliente = \App\cliente::all();
       $aux = 0;
       $resultado = null;
         for($i = 0;$i < count($cliente);$i++)
         {
             if($cliente[$i]->nombre == $nombre)
             {
                 $resultado[$aux] = $cliente[$i];
                 $aux++;
             }
         }
         if($resultado != null){
         return json_encode($resultado);
          }
         else return false;
       }
       catch (Exception $e) {
           report($e);
           return $error;
       }
   }

   function consultaApellido($apellido){
       try{
       $cliente = \App\cliente::all();
       $aux = 0;
       $resultado = null;
         for($i = 0;$i < count($cliente);$i++)
         {
             if($cliente[$i]->apellido == $apellido)
             {
                 $resultado[$aux] = $cliente[$i];
                 $aux++;
             }
         }
         if($resultado!=null){
         return json_encode($resultado);
         }
         else return false;
       }
       catch (Exception $e) {
           report($e);
           return $error;
       }
   }
}
