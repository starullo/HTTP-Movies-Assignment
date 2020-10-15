import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, Route } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateMovie from './UpdateMovie';

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const [waitingText, setWaitingText] = useState('');
  const params = useParams();
  const {push} = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const deleteMovie = e => {
    e.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res=>{
      props.setMovieList(props.movieList.filter(m=>m.id !== movie.id));
      push('/')
      // setTimeout(()=>{
      //   setWaitingText('One Moment Please!');
      //   push('/')
      // }, 3000)
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <>
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button style={{margin: '0 2%'}} onClick={()=>push(`/update-movie/${movie.id}`)}>EDIT!!!</button>
  <button onClick={deleteMovie}>{waitingText ? waitingText : 'DELETE'}</button>
    </div>

    
    </>
  )
}

export default Movie;
