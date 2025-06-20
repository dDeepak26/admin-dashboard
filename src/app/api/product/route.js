import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToDB from "../../../lib/dbconnect"
import Product from "../../../models/Product"
import { authOptions } from '@/lib/authOptions';

export async function GET() {
    await connectToDB();
    const products = await Product.find().populate("categories");
    return NextResponse.json(products);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'master') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  await connectToDB();
  const body = await req.json();
  const product = await Product.create(body);
  return NextResponse.json(product);
}