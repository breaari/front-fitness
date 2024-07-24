import { Card } from "./Card";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export const Cards = () => {
    const savedPage = localStorage.getItem('currentPage');
    const productos = useSelector((state) => state.fitness.productos);

    const [currentPage, setCurrentPage] = useState(Number(savedPage) || 1);
    const productsPerPage = 24;
    const pagesToShow = 4;

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const totalProductos = productos.length
    // const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
    const currentProducts = totalProductos > 24 ? productos.slice(indexOfFirstProduct, indexOfLastProduct) : productos;

    const totalPages = Math.ceil(productos.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        if (startPage > 1) {
            pageNumbers.push(
                <button key={1} onClick={() => handlePageChange(1)} className={`px-3 py-1 border rounded ${1 === currentPage ? 'bg-rojo text-white' : 'bg-white text-black'}`}>1</button>
            );
            if (startPage > 2) {
                pageNumbers.push(
                    <button key="prevEllipsis" onClick={() => handlePageChange(startPage - pagesToShow)} className="px-3 py-1">...</button>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button key={i} onClick={() => handlePageChange(i)} className={`px-3 py-1 border rounded ${i === currentPage ? 'bg-rojo text-white' : 'bg-white text-black'}`}>{i}</button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <button key="nextEllipsis" onClick={() => handlePageChange(endPage + pagesToShow)} className="px-3 py-1">...</button>
                );
            }
            pageNumbers.push(
                <button key={totalPages} onClick={() => handlePageChange(totalPages)} className={`px-3 py-1 border rounded ${totalPages === currentPage ? 'bg-rojo text-white' : 'bg-white text-black'}`}>{totalPages}</button>
            );
        }

        return pageNumbers;
    };
     console.log("priducto:", currentProducts)
    return (
        <div className="flex flex-col items-center mb-10 mq980:mx-[5%]">
            {!productos.length && (
                <div className="text-gris mt-10 min-h-screen">No se encontraron productos para la búsqueda especificada.</div>
            )}
            <div className="flex flex-wrap gap-5 mq980:gap-2 mq980:justify-center mq980:mx-[2.5%] ">
                {currentProducts.map((producto) => (
                    
                    <Card key={producto.id} producto={producto} />
                ))}
            </div>
       
            <div className="flex justify-center mt-5 space-x-2">
                <button
                    onClick={handlePreviousPage}
                    className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white text-black'}`}
                    disabled={currentPage === 1}
                >
                    <IoIosArrowBack />
                </button>
                {renderPageNumbers()}
                <button
                    onClick={handleNextPage}
                    className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-white text-black'}`}
                    disabled={currentPage === totalPages}
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    );
};
