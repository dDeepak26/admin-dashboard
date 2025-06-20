import { getServerSession } from "next-auth";
import connectToDB from "../../../../lib/dbconnect";
import Category from "../../../../models/Category";
import { authOptions } from '@/lib/authOptions';

export async function GET(_, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'master') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
  await connectToDB();
  const category = await Category.findById(params.id);
  return Response.json(category);
}

export async function PUT(req, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'master') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
  await connectToDB();
  const body = await req.json();
  const updated = await Category.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'master') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
  await connectToDB();
  await Category.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
