
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product Create',
        href: dashboard().url,
    },
];

interface Category {
    id: number;
    title: string;
    description: string;
}

interface Props {
    categories: Category[];
}

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        introduction: "",
        description: "",
        image: null as File | null,
        category_id:""
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('introduction', data.introduction);
        formData.append('description', data.description);
        if (data.image) {
            formData.append('image', data.image);
        }
        formData.append('category_id', data.category_id);

        post('/products', {
            forceFormData: true,
        });
    };

    console.log (categories);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="py-12">
                <div className="mx-auto max-w-xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={submit}
                            className="p-6 text-gray-900 space-y-6"
                        >
                            <div>
                                <InputLabel htmlFor="title" value="Title" />

                                <TextInput
                                    id="title"
                                    type="text"
                                    name="name"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e: any) =>
                                        setData("title", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="introduction"
                                    value="Introduction"
                                />

                                <TextInput
                                    id="introduction"
                                    type="text"
                                    name="introduction"
                                    value={data.introduction}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e : any) =>
                                        setData("introduction", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.introduction}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="description" value="Description" />

                                <TextInput
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e: any) =>
                                        setData("description", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="image"
                                    value="Image"
                                />

                                <input
                                    id="image"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setData("image", e.target.files?.[0] || null)
                                    }
                                />

                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="category_id"
                                    value="Category"
                                />

                                <select
                                    id="category_id"
                                    name="category_id"
                                    value={data.category_id}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={(e) => setData("category_id", e.target.value)}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.title}
                                        </option>
                                    ))}
                                </select>

                                <InputError
                                    message={errors.category_id}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-yellow-500 duration-300 ease-in-out text-white px-6 py-2 rounded-lg hover:bg-yellow-700"
                                >
                                    Submit
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
