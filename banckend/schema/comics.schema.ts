import { Schema, model } from 'mongoose';

const comicSchema = new Schema(
  {
      title: String,
      issueNumber: Number,
      variantDescription: String,
      description: String,
      pageCount: Number,
      dates: [
          {
              type: { type: String },
              date: String // Alterado para aceitar strings diretamente
          }
      ],
      images: [
          {
              path: String,
              extension: String
          }
      ]
  }, 
  {
      timestamps: true
  }
);

export default model("Comic", comicSchema);
