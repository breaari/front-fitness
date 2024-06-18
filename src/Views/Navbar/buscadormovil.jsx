// import { useState } from "react"
// import { IoCloseOutline } from "react-icons/io5";
// import { IoSearchOutline } from "react-icons/io5";

// export const BuscadorMovil = ( { searchText ,handleSearchClick, handleClearClick } ) => {

//     const [ buscador, setBuscador ] = useState(false)

//     const toggleBuscador = () => {
//         setBuscador(!buscador)
//     }

//     return (
//         <div className='flex justify-center mr-4'>
//              <IoSearchOutline className='text-[25px] text-white' onClick={toggleBuscador}/>

//             { buscador && (
//                 <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
//                 <label className=' border border-white rounded-[10px] py-2 px-4 w-[300px] flex flex-row justify-between bg-black'>
//                 <input className=' focus:outline-none bg-black text-white border-bottom border-white'
//                         value={searchText}
//                         onChange={(e) => setSearchText(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
//                 ></input>
//                 <div className="flex items-center">
//                     {searchText && (
//                         <button className='focus:outline-none' onClick={handleClearClick}>
//                             <IoCloseOutline className='text-[25px] text-white' />
//                         </button>
//                     )}
//                         <button className='focus:outline-none' onClick={handleSearchClick}>
//                             <IoSearchOutline className='text-[25px] text-white' />
//                         </button>
//                 </div>
//                 </label>
//                 </div>
//             )}
        
//     </div>
//     )
// }

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

export const BuscadorMovil = ({ searchText, handleSearchClick, handleClearClick, setSearchText }) => {
    const [buscador, setBuscador] = useState(false);

    const toggleBuscador = () => {
        setBuscador(!buscador);
    };

    const handleSearch = () => {
        handleSearchClick();
        setBuscador(false); // Cerrar el buscador después de realizar la búsqueda
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='flex justify-center mr-4'>
            <IoSearchOutline className='text-[25px] text-white' onClick={toggleBuscador} />

            {buscador && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <label className='border border-white rounded-[10px] py-2 px-4 w-[300px] flex flex-row justify-between bg-black'>
                        <input className='focus:outline-none bg-black text-white border-bottom border-white'
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="flex items-center">
                            {searchText && (
                                <button className='focus:outline-none' onClick={handleClearClick}>
                                    <IoCloseOutline className='text-[25px] text-white' />
                                </button>
                            )}
                            <button className='focus:outline-none' onClick={handleSearch}>
                                <IoSearchOutline className='text-[25px] text-white' />
                            </button>
                        </div>
                    </label>
                </div>
            )}

        </div>
    );
};
