import React from 'react';
import classNames from 'classnames';
import classes from './Pagination.module.scss';

interface PaginationProps {
    total: number;
    limit: number;
    siblings?: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({total, limit, siblings = 1, currentPage, onPageChange, className}) => {
    const totalPages = Math.ceil(total / limit);

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const startPage = Math.max(2, currentPage - siblings);
        const endPage = Math.min(totalPages - 1, currentPage + siblings);

        // Завжди додаємо першу сторінку
        pages.push(1);

        // Додаємо еліпсиси якщо є розрив між першою сторінкою та першою відображуваною
        if (startPage > 2) pages.push('...');

        // Додаємо сторінки між еліпсисами
        for (let i = startPage; i <= endPage; i++) pages.push(i);

        // Додаємо еліпсиси якщо є розрив між останньою відображуваною сторінкою та останньою сторінкою
        if (endPage < totalPages - 1) pages.push('...');

        // Завжди додаємо останню сторінку
        if (totalPages > 1) pages.push(totalPages);

        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) onPageChange(page);
    };

    return (
        <nav className={classNames(classes.pagination, className)}>

            <button
                className={classNames(classes.pageLink, { [classes.disabled]: currentPage === 1 })}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                title={"Previous"}
            >
                <svg width="8" height="12" viewBox="0 0 8 12" fill={"var(--Color-SVG, #FDFDFD"} xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.66691 6.46824L6.00706 11.8083C6.13057 11.9319 6.29545 12 6.47125 12C6.64706 12 6.81193 11.9319 6.93544 11.8083L7.32871 11.4151C7.58461 11.1589 7.58461 10.7426 7.32871 10.4867L2.84445 6.00249L7.33368 1.5133C7.4572 1.3896 7.52539 1.2249 7.52539 1.0492C7.52539 0.8733 7.4572 0.7085 7.33368 0.5848L6.94042 0.1917C6.81681 0.0681 6.65203 0 6.47623 0C6.30043 0 6.13555 0.0681 6.01204 0.1917L0.66691 5.53664C0.54311 5.66064 0.47511 5.8262 0.4755 6.0022C0.47511 6.17888 0.54311 6.34434 0.66691 6.46824Z"/>
                </svg>
            </button>

            {getPageNumbers().map((page, index) =>
                typeof page === 'number' ? (

                    <button
                        key={index}
                        className={classNames(classes.pageLink, {[classes.active]: page === currentPage})}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>

                ) : (
                    <span key={index} className={classes.delimiter}>{page}</span>
                )
            )}

            <button
                className={classNames(classes.pageLink, classes.next, {[classes.disabled]: currentPage === totalPages})}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                title={"Next"}
            >
                <svg width="8" height="12" viewBox="0 0 8 12" fill={"var(--Color-SVG, #FDFDFD"} xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.66691 6.46824L6.00706 11.8083C6.13057 11.9319 6.29545 12 6.47125 12C6.64706 12 6.81193 11.9319 6.93544 11.8083L7.32871 11.4151C7.58461 11.1589 7.58461 10.7426 7.32871 10.4867L2.84445 6.00249L7.33368 1.5133C7.4572 1.3896 7.52539 1.2249 7.52539 1.0492C7.52539 0.8733 7.4572 0.7085 7.33368 0.5848L6.94042 0.1917C6.81681 0.0681 6.65203 0 6.47623 0C6.30043 0 6.13555 0.0681 6.01204 0.1917L0.66691 5.53664C0.54311 5.66064 0.47511 5.8262 0.4755 6.0022C0.47511 6.17888 0.54311 6.34434 0.66691 6.46824Z"/>
                </svg>
            </button>

        </nav>
    );
};

export default Pagination;
