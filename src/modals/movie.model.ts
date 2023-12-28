import { Document, Schema, model } from "mongoose";
import { ModelName } from "../common/models";
import { ACTIVE } from "../common/constant";
// Define the interface for your document
interface IMovie extends Document {
    title: string;
    publish_year: number;
    poster_image: string,
    active: number
}

//create movie schema
const movieSchema = new Schema({
    title: { type: String, required: true },
    publish_year: { type: Number, required: false },
    poster_image: { type: String },
    active: { type: Number, default: ACTIVE }

}, {
    timestamps: true,
});

//create model
export const movieModel = model<IMovie>(ModelName.movie, movieSchema)