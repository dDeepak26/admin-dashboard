"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
} from "@/components/ui/table";
import { Edit, Plus, Trash2 } from "lucide-react";
import ProductDialog from "@/components/product/ProductDialog";

type Category = {
    _id: string;
    name: string;
};

type Product = {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    categories: Category[]
};

type Props = {
    email?: string;
    role?: string;
};

export default function ProductClient({ role }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);

    const refreshProducts = async () => {
        setLoading(true);
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/product");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/product/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setProducts((prev) => prev.filter((p) => p._id !== id));
            } else {
                alert("Delete failed");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between mb-15">
                <h1 className="text-2xl font-bold mb-2">Product</h1>
                {role === "master" && <Button onClick={() => { setEditProduct(null); setDialogOpen(true); }}><Plus />Create</Button>}
            </div>


            <hr className="my-4" />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Categories</TableHead>
                            {role === "master" && (
                                <>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    {product.categories.map((cat) => cat.name).join(", ")}
                                </TableCell>
                                {role === "master" && (
                                    <>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                onClick={() => {
                                                    setEditProduct(product);
                                                    setDialogOpen(true);
                                                }}
                                            >
                                                <Edit />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                <Trash2 className="text-red-600" />
                                            </Button>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <ProductDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSuccess={refreshProducts}
                editData={editProduct}
            />

        </div>
    );
}
