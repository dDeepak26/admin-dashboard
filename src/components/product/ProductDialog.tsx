"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import MultiSelect from "../MultiSelect";
import { Category, ProductFormType, } from "@/types/Product";

type Props = {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editData?: ProductFormType | null;
};

export default function ProductDialog({ open, onClose, onSuccess, editData }: Props) {

    const [categories, setCategories] = useState<Category[]>([]);

    const [form, setForm] = useState<ProductFormType>({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categories: []
    });
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/category");
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (editData) {
            setForm(editData);
        } else {
            setForm({ name: "", description: "", price: 0, stock: 0, categories: [] as string[] });
        }
    }, [editData]);

    const handleSubmit = async () => {
        try {
            if (!form.name || form.price <= 0 || form.stock < 0 || !form.categories) {
                alert("Please fill all required fields correctly.");
                return;
            }

            const res = await fetch(
                editData ? `/api/product/${editData._id}` : "/api/product",
                {
                    method: editData ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                }
            );

            if (!res.ok) throw new Error("Failed to submit");

            onSuccess();
            onClose();
            setForm({ name: "", description: "", price: 0, stock: 0, categories: [] as string[] });
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editData ? "Edit Product" : "Create Product"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <Label>Product Name</Label>
                    <Input
                        placeholder="Enter Product Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <Label>Product Description</Label>
                    <Textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Type your message here." />
                    <Label>Product Price</Label>
                    <Input
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                            setForm({ ...form, price: parseFloat(e.target.value) || 0 })
                        }
                        required
                    />
                    <Label>Product Stock</Label>
                    <Input
                        type="number"
                        value={form.stock}
                        onChange={(e) =>
                            setForm({ ...form, stock: parseInt(e.target.value) || 0 })
                        }
                        required
                    />
                    <MultiSelect
                        label="Select Categories"
                        options={categories.map((cat) => ({
                            label: cat.name,
                            value: cat._id,
                        }))}
                        selected={form.categories ?? []}
                        onChange={(newSelected) => setForm({ ...form, categories: newSelected })}
                    />

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
