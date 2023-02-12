import { useState } from "react";
import {  Link, useNavigate } from 'react-router-dom';
import { Toaster,toast  } from 'react-hot-toast';
import { Formik, Form } from 'formik';
import { movieAddSchema } from '../../validation/movie-add-schema';

import Button from "../../components/Button";
import Row from "../../components/Grid/row";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import SearchInput from "../../components/SearchInput";


export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [movie] = useState([]);
    const navigate = useNavigate();


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleSubmit = event => {
        event.preventDefault();
        navigate(`/Results?search=${searchValue}`);
    };

    const handleFormSubmit = (values) => {
        movie.push(values);
        localStorage.setItem('movieAddList',JSON.stringify(movie))
        setIsModalOpen(true);
        toast.success('Film eklendi.')
    }

    return (
        <div className="app-wrapper">
            <div className="app-search__block">
                <div className="app-search__row">
                    <Button text="Film Ekle +" className="c-button" onClick={toggleModal} />
                    <Link to={`/Results`}>
                        <Button text="Film Listesi" className="c-button" />
                    </Link>
                </div>
                <SearchInput children="Bulmak istediğiniz filmi yazınız" handleSubmit={handleSubmit} onChange={setSearchValue} value={searchValue} />
            </div>

            <Toaster position="top-right" />

            <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
                <div className="closed-modal" onClick={toggleModal}><img alt="closed" src="x-icon.svg" /></div>
                <Formik 
                 validationSchema={movieAddSchema}
                 initialValues={{
                    original_title: '',
                    vote_average: '',
                    artist: '',
                    overview: '',
                 }}
                 onSubmit={handleFormSubmit}
                >
                    {({ isSubmitting, isValid, dirty, values ,errors, touched}) => ( 
                        <Form>
                            <Row>
                                <Input classGroup="form-group" children="Film Adı"  name="original_title" errors={errors.original_title} touched={touched.original_title}/>
                                <Input classGroup="form-group" children="IMDB Puanı" type="number" name="vote_average" errors={errors.vote_average} touched={touched.vote_average}/>
                                <Input classGroup="form-group" children="Oyuncular"  name="artist" errors={errors.artist} touched={touched.artist}/>
                                {/* <Input classGroup="form-group" children="Film Görsel" /> */}
                                <Input classGroup="form-group form-group-full" children="Film Kısa Açıklama" name="overview" errors={errors.overview} touched={touched.overview}/>
                            </Row>
                            <Button text="Film Ekle" type="submit" className="c-button c-button--primary" disabled={!isValid || !dirty || isSubmitting}></Button>
                        </Form>
                     )}
                   
                </Formik>
            </Modal>

        </div>
    )
}