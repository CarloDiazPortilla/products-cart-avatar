import mongoose, { Document, Schema } from "mongoose";

export interface ICartItemDocument {
  idProducto: number;
  sku: string;
  nombre: string;
  precio: number;
  cantidad: number;
  thumbnail: string;
}

export interface ICartDocument extends Document {
  idUsuario: mongoose.Types.ObjectId;
  items: ICartItemDocument[];
  totalCompra: number;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

const cartItemSchema = new Schema<ICartItemDocument>({
  idProducto: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    default: 1
  },
  thumbnail: {
    type: String,
    required: true
  },
}, {
  _id: false
}
);

const cartSchema = new Schema<ICartDocument>(
  {
    idUsuario: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    items: {
      type: [cartItemSchema],
      default: []
    },
    totalCompra: {
      type: Number,
      default: 0
    },
    fechaCreacion: {
      type: Date,
      default: Date.now
    },
    fechaActualizacion: {
      type: Date,
      default: Date.now
    },
  },
  { versionKey: false }
);

export const CartModel = mongoose.model<ICartDocument>("Cart", cartSchema);
