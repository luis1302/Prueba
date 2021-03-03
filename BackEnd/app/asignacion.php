<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class asignacion extends Model
{
    //
    public $timestamps = false;
    protected $fillable = ['id','idCliente','idHabitacion','personas_habitacion','estado','fechaEntrada','horaEntrada','fechaSalida','horaSalida'];
}
