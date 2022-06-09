import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pagination } from "../redux/actions"
import style from "./styles/pagination.module.css"


function Pagination({ countriesPage, allCountries, paginate }) {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.pagination);

    useEffect(() => {
    }, [allCountries]);

    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allCountries / countriesPage); i++) {
        pageNumbers.push(i);
    };

  return (
    <nav className={style.container}>
        <ul className={style.pageList}>
            {pageNumbers.map(num => {
                return (
                    <li
                    key={num}
                    className={(currentPage === num) ? style.itemSelected : style.items}
                    >
                    <a
                    onClick={() => {
                        dispatch(pagination(num));
                        paginate(num)
                    }}
                    href='#top'
                    className={(currentPage === num) ? style.pageSelected : style.pages}
                    > {num} </a>
                    </li>
                )
            })}
        </ul>
    </nav>
  )
}

export default Pagination