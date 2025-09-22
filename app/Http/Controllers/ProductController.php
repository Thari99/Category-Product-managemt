<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\All\Products\ProductInterface;
use App\Repositories\All\Categories\CategoryInterface;
class ProductController extends Controller

{
    protected $ProductInterface;
    protected $CategoryInterface;

    public function __construct(ProductInterface $ProductInterface, CategoryInterface $CategoryInterface)
    {
        $this->ProductInterface = $ProductInterface;
        $this->CategoryInterface = app(CategoryInterface::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ProductInterface = app(ProductInterface::class);
        $products =$ProductInterface->all();
        return Inertia::render('Products/All/index',['products'=>$products]);
    }
    public function create()
    {
    $CategoryInterface = app(CategoryInterface::class);
    $categories = $this->CategoryInterface->all();

    return Inertia::render('Products/Create', ['categories' => $categories]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'introduction' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id'
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $data['image'] = $imagePath;
        }

        $this->ProductInterface->create($data);

        return redirect()->route('products.index')->with('message', 'Product created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ProductInterface = app(ProductInterface::class);
        $product = $ProductInterface->find($id);

        if ($product && $product->image) {
            $product->image = asset('storage/' . $product->image);
        }

        return Inertia::render('Products/View', ['product' => $product]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //dd($id);
        $ProductInterface = app(ProductInterface::class);
        $product = $ProductInterface->find($id);
        return Inertia::render('Products/Edit', ['product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //dd($id);
        //dd($request->all());
        $ProductInterface = app(ProductInterface::class);
        $ProductInterface->update($request->all(),$id );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //dd($id);
        $ProductInterface = app(ProductInterface::class);
        $ProductInterface->delete($id);
        return redirect()->back();
    }
}
