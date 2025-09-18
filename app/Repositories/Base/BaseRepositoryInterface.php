<?php

namespace App\Repositories\Base;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface BaseRepositoryInterface
{
    /**
     * get all models
     * @param array $columns
     * @param array $relations
     * @return Collection
     */

    public function all(array $columns = ['*'], array $relations = []): Collection;

    public function paginate(int $perPage = 15, array $columns = ['*']): LengthAwarePaginator;

    public function find($id, array $columns = ['*']);

    public function first(array $where = [], array $columns = ['*']);

    public function findByField(string $field, $value, array $columns = ['*']);

    public function findWhere(array $where, array $columns = ['*']): Collection;

    public function create(array $attributes);

    public function update(array $attributes, $id);

    public function delete($id): bool;

    public function with(array $relations): self;

    public function orderBy(string $column, string $direction = 'asc'): self;

    public function count(array $where = []): int;

    public function pluck(string $column, ?string $key = null);
}
