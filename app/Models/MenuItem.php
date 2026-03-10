<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = ['menu', 'label', 'path', 'sort_order', 'is_visible'];
}
