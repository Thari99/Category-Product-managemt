<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    protected $fillable = ['title', 'introduction', 'description', 'image', 'category_id'];
    use HasFactory;

    // Define the relationship
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
