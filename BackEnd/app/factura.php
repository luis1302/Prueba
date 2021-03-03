<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class factura extends Model
{
    //
    public $timestamps = false;
    protected $fillable = ['id','idCliente','nombre','apellido','fechaEmision','subtotal','iva','total','estado'];
}
