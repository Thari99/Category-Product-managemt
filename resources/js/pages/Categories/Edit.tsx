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

type Category = {
  id: number;
  title: string;
  description: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Category',
        href: dashboard().url,
    },
];

export default function Edit({ category }: { category: Category }) {
    // Initialize form data with the product values from the server
    const { data, setData, patch, processing, errors, reset } = useForm({
        title: category.title || "",
        description: category.description || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Send a PATCH request to update the product
        patch(`/category/update/${category.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Edit Category</h1>
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
                                        placeholder={category.title}  // Default value from product
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e: any) => setData("title", e.target.value)}
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>



                                {/* Description Input */}
                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextInput
                                        id="description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        placeholder={category.description}  // Default value from product
                                        className="mt-1 block w-full"
                                        onChange={(e: any) => setData("description", e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
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
