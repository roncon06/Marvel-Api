import { Schema, model } from 'mongoose';

const characterSchema = new Schema({
    name: String, // Nome do personagem
    description: String, // Descrição do personagem
    imageUrl: String // URL da imagem do personagem
}, {
    timestamps: true // Adiciona campos "createdAt" e "updatedAt"
});

export default model("Character", characterSchema);
