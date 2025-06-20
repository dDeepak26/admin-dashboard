"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Label } from "../ui/label";
import Inventory from "@/models/Inventory";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Inventory = {
    _id?: string;
    productId: string;
    available: number;
    sold: number;
}

type Product = {
    _id: string;
    name: string;
}

type Props = {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editData?: Inventory | null;
};

export default function InventoryDialog({ open, onClose, onSuccess, editData }: Props) {
    const [form, setForm] = useState<Inventory>({
        _id: "",
        productId: "",
        available: 0,
        sold: 0,
    });

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/product");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products", err);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (editData) {
            setForm(editData);
        } else {
            setForm({ productId: "", available: 0, sold: 0 });
        }
    }, [editData]);

    const handleSubmit = async () => {
        try {
            if (!form.productId) {
                alert("Please fill product ID");
                return;
            }

            const res = await fetch(
                editData ? `/api/inventory/${editData._id}` : "/api/inventory",
                {
                    method: editData ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                }
            );

            if (!res.ok) throw new Error("Failed to submit");

            onSuccess();
            onClose();
            setForm({ productId: "", available: 0, sold: 0 });
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {editData ? "Edit Inventory" : "Create Inventory"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label>Select Product</Label>
                        <Select
                            value={form.productId}
                            onValueChange={(value) =>
                                setForm({ ...form, productId: value })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="-- Select a Product --" />
                            </SelectTrigger>
                            <SelectContent>
                                {products.map((product) => (
                                    <SelectItem key={product._id} value={product._id}>
                                        {product.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Inventory Availability</Label>
                        <Input
                            type="number"
                            placeholder="Enter Inventory Availability"
                            value={form.available}
                            onChange={(e) =>
                                setForm({ ...form, available: parseFloat(e.target.value) || 0 })
                            }
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Inventory Sold</Label>
                        <Input
                            type="number"
                            placeholder="Enter Inventory Sold"
                            value={form.sold}
                            onChange={(e) =>
                                setForm({ ...form, sold: parseFloat(e.target.value) || 0 })
                            }
                            required
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit}>
                        {editData ? "Update" : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
