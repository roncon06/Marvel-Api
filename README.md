MarvelApp

Todas as rotas da API


//Rota para buscar personagens de um evento especifico da Marvel
routes.get('/characters/sync', characterController.buscarESalvarPersonagensDaMarvel);

//Rota para criar um personagem
routes.post('/character', characterController.createCharacter)

//Rota para buscar todos personagens
routes.get('/characters', characterController.buscarTodosPersonagens);

//Rota para buscar personagem porID
routes.get('/characters/:id', characterController.buscarPersonagemPorId);

//Rota para deletar um personagem
routes.delete('/characters/:id', characterController.deletarPersonagem);

//Rota para atualizar um personagem
routes.put('/characters/:id', characterController.updateCharacter);

//Rota para buscar o personagem por nome
routes.get('/:name', characterController.findCharacterByName);

//Rotas para buscar quantos personagens aparece na saga 
routes.get('/character/count', characterController.countCharacters);


//Rota para criar um quadrinho
routes.post('/comics', comicsController.createComic);
// Rota para buscar todos os quadrinhos
routes.get('/comics', comicsController.getAllComics);
// Rota para buscar um quadrinho por ID
routes.get('comics/:id', comicsController.getComicById);
// Rota para editar um quadrinho por ID
routes.put('/:id', comicsController.updateComic);
// Rota para deletar um quadrinho por ID
routes.delete('/:id', comicsController.deleteComic);
// Rota para buscar e salvar quadrinhos de um evento específico da Marvel
routes.get('/events/:eventId/comics', comicsController.fetchAndSaveComics);
// Rota para contar a quantidade de quadrinhos por saga
routes.get('/comic/count', comicsController.countComics)
//Rota para buscar pelo nome do quadrinho
routes.get('/comic/:title', comicsController.getComicByName);



// Rota para buscar todos os criadores
routes.get('/creator/todos', creatorController.getAllCreators);
// Rota para buscar um criador por ID
routes.get('/creators/:id', creatorController.getCreatorById);
// Rota para criar um criador
routes.post('/creators', creatorController.createCreator);
//Rota para deletar um criador
routes.delete('/creators/:id', creatorController.deleteCreator);
//Rota para atualizar uma criador
routes.put('/creators/:id', creatorController.updateCreator);
//Rota para buscar e salvar criadores de um evento espicifico da Marvel
routes.get('/events/:eventId/creators', creatorController.fetchAndSaveCreators);
//Rota para buscar o criador por nome
routes.get('/criador/:name', creatorController.getCreatorByName);
