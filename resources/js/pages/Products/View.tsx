import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Product {
  id: number;
  title: string;
  introduction: string;
  description: string;
  image: string | null;
  category_id: number;
}

interface Props {
  product: Product;
}

export default function ProductView({ product }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: dashboard().url,
    },
    {
      title: 'Products',
      href: '/products/index',
    },
    {
      title: product.title,
      href: `/products/show/${product.id}`,
    },
  ];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={product.title} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-xl overflow-hidden">
            {/* Image Banner */}
            <div className="w-full h-[400px] relative bg-gray-100">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            <div className="p-8">
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

              {/* Introduction */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Introduction</h2>
                <p className="text-gray-600 italic">{product.introduction}</p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
                <p className="text-gray-800 whitespace-pre-wrap">{product.description}</p>
              </div>

              {/* Category */}
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Category ID: {product.category_id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

