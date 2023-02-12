import React, { useState,useRef } from 'react';

function MovieCard({item,deleteItem}) {
    const elementRef = useRef();
    const [characterNumber,setCharacterNumber] = useState('255');

    
    const detailDescription = (textLenght) => {
        setCharacterNumber(textLenght);
        const detailBtnElement = elementRef.current;
        detailBtnElement.style.display = 'none';
    }

    return (
        <div className="movie-card" key={item.id}>
            <div className="movie-img">
                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.original_title} className="w-100" />
                <div className="trash" onClick={() => deleteItem(item.id)}>
                    <i className="fa-solid fa-trash"></i> Sil
                </div>
            </div>
            <div className="movie-content">
                <h3>{item.original_title} ({item.release_date})</h3>
                <span className="imdb-count"><i className="fa-sharp fa-solid fa-star"></i> {item.vote_average}</span>
                <p>
                    {item.overview.substring(0,characterNumber)}<span onClick={() => detailDescription(item.overview.length)} className="detail-content" ref={elementRef}>Detaylar</span>
                </p>
            </div>
        </div>
    );
}

export default MovieCard;