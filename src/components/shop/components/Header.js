import React from 'react'
import {
    Link
} from "react-router-dom";
import image1 from '../../img/title.jpg';

export const Header = () => {
    return (
        <div>
            <img className="masthead" src={image1} alt="" style={{width: "100%"}}/>
            <Link to="/home" className="btn btn-danger btn-xl rounded-pill mt-2" style={{marginLeft: "41%"}}>Comprar</Link>
        </div>
    )
}
