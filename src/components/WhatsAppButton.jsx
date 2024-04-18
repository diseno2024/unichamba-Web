import React from "react";
/* Así se usa el componente */
/* <WhatsAppButton phoneNumber={50312345678}></WhatsAppButton> */

const WhatsAppButton = ({phoneNumber}) => {
    const link = `https://wa.me/${phoneNumber}`
    return (
        <a href={link} target="_blank" className="inline-flex items-center justify-center p-[10px_15px] bg-WhatsApp text-white border-none rounded-[5px] text-[16px] font-roboto font-semibold">
            <box-icon type='logo' name='whatsapp' color='white' class='w-[24px] mr-[10px]'></box-icon>
            Contacta conmigo
        </a>
    )
}

export default WhatsAppButton