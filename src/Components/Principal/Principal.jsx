import React from "react";
import deportivo from "../../assets/equipamiento-desk.png"
import equipamiento from "../../assets/equipamiento-mov.png"

export const Principal = () => {
    return (
        <div className="flex items-center justify-center w-full h-auto">
            <img src={deportivo} className="hidden md:block"></img>
            <img src={equipamiento} className="md:hidden" ></img>
        </div>
    )
}