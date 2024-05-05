import { Schema, model } from 'mongoose';

const creatorSchema = new Schema(
    {
        suffix: String,
        fullName: String,
        comics: {
            available: Number,
            returned: Number,
            collectionURI: String,
            items: [
                {
                    resourceURI: String,
                    name: String
                }
            ]
        }
    }, 
    {
        timestamps: true
    }
);

export default model("Creator", creatorSchema);