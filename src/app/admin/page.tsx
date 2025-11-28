"use client";

import { useState } from "react";
import { useProducts, Product } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Pencil, X } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function AdminPage() {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState<"saree" | "dress">("saree");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const resetForm = () => {
        setName("");
        setPrice("");
        setDescription("");
        setImages([]);
        setCategory("saree");
        setEditingId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productImages = images.length > 0 ? images : ["/images/saree1.png"];

        if (editingId) {
            const updatedProduct: Product = {
                id: editingId,
                name,
                price,
                category,
                description,
                images: productImages,
            };
            updateProduct(updatedProduct);
        } else {
            const newProduct: Product = {
                id: Date.now().toString(),
                name,
                price,
                category,
                description,
                images: productImages,
            };
            addProduct(newProduct);
        }

        setIsAdding(false);
        resetForm();
    };

    const handleEdit = (product: Product) => {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setDescription(product.description);
        setImages(product.images || []);
        setEditingId(product.id);
        setIsAdding(true);
    };

    const handleAddNew = () => {
        resetForm();
        setIsAdding(true);
    };

    const onOpenChange = (open: boolean) => {
        setIsAdding(open);
        if (!open) {
            resetForm();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-bold">Product Management</h1>
                <Button onClick={handleAddNew} className="bg-primary text-primary-foreground">
                    <Plus className="mr-2 h-4 w-4" /> Add New Product
                </Button>
            </div>

            <Dialog open={isAdding} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Edit Product" : "Add New Product"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="₹" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as "saree" | "dress")}
                            >
                                <option value="saree">Saree</option>
                                <option value="dress">Dress</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Product Images</Label>
                            <div className="space-y-4">
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="cursor-pointer"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Upload multiple images. The first image will be used as the main card thumbnail.
                                </p>
                                {images.length > 0 && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {images.map((img, index) => (
                                            <div key={index} className={`relative group aspect-square rounded-md overflow-hidden border ${index === 0 ? 'ring-2 ring-primary' : ''}`}>
                                                <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />

                                                {/* Main Image Indicator */}
                                                {index === 0 && (
                                                    <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded shadow-sm">
                                                        Main
                                                    </div>
                                                )}

                                                {/* Actions Overlay */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                    {index !== 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newImages = [...images];
                                                                const [selectedImage] = newImages.splice(index, 1);
                                                                newImages.unshift(selectedImage);
                                                                setImages(newImages);
                                                            }}
                                                            className="text-xs bg-white text-black px-2 py-1 rounded hover:bg-white/90"
                                                        >
                                                            Set Main
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-primary text-primary-foreground">
                            {editingId ? "Update Product" : "Save Product"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="relative group">
                        <div className="aspect-video relative overflow-hidden rounded-t-lg">
                            <img src={product.images?.[0] || "/images/placeholder.png"} alt={product.name} className="object-cover w-full h-full" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                            <p className="text-sm text-primary font-bold">{product.price}</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                        </CardContent>
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={() => handleEdit(product)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => deleteProduct(product.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
