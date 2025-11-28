"use client";

import { useProducts } from "@/context/ProductContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

interface ProductShowcaseProps {
    limit?: number;
    title?: string;
    description?: string;
}

export function ProductShowcase({
    limit,
    title = "Our Collections",
    description = "Explore our exclusive range of handwoven sarees and designer dresses."
}: ProductShowcaseProps) {
    const { products, contactInfo } = useProducts();
    const displayedProducts = limit ? products.slice(0, limit) : products;

    return (
        <section id="collections" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">{title}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {displayedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Card className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card">
                                <div className="relative h-[400px] overflow-hidden">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <Button asChild className="bg-white text-black hover:bg-white/90">
                                            <a href={`/product/${product.id}`}>View Details</a>
                                        </Button>
                                    </div>
                                </div>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-primary font-medium uppercase tracking-wider mb-1">{product.category}</p>
                                            <CardTitle className="text-xl font-serif">{product.name}</CardTitle>
                                        </div>
                                        <span className="text-lg font-bold text-foreground">{product.price}</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm line-clamp-2 h-10">{product.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <div className="grid grid-cols-2 gap-2 w-full">
                                        <Button asChild variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors">
                                            <a href={`https://wa.me/${contactInfo?.whatsapp}?text=I'm interested in ${product.name}`} target="_blank" rel="noopener noreferrer">
                                                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                                            </a>
                                        </Button>
                                        <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                                            <a href={`tel:${contactInfo?.phone}`}>
                                                <Phone className="mr-2 h-4 w-4" /> Call
                                            </a>
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {limit && (
                    <div className="text-center">
                        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <a href="/collections">View All Collections</a>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
