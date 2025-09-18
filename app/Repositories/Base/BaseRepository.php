<?php

namespace App\Repositories\Base;

use Illuminate\Container\Container as App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use InvalidArgumentException;

abstract class BaseRepository implements BaseRepositoryInterface
{
    /**
     * @var App
     */
    protected App $app;

    /**
     * @var Model
     */
    protected Model $model;

    /**
     * Query instance (used for chaining with()/orderBy())
     *
     * @var \Illuminate\Database\Eloquent\Builder|null
     */
    protected $query = null;

    public function __construct(App $app)
    {
        $this->app = $app;
        $this->makeModel();
    }

    /**
     * Child classes must return the model class, e.g. \App\Models\User::class
     *
     * @return string
     */
    abstract public function model(): string;

    /**
     * Instantiate and set the model instance.
     *
     * @return void
     *
     * @throws InvalidArgumentException
     */
    protected function makeModel(): void
    {
        $modelClass = $this->model();
        $model = $this->app->make($modelClass);

        if (!$model instanceof Model) {
            throw new InvalidArgumentException("Class {$modelClass} must be an instance of Illuminate\\Database\\Eloquent\\Model");
        }

        $this->model = $model;
        $this->resetQuery();
    }

    /**
     * Reset the internal query builder to a fresh model query.
     */
    protected function resetQuery(): void
    {
        $this->query = $this->model->newQuery();
    }
    /**
     * Summary of all
     * @param array $columns
     * @param array $where
     * @return Collection
     */
    public function all(array $columns = ['*'], array $where = []): Collection
    {
        $result = $this->query->get($columns);
        $this->resetQuery();
        return $result;
    }

    public function paginate(int $perPage = 15, array $columns = ['*']): LengthAwarePaginator
    {
        $result = $this->query->paginate($perPage, $columns);
        $this->resetQuery();
        return $result;
    }

    public function find($id, array $columns = ['*'])
    {
        $result = $this->query->find($id, $columns);
        $this->resetQuery();
        return $result;
    }

    public function first(array $where = [], array $columns = ['*'])
    {
        $q = $this->query;
        if (!empty($where)) {
            $q = $q->where($where);
        }
        $result = $q->first($columns);
        $this->resetQuery();
        return $result;
    }

    public function findByField(string $field, $value, array $columns = ['*'])
    {
        $result = $this->query->where($field, $value)->first($columns);
        $this->resetQuery();
        return $result;
    }

    public function findWhere(array $where, array $columns = ['*']): Collection
    {
        $result = $this->query->where($where)->get($columns);
        $this->resetQuery();
        return $result;
    }

    public function create(array $attributes)
    {
        $result = $this->model->create($attributes);
        $this->resetQuery();
        return $result;
    }

    public function update(array $attributes, $id)
    {
        $model = $this->find($id);
        if (!$model) {
            return null;
        }
        $model->update($attributes);
        $this->resetQuery();
        return $model;
    }

    public function delete($id): bool
    {
        $model = $this->find($id);
        if (!$model) {
            return false;
        }
        $deleted = (bool) $model->delete();
        $this->resetQuery();
        return $deleted;
    }

    public function with(array $relations): self
    {
        $this->query = $this->query->with($relations);
        return $this;
    }

    public function orderBy(string $column, string $direction = 'asc'): self
    {
        $this->query = $this->query->orderBy($column, $direction);
        return $this;
    }

    public function count(array $where = []): int
    {
        $q = $this->model->newQuery();
        if (!empty($where)) {
            $q->where($where);
        }
        return $q->count();
    }

    public function pluck(string $column, ?string $key = null)
    {
        $result = $this->model->newQuery()->pluck($column, $key);
        return $result;
    }
}
