import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import connectToDB from "../../../../lib/dbconnect";
import Inventory from "../../../../models/Inventory";

export async function GET(_, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'master') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
  await connectToDB();
  const inventory = await Inventory.findById(params.id);
  return Response.json(inventory);
}

export async function PUT(req, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'master') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
  await connectToDB();
  const body = await req.json();
  const updated = await Inventory.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'master') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
  await connectToDB();
  await Inventory.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}