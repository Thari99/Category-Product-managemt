<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    protected $fillable = ['title', 'description'];

    use HasFactory;

    // Define the relationship
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
