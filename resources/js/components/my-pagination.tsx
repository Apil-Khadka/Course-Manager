import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const MyPagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className = "",
}) => {
    const getPageNumbers = () => {
        const pageNumbers = [];
        const showEllipsis = totalPages > 7;

        if (showEllipsis) {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("ellipsis");
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pageNumbers.push(1);
                pageNumbers.push("ellipsis");
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push("ellipsis");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("ellipsis");
                pageNumbers.push(totalPages);
            }
        } else {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };

    return (
        <nav
            className={`flex justify-center items-center space-x-2 ${className}`}
            aria-label="Pagination"
        >
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 transition-all duration-200 ease-in-out"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            {getPageNumbers().map((pageNumber, index) => (
                <React.Fragment key={index}>
                    {pageNumber === "ellipsis" ? (
                        <span className="px-3 py-2">
                            <MoreHorizontal className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        </span>
                    ) : (
                        <button
                            onClick={() => onPageChange(pageNumber as number)}
                            className={`px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ease-in-out
                ${
                    pageNumber === currentPage
                        ? "bg-blue-500 text-white font-bold transform scale-110 shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={
                                pageNumber === currentPage ? "page" : undefined
                            }
                        >
                            {pageNumber}
                        </button>
                    )}
                </React.Fragment>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 transition-all duration-200 ease-in-out"
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </nav>
    );
};

export default MyPagination;
