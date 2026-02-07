import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IState extends Document {
    name: string;
    code: string;
    description: string;
    image: string;
    region: string;
}

const StateSchema: Schema<IState> = new Schema(
    {
        name: { type: String, required: true, unique: true },
        code: { type: String, required: true, unique: true }, // e.g., KA, DL
        description: { type: String, required: true },
        image: { type: String, required: true },
        region: { type: String, required: true }, // North, South, East, West, Central, NorthEast
    },
    { timestamps: true }
);

const State: Model<IState> =
    mongoose.models.State || mongoose.model<IState>('State', StateSchema);

export default State;
