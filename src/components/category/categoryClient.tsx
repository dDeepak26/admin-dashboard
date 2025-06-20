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
import CategoryDialog from "./CategoryDialog";

type Category = {
    _id: string;
    name: string;
    description: string;
}

type Props = {
    email?: string;
    role?: string;
};

export default function CategoryClient({ role }: Props) {
    const [category, setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    const refreshCategory = async () => {
        setLoading(true);
        const res = await fetch("/api/category");
        const data = await res.json();
        setCategory(data);
        setLoading(false);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/category");
                const data = await res.json();
                setCategory(data);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            const res = await fetch(`/api/category/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setCategory((prev) => prev.filter((p) => p._id !== id));
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
                <h1 className="text-2xl font-bold mb-2">Category</h1>
                {role === "master" && <Button onClick={() => { setEditCategory(null); setDialogOpen(true); }}><Plus />Create</Button>}
            </div>


            <hr className="my-4" />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            {role === "master" && (
                                <>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {category.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell>{category.name}</TableCell>

                                <TableCell>{category.description}</TableCell>
                                {role === "master" && (
                                    <>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                onClick={() => {
                                                    setEditCategory(category);
                                                    setDialogOpen(true);
                                                }}
                                            >
                                                <Edit />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleDelete(category._id)}
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
            <CategoryDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSuccess={refreshCategory}
                editData={editCategory}
            />

        </div>
    );
}
