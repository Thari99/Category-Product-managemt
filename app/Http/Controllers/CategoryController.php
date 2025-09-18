<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\All\Categories\CategoryInterface;

class CategoryController extends Controller
{
    protected $categoryRepository;

    public function __construct(CategoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$categories = $this->categoryRepository->all();
        //return Inertia::render('dashboard', compact('categories'));
        $categories = $this->categoryRepository->all();
        return Inertia::render('dashboard', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $categoryRepository = app(CategoryInterface::class);
        $categoryRepository->create($request->all());
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //dd($id);
        $categoryRepository = app(CategoryInterface::class);
        $category = $categoryRepository->find($id);
        return Inertia::render('Categories/Edit', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //dd($id);
        //dd($request->all());
        $categoryRepository = app(CategoryInterface::class);
        $categoryRepository->update($request->all(),$id );
    }

    /**
     * Remove the specified resource from storage.
    */
    public function destroy(string $id)
    {
        $categoryRepository = app(CategoryInterface::class);
        $categoryRepository->delete($id);
        return redirect()->back();
    }

}
