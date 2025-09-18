import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FormEventHandler } from "react";
import InputError from '@/components/input-error';
import InputLabel from '@/components/ui/InputLabel';
import TextInput from '@/components/ui/TextInput';
import { useForm } from '@inertiajs/react';

type Product = {
  id: number;
  title: string;
  introduction: string;
  description: string;
  image: string;
  category_id: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Product',
        href: dashboard().url,
    },
];

export default function Edit({ product }: { product: Product }) {
    // Initialize form data with the product values from the server
    const { data, setData, patch, processing, errors, reset } = useForm({
        title: product.title || "",
        introduction: product.introduction || "",
        description: product.description || "",
        image: product.image || "",
        category_id: product.category_id || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Send a PATCH request to update the product
        patch(`/products/update/${product.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Edit Product</h1>
                <div className="py-12">
                    <div className="mx-auto max-w-xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <form onSubmit={submit} className="p-6 text-gray-900 space-y-6">

                                {/* Title Input */}
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        placeholder={product.title}  // Default value from product
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e: any) => setData("title", e.target.value)}
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                {/* Introduction Input */}
                                <div>
                                    <InputLabel htmlFor="introduction" value="Introduction" />
                                    <TextInput
                                        id="introduction"
                                        type="text"
                                        name="introduction"
                                        value={data.introduction}
                                        placeholder={product.introduction}  // Default value from product
                                        className="mt-1 block w-full"
                                        onChange={(e: any) => setData("introduction", e.target.value)}
                                    />
                                    <InputError message={errors.introduction} className="mt-2" />
                                </div>

                                {/* Description Input */}
                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextInput
                                        id="description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        placeholder={product.description}  // Default value from product
                                        className="mt-1 block w-full"
                                        onChange={(e: any) => setData("description", e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Image Input */}
                                <div>
                                    <InputLabel htmlFor="image" value="Image" />
                                    <TextInput
                                        id="image"
                                        type="file"
                                        name="image"
                                        placeholder={product.image}  // This will not work directly for file inputs, file input needs to be handled separately
                                        className="mt-1 block w-full"
                                        onChange={(e: any) => setData("image", e.target.files[0])}  // Handling file input
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                {/* Category ID Input */}
                                <div>
                                    <InputLabel htmlFor="category_id" value="Category ID" />
                                    <TextInput
                                        id="category_id"
                                        type="text"  // 'text' is used here, you could use 'number' for number inputs
                                        name="category_id"
                                        value={data.category_id}
                                        placeholder={product.category_id.toString()}  // Default value for category ID
                                        className="mt-1 block w-full"
                                        onChange={(e: any) => setData("category_id", e.target.value)}
                                    />
                                    <InputError message={errors.category_id} className="mt-2" />
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-yellow-500 duration-300 ease-in-out text-white px-6 py-2 rounded-lg hover:bg-yellow-700"
                                    >
                                        {processing ? 'Processing...' : 'Update Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
