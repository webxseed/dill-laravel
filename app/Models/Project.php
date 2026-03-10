<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'summary',
        'detail',
        'funding',
        'period',
        'status',
        'sort_order',
    ];
}
