import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToDB from "../../../lib/dbconnect"
import Category from "../../../models/Category"
import { authOptions } from '@/lib/authOptions';

export async function GET() {
    await connectToDB();
    const categories = await Category.find();
    return NextResponse.json(categories);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'master') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  await connectToDB();
  const body = await req.json();
  const category = await Category.create(body);
  return NextResponse.json(category);
}