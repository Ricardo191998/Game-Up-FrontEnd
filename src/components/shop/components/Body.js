import React from 'react'
import image1 from '../../img/01.png'


export const Body = () => {
    return (
        <div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 order-lg-2">
                        <div className="p-5">
                            <img className="img-fluid rounded-circle" src={image1} alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-6 order-lg-1">
                        <div className="p-5">
                            <h2 className="display-4">¡Bienvenido a game up!</h2>
                            <p className="text-justify">Ser la primera empresa mexicana
                                dispuesta a explotar toda la creatividad
                                en la mayor diversidad de productos
                                decorativos y de tecnología de la
                                comunidad gamer. </p>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}
