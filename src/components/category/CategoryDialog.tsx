"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type Category = {
    _id?: string;
    name: string;
    description: string;
}

type Props = {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editData?: Category | null;
};

export default function CategoryDialog({ open, onClose, onSuccess, editData }: Props) {
    const [form, setForm] = useState<Category>({
        name: "",
        description: "",
    });

    useEffect(() => {
        if (editData) {
            setForm(editData);
        } else {
            setForm({ name: "", description: "" });
        }
    }, [editData]);

    const handleSubmit = async () => {
        try {
            if (!form.name) {
                alert("Please fill the name of the category");
                return;
            }

            const res = await fetch(
                editData ? `/api/category/${editData._id}` : "/api/category",
                {
                    method: editData ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                }
            );

            if (!res.ok) throw new Error("Failed to submit");

            onSuccess();
            onClose();
            setForm({ name: "", description: "" })
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editData ? "Edit Category" : "Create Category"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <Label>Category Name</Label>
                    <Input
                        placeholder="Enter Category Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <Label>Category Description</Label>
                    <Textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Type your message here." />
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
