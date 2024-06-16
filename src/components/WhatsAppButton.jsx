import React from "react";
/* Así se usa el componente */
/* <WhatsAppButton phoneNumber={50312345678}></WhatsAppButton> */

const WhatsAppButton = ({phoneNumber}) => {
    const link = `https://wa.me/${phoneNumber}`
    return (
        <a href={link} target="_blank" className="inline-flex items-center justify-center p-[10px_15px] bg-WhatsApp text-white rounded-lg text-[16px] font-roboto font-semibold">
            <img src="./public/whatsapp.svg" className="mr-2" alt="" />
            Contacta conmigo
        </a>
    )
}

export default WhatsAppButton