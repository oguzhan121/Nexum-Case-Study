import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Results from './pages/Results';


export default function Navigation() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/Results' element={<Results />}></Route>
        </Routes>
    )
}