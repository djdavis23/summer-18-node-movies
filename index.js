let express = require('express');
let bp = require('body-parser');
let server = express();
let movies = require('./movies')
let port = 8080

server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))



//create an endpoint for getting a list of movies
server.get('/movies', (req, res, next) => {
  res.send(movies)
})
//create an endpoint for finding a movie by its index
server.get('/movies/byIndex/:index', (req, res, next) => {
  let movie = movies[req.params.index];
  if (movie) {
    return res.send(movie)
  }
  return res.status(400).send("Movie not found")
})
//create an endpoint for finding a movie by its title
server.get('/movies/title/:title', (req, res, next) => {
  let movie = movies.find(m => m.name.toLowerCase() == req.params.title.toLowerCase())
  if (movie) {
    return res.send(movie)
  }
  return res.status(400).send({
    error: 'Movie not found'
  })
})

//create an endpoint for finding all movies by their years
server.get('/movies/byYear/:year', (req, res, next) => {
  let myMovies = movies.filter(movie => movie.year == req.params.year)
  if (myMovies.length > 0) {
    return res.send(myMovies)
  }
  return res.status(400).send("No movies found")
})

//create an endpoint for finding all by rating
server.get('/movies/byRating/:rating', (req, res, next) => {
  let myMovies = movies.filter(movie => movie.rating = req.params.rating)
  if (myMovies.length > 0) {
    return res.send(myMovies)
  }
  return res.status(400).send("No movies found")
})
//create an endpoint for finding all by tags
server.get('/movies/byTag/:tag', (req, res, next) => {
  let myMovies = movies.filter(m => m.tags.includes(req.params.tag.toLowerCase()))
  if (myMovies.length > 0) {
    return res.send(myMovies)
  }
  return res.status(400).send("No movies found")
})






server.listen(port, () => {
  console.log("Movies can be found at port: ", port)
})