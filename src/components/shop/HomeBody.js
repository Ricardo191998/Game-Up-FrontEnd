import React from 'react'

import {Header} from './components/Header';
import {Body} from './components/Body';
import {Navigation} from './components/Navigation';
import {Footer} from './components/Footer';

export const HomeBody = () => {
    return (
        <div>
            <Navigation/>
            <Header/>
            <Body/>
            <Footer/>
        </div>
    )
}
