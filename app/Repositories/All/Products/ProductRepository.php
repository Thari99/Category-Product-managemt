<?php

namespace App\Repositories\All\Products;

use App\Repositories\All\Products\ProductInterface;
use App\Repositories\Base\BaseRepository;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Container\Container as App;

class ProductRepository extends BaseRepository implements ProductInterface
{
    /**
     * Summary of model
     * @var Product
     */
    protected  Model $model;

    public function __construct(App $app)
    {
        parent::__construct($app);
    }

    public function model(): string
    {
        return Product::class;
    }
}
