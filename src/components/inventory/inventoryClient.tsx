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
import InventoryDialog from "./InventoryDialog";

type Inventory = {
    _id: string;
    productId: {
        _id: string;
        name: string;
    };
    available: number;
    sold: number;
}

type Props = {
    email?: string;
    role?: string;
};

export default function InventoryClient({ role }: Props) {
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editInventory, setEditInventory] = useState<Inventory | null>(null);

    const refreshInventory = async () => {
        setLoading(true);
        const res = await fetch("/api/inventory");
        const data = await res.json();
        setInventory(data);
        setLoading(false);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/inventory");
                const data = await res.json();
                setInventory(data);
            } catch (err) {
                console.error("Failed to fetch inventory", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this Inventory?")) return;

        try {
            const res = await fetch(`/api/inventory/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setInventory((prev) => prev.filter((p) => p._id !== id));
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
                <h1 className="text-2xl font-bold mb-2">Inventory</h1>
                {role === "master" && <Button onClick={() => { setEditInventory(null); setDialogOpen(true); }}><Plus />Create</Button>}
            </div>


            <hr className="my-4" />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Available</TableHead>
                            <TableHead>Sold</TableHead>
                            {role === "master" && (
                                <>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventory.map((inventory) => (
                            <TableRow key={inventory._id}>
                                <TableCell>{inventory.productId?.name || "Unknown"}</TableCell>
                                <TableCell>{inventory.available}</TableCell>
                                <TableCell>{inventory.sold}</TableCell>
                                {role === "master" && (
                                    <>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                onClick={() => {
                                                    setEditInventory(inventory);
                                                    setDialogOpen(true);
                                                }}
                                            >
                                                <Edit />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleDelete(inventory._id)}
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
            <InventoryDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSuccess={refreshInventory}
                editData={editInventory}
            />

        </div>
    );
}
