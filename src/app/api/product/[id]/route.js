import { getServerSession } from "next-auth";
import connectToDB from "../../../../lib/dbconnect";
import Product from "../../../../models/Product";
import { authOptions } from '@/lib/authOptions';

export async function GET(_, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'master') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
  await connectToDB();
  const product = await Product.findById(params.id).populate('categories');
  return Response.json(product);
}

export async function PUT(req, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'master') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
  await connectToDB();
  const body = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'master') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
  await connectToDB();
  await Product.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
