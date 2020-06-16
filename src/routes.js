const { Router } = require('express')
const { validateRepositoryId, logRequest } = require('./app/middlewares/Middlewares')

const RepositoryController = require('./app/controllers/RepositoryController')
const LikeController = require('./app/controllers/LikeController')

const routes = Router()

routes.use(logRequest)

routes.get("/repositories", RepositoryController.index);

routes.post("/repositories", RepositoryController.store);

routes.put("/repositories/:id", validateRepositoryId, RepositoryController.update);

routes.delete("/repositories/:id", validateRepositoryId, RepositoryController.delete);

routes.post("/repositories/:id/like", validateRepositoryId, LikeController.store);


module.exports = routes