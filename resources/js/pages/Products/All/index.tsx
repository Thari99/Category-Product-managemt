import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Products',
        href: dashboard().url,
    },
];

export default function Products({
    products,
}: {
    products: Array<{ id: number; title: string; introduction: string; description: string; image: string; category_id: number }>;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link
                    //href={route('categories.create')}
                    href="/products/create"
                    className="rounded-lg bg-yellow-500 w-1/6 px-4 py-2 text-white duration-300 ease-in-out hover:bg-yellow-700"
                >
                    Create Product
                </Link>
                <div className="py-12">
                    <div className="mx-auto">
                        <div className=" bg-white shadow-sm sm:rounded-lg width-full">
                            <div className="p-9 text-gray-900">
                                <h1 className="mb-4 text-xl font-bold">Categories</h1>

                                {products && products.length > 0 ? (
                                    <table className="min-w-full divide-y divide-x">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                                >
                                                    ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                                >
                                                    Title
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                                >
                                                    Introduction
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                                >
                                                    Description
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                                >
                                                    Category ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {products.map((cat) => (
                                                <tr key={cat.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{cat.id}</td>
                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{cat.title}</td>

                                                    {/* description: use truncate (single line) or line-clamp-2 (multi-line clamp plugin) */}
                                                    <td className="max-w-[40rem] px-6 py-4 text-sm whitespace-normal text-gray-600">
                                                        <div className="overflow-hidden text-ellipsis">
                                                            {/* If you have the line-clamp plugin you can use "line-clamp-2" instead */}
                                                            <span className="block truncate">{cat.description || '-'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{cat.introduction}</td>

                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{cat.category_id}</td>
                                                    <td className="px-6 py-4 text-right text-sm whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-3">
                                                            <Link
                                                                //href={route('categories.edit', cat.id)}
                                                                href={`/products/show/${cat.id}`}
                                                                className="rounded-md px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
                                                            >
                                                                View
                                                            </Link>
                                                            <Link
                                                                //href={route('categories.destroy', cat.id)}
                                                                href={`/products/delete/${cat.id}`}
                                                                method="delete"
                                                                as="button"
                                                                onClick={(e) => {
                                                                    if (!confirm('Delete this category?')) {
                                                                        e.preventDefault(); // cancel
                                                                    }
                                                                }}
                                                                className="rounded-md px-3 py-1 text-sm font-medium text-red-600 hover:bg-blue-50 hover:text-blue-800"
                                                            >
                                                                Delete
                                                            </Link>

                                                            <Link
                                                                //href={route('categories.edit', cat.id)}
                                                                href={`/products/edit/${cat.id}`}
                                                                className="rounded-md px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
                                                            >
                                                                Edit
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div>No products yet.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
