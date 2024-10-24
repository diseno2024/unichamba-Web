import React, { useEffect, useState } from 'react'
// tarjetas
import { Slice } from './Slice';
import { useRandomStuden } from '../hooks/useRandomStuden';

export const Carrusel = ({data}) => {

    // lapso de tiempo para cambiar de tarjeta

  const [currentIndex, setCurrentIndex] = useState(0);// cambio por id de la tarjeta 
  const [isFading, setIsFading] = useState(false); // estado para manejar la transicion 

const {docStudent, docOffer} = useRandomStuden(); // lista estudiantes aleatorios y ofertas
 


  const goToNext = () => {
    setIsFading(true); // Inicia la transición

    // para estudiantes
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      setIsFading(false);
    }, 500); // duracion de la transicion de 0.5 seg

  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);


  return (
   <>
    <div className="flex h-[355px] rounded-md">
        <Slice card={data[currentIndex]} fading={isFading} estudianteAleatorio={docStudent} ofertaAleatoria={docOffer}/>
    </div>
   </>
  )
}
