const repositories = require('../../store/Repository')

module.exports = {

  store(request, response) {

    const { id } = request.params


    const repositoryIndex = repositories
      .findIndex(repository => repository.id === id)


    if (repositoryIndex < 0) {
      return response.status(400).json({ error: 'Repository not found!' })
    }

    const likes = repositories[repositoryIndex].likes++


    return response.json(repositories[repositoryIndex])

  }
}