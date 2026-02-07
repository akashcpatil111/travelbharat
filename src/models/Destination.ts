import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDestination extends Document {
    name: string;
    state: mongoose.Schema.Types.ObjectId;
    city: string;
    category: string;
    description: string;
    history?: string;
    bestTime: string;
    entryFees?: string;
    timings?: string;
    locationMapLink?: string;
    images: string[];
    isFeatured: boolean;
}

const DestinationSchema: Schema<IDestination> = new Schema(
    {
        name: { type: String, required: true },
        state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
        city: { type: String, required: true },
        category: {
            type: String,
            enum: ['Heritage', 'Nature', 'Religious', 'Adventure', 'Wildlife', 'Urban', 'Spiritual', 'Beach', 'Hill Station'],
            required: true,
        },
        description: { type: String, required: true },
        history: { type: String },
        bestTime: { type: String, required: true },
        entryFees: { type: String },
        timings: { type: String },
        locationMapLink: { type: String },
        images: { type: [String], default: [] },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Destination: Model<IDestination> =
    mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema);

export default Destination;
