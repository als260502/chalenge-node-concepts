const { isUuid } = require('uuidv4')

function validateRepositoryId(request, response, next) {
  const { id } = request.params

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Repository ID invalid!" })
  }

  return next()
}

function logRequest(request, response, next) {
  const { method, url } = request

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.time(logLabel)

  next()

  console.timeEnd(logLabel)

}

module.exports = { validateRepositoryId, logRequest }