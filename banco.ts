import axios from 'axios';




const baseUrl = 'https://gateway.marvel.com/v1/public';
const apiKey = '?ts=1&apikey=a57614bc4dd5a03af2e48cb08d9da12b&hash=373f36aa724d6f8449127058e7fc354d'; // Substitua com sua chave de API da Marvel


// Função para buscar e salvar os personagens da Marvel
async function buscarESalvarPersonagens() {
  try {
    // Fazer requisição para buscar os personagens da Marvel
    const response = await axios.get(`${baseUrl}/characters`, {
      params: {
        apikey: apiKey
      }
    });

    // Obter os personagens da resposta
    const characters = response.data.data.results;

    // Salvar os personagens no banco de dados MongoDB
    for (const characterData of characters) {
      const character = new Character({
        name: characterData.name,
        description: characterData.description,
        imageUrl: `${characterData.thumbnail.path}/standard_medium.${characterData.thumbnail.extension}`
      });
      await character.save();
      console.log(`Personagem "${character.name}" salvo no banco de dados.`);
    }
  } catch (error) {
    console.error('Erro ao buscar e salvar os personagens:', error);
  }
}

// Chamar a função para buscar e salvar os personagens da Marvel
buscarESalvarPersonagens();