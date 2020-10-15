import React, {useState} from 'react'
import axios from 'axios';
import MovieList from './MovieList';
import {useHistory} from 'react-router-dom';

const initialFormValues = {
    title: '',
    director: '',
    metascore: '',
    star: ''
}

const AddMovie = (props) => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [stars, setStars] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {push} = useHistory();

    const addStar = e => {
        e.preventDefault();
        setStars([...stars, formValues.star]);
        setFormValues({
            ...formValues,
            star: ''
        })
    }

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const addMovie = e => {
        e.preventDefault();
        const newMovie = {
            id: MovieList.length,
            title: formValues.title,
            director: formValues.director,
            metascore: formValues.metascore,
            stars: stars
        }
        axios.post('http://localhost:5000/api/movies', newMovie)
        .then(res=>{
            console.log(res);
            props.setMovieList(res.data);
            push('/')
        })
    }

    return (
        <div>
        <form>
            <label htmlFor='title'>TITLE
                <input
                name='title'
                type='text'
                onChange={handleChange}
                value={formValues.title}
                />
            </label><br/>
            <label htmlFor='director'>DIRECTOR
                <input
                name='director'
                type='text'
                onChange={handleChange}
                value={formValues.director}
                />
            </label><br/>
            <label htmlFor='metascore'>METASCORE
                <input
                name='metascore'
                type='text'
                onChange={handleChange}
                value={formValues.metascore}
                />
            </label><br/>
            <label htmlFor='star'>STARS
                <input
                name='star'
                type='text'
                onChange={handleChange}
                value={formValues.star}
                />
                <button onClick={addStar}>ADD STAR</button>
                {stars && <ul>
                            {stars.map(star=>{
                                return (
                                    <li key={stars.indexOf(star)}>{star}</li>
                                )
                            })}
                        </ul>}
            </label><br/>
            <button onClick={addMovie}>ADD MOVIE</button>
        </form>
                {successMessage && <p>{successMessage}</p>}
                {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

export default AddMovie
