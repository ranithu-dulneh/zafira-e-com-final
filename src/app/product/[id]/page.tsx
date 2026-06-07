import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Product } from "@/lib/firebase/schema";

// Mock data fetcher - in a real app this would call Firestore
async function getProduct(id: string): Promise<Product | null> {
  // Placeholder mock data matching schema
  return {
    id: id,
    title: "Eternity Diamond Pendant",
    description: "A timeless piece featuring a brilliant cut central diamond surrounded by a halo of micro-pavé set diamonds, suspended on an elegant 18k white gold chain.",
    basePrice: 125000,
    images: ["/logo.png", "/logo.png"], // using existing logo as placeholder images
    primaryCategory: "womens",
    subCategory: "Necklaces",
    stockCount: 5,
    createdAt: Date.now(),
    ratingsAverage: 4.8,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 flex justify-center items-center h-[50vh]">
        <p className="text-xl text-brand-slate">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 lg:pt-32 bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <ProductGallery images={product.images} altTitle={product.title} />
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
