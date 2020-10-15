import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = (props) => {
    const [formValues, setFormValues] = useState({});
    const {id} = useParams();
    const movie = props.movieList.find(movie=> {
        return movie.id == id;
      }) || {};
      const {push} = useHistory();



      useEffect(()=> {

        setFormValues({
            id: movie.id,
            title: movie.title,
            director: movie.director,
            metascore: movie.metascore,
            stars: movie.stars?.join(', ')
        })
      }, [])

      const handleChange = e => {
          setFormValues({
              ...formValues,
              [e.target.name]: e.target.value
          })
      }

      const handleSubmit = e => {
          const updatedMovie = {
              ...formValues,
              stars: formValues.stars.split(', ')
          }
          e.preventDefault();
          axios.put(`http://localhost:5000/api/movies/${movie.id}`, updatedMovie)
          .then(res=>{
              console.log(res.data)
              const newMovieList = props.movieList.map(movie=>{
                  if (movie.id === res.data.id) {
                      return {...res.data}
                  } else {
                      return {...movie}
                  }
              })
            props.setMovieList(newMovieList);
            push('/')
          })
          .catch(err=>{
              console.log(err);
          })
      }

    return (
        <div>
            <form>
                <label htmlFor='title'>TITLE
                    <input
                    type='text'
                    name='title'
                    value={formValues.title}
                    onChange={handleChange} />
                </label><br/>
                <label htmlFor='director'>DIRECTOR
                    <input
                    type='text'
                    name='director'
                    value={formValues.director}
                    onChange={handleChange} />
                </label><br/>                
                <label htmlFor='metascore'>METASCORE
                    <input
                    type='text'
                    name='metascore'
                    value={formValues.metascore}
                    onChange={handleChange} />
                </label><br/>
                <label htmlFor='stars'>STARS
                    <input
                    type='text'
                    name='stars'
                    value={formValues.stars}
                    onChange={handleChange} />
                </label>
                <button onClick={handleSubmit}>SUBMIT CHANGES</button>
            </form>
        </div>
    )
}

export default UpdateMovie
