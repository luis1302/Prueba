<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Facades\Requests;
use app\habitacione;

class habitacionDP extends Controller
{
    //
    public $error = 'Error!, Comunicarse con el administrador';

    public function postHabitacion(Request $request)
   {
     if($this->consultaCodigo($request->input('codigo'))==null){
        $registro = new habitacione();
        $registro->codigo = $request->input('codigo');
        $registro->tipo = $request->input('tipo');
        $registro->valor = $request->input('valor');
        $registro->numero_personas = $request->input('numero_personas');
        $registro->descripcion = $request->input('descripcion');
        $registro->disponibilidad = $request->input('disponibilidad');
        $registro->limpieza = $request->input('limpieza');
        $registro->save();
        return 'Exito';
      }
      else {
        return $this->consultaCodigo($request->input('codigo'));
      }
  }

   public function putHabitacion(Request $request, $codigo)
   {
       try{
       $habitacion=\App\habitacione::where('codigo','=',$codigo);
       $habitacion->update(['tipo'=>$request->input('tipo'),
                            'valor'=>$request->input('valor'),
                            'numero_personas'=>$request->input('numero_personas'),
                            'descripcion'=>$request->input('descripcion'),
                            'disponibilidad'=>$request->input('disponibilidad'),
                            'limpieza'=>$request->input('limpieza')]);
       return 'Cliente actualizado exitosamente';
     }
       catch (Exception $e) {
           report($e);
           return 'Error!, Verifique que los datos esten ingresados correctamente';
       }
   }


   public function borrarHabitacion ($codigo){
       try{
       $habitacion=\App\habitacione::where('codigo','=',$codigo);
       $habitacion->delete();
       return 'Habitacion eliminada exitosamente';
       }
       catch (Exception $e) {
           report($e);
           return $error;
       }
   }

   public function consultaGeneralHabitacion(){
       try{
       $habitacion = \App\habitacione::all();
       return json_encode($habitacion);
      }
       catch (Exception $e) {
       report($e);
       return $error;
      }
   }

   public function consultaCodigo($codigo){
       try{
       $habitacion = \App\habitacione::all();
       $aux = 0;
       $resultado = null;
         for($i = 0;$i < count($habitacion);$i++)
         {
             if($habitacion[$i]->codigo == $codigo)
             {
                 $resultado[$aux] = $habitacion[$i];
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

  function consultaValor($valor){
       try{
       $habitacion = \App\habitacione::all();
       $aux = 0;
       $resultado = null;
         for($i = 0;$i < count($habitacion);$i++)
         {
             if($habitacion[$i]->valor == $valor)
             {
                 $resultado[$aux] = $habitacion[$i];
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

   function consultaDisponibilidad($disponibilidad){
       try{
       $habitacion = \App\habitacione::all();
       $aux = 0;
       $resultado = null;
         for($i = 0;$i < count($habitacion);$i++)
         {
             if($habitacion[$i]->disponibilidad == $disponibilidad)
             {
                 $resultado[$aux] = $habitacion[$i];
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

   function consultaLimpieza($limpieza){
       try{
       $habitacion = \App\habitacione::all();
       $aux = 0;
       $resultado = null;
         for($i = 0;$i < count($habitacion);$i++)
         {
             if($habitacion[$i]->limpieza == $limpieza)
             {
                 $resultado[$aux] = $habitacion[$i];
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
