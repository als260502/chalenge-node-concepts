const { uuid } = require('uuidv4')

const repositories = require('../../store/Repository')

module.exports = {


  index(request, response) {
    const { techs } = request.query
    let results = []
    const filteredRepositories = techs
      ? repositories.filter(repository => {
        repository.techs.filter(tech => {
          if (tech.includes(techs)) results.push(repository)
        })
      })

      : results = repositories

    return response.json(results)

  },

  store(request, response) {

    const { title, url, techs } = request.body

    const newRepository = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0
    }

    repositories.push(newRepository)

    return response.json(newRepository)

  },

  update(request, response) {
    const { id } = request.params
    const { title, url, techs } = request.body

    const repositoryIndex = repositories
      .findIndex(repository => repository.id === id)

    if (repositoryIndex < 0) return response
      .status(400)
      .json({ error: 'Repository no found!' })

    const newRepository = {
      id,
      title,
      url,
      techs,
      likes: repositories[repositoryIndex].likes
    }

    repositories[repositoryIndex] = newRepository

    return response.json(newRepository)

  },

  delete(request, response) {
    const { id } = request.params

    const repositoryIndex = repositories.findIndex(repository => repository.id === id)

    if (repositoryIndex < 0) return response.status(400).json({ error: 'Repository not found.' })

    repositories.splice(repositoryIndex, 1)

    return response.status(204).send()
  }
}
