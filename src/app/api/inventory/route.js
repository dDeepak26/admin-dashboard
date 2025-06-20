import { NextResponse } from "next/server";
import connectToDB from "../../../lib/dbconnect";
import Inventory from "../../../models/Inventory";
import { authOptions } from './../../../lib/authOptions';
import { getServerSession } from "next-auth";

export async function GET() {
    await connectToDB();
    const inventory = await Inventory.find().populate("productId", "name");
    return NextResponse.json(inventory);
} 

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'master') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    await connectToDB();
    const body = await req.json();
    const inventory = await Inventory.create(body);
    return NextResponse.json(inventory);
}