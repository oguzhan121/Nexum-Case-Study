import { useEffect, useState } from "react";
import {
    useSearchParams
} from "react-router-dom";
import ListHeader from "../../components/MovieResults/listHeader";
import Select from "../../components/Select";
import sendRequest from "../../service";
import MovieCard from "../../components/MovieCard";
import Loader from "../../components/Loader";

export default function Results() {
    const [movies, setMovies] = useState([])
    const [filterMovies, setFilterMovies] = useState([])
    const [filterYears, setYears] = useState([])
    const [filterImbds, setImdb] = useState([])
    const [count, setCount] = useState('');
    const [loader, setLoader] = useState(false);
    const [searchParams] = useSearchParams();
    const searchKey = searchParams.get('search')


    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await sendRequest.get(`/3/search/movie?api_key=${process.env.REACT_APP_CUSTOM_API_KEY}&query=${searchKey}`)
                const sortingMovies = data.results.sort((personA, personB) => {
                    if (personA.release_date < personB.release_date) {
                        return 1;
                    } else if (personA.vote_average < personB.vote_average) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                })
                setMovies(sortingMovies);
                setFilterMovies(data.results);
                setCount(data.results.length)
                setYears(data.results.map(x => x.release_date))
                setImdb(data.results.map(x => x.vote_average))
            } catch {
                console.log('error');
            } finally {
                setLoader(true)
            }
        }
        getMovies();
    }, []);

    const filterYear = (value) => {
        const filterYearMovie = filterMovies.filter(filter => filter.release_date.includes(value));
        setCount(filterImbd.length)
        setMovies(filterYearMovie)
    }

    const filterImbd = (value) => {
        const filterImbd = filterMovies.filter(filter => filter.vote_average >= value);
        setCount(filterImbd.length)
        setMovies(filterImbd)
    }

    const deleteItem = (id) => {
        setMovies((current) =>  
            current.filter((val) => val.id !== id)
        )
    }

    if (!loader) {
        return <Loader />
    }
    return (
        <div className="container">
            {
                searchKey &&
                <ListHeader searchKey={searchKey} count={count} />
            }
            
            <div className="filter">
                <Select option={filterYears} onChange={filterYear} className="filter-select" />
                <Select option={filterImbds} onChange={filterImbd} className="filter-select" />
            </div>

            <div className="movie-list">
                {movies.map((item) => (
                    <MovieCard key={item.id} item={item} deleteItem={deleteItem} />
                ))
                }
            </div>
        </div>
    )
}