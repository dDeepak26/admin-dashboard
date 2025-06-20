import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
  available: { type: Number, required: true },
  sold: { type: Number, required: true }
});


export default mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);
