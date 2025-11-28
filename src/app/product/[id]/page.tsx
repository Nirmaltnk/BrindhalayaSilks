"use client";

import { useProducts, Product } from "@/context/ProductContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { products, contactInfo } = useProducts();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchParams = async () => {
            const resolvedParams = await params;
            const foundProduct = products.find((p) => p.id === resolvedParams.id);
            setProduct(foundProduct);
            setLoading(false);
        };
        fetchParams();
    }, [params, products]);


    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 pt-32 text-center">
                    <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                    <Button asChild>
                        <Link href="/collections">Back to Collections</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-32 pb-12">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/collections" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Collections
                    </Link>
                </Button>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src={product.images[selectedImageIndex]}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImageIndex === index ? "border-primary" : "border-transparent hover:border-primary/50"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} view ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        <div>
                            <p className="text-primary font-medium uppercase tracking-wider mb-2">{product.category}</p>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{product.name}</h1>
                            <p className="text-2xl font-bold text-foreground">{product.price}</p>
                        </div>

                        <div className="prose prose-stone max-w-none">
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="pt-6 border-t border-border">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" variant="outline" className="w-full md:w-auto border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors">
                                    <a href={`https://api.whatsapp.com/send?phone=${contactInfo?.whatsapp}&text=${encodeURIComponent(`I'm interested in ${product.name}`)}`} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="mr-2 h-5 w-5" /> Enquire via WhatsApp
                                    </a>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="w-full md:w-auto border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                                    <a href={`tel:${contactInfo?.phone}`}>
                                        <Phone className="mr-2 h-5 w-5" /> Call Now
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
