<?php

namespace App\Repositories\All\Categories;

use App\Repositories\All\Categories\CategoryInterface;
use App\Repositories\Base\BaseRepository;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Container\Container as App;

class CategoryRepository extends BaseRepository implements CategoryInterface
{
    /**
     * Summary of model
     * @var Category
     */
    protected  Model $model;

    public function __construct(App $app)
    {
        parent::__construct($app);
    }

    public function model(): string
    {
        return Category::class;
    }
}
