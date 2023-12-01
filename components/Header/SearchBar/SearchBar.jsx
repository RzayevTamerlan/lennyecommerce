"use client"
import getCategories from "../../../api/getCategories";
import styles from "./SearchBar.module.scss"
import Image from "next/image";
import arrowDown from "../../../public/icons/arrow-down/arrow-down.svg"
import searchIcon from "../../../public/icons/search/search.svg"
import {useCallback, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import category from "../../ui/Category/Category";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({
    id: 0,
    attributes: {
      "createdAt": "2023-10-13T16:33:44.180Z",
      "publishedAt": "DATA",
      title: "All Categories",
      "updatedAt": "DATA",
      uuid: null,
      slug: "all-categories"
    }
  });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    getCategories().then((res) => {
      setCategories(() => [activeCategory, ...res.data])
    });
    window.addEventListener('click', (e) => {
      if (e.target.className !== styles.category_btn) {
        setIsCategoryOpen(false);
      }
    })
    return () => {
      window.removeEventListener('click', (e) => {
        if (e.target.className !== styles.category_btn) {
          setIsCategoryOpen(false);
        }
      })
    }
  }, []);
  const createQueryString = useCallback(
    (category, search) => {
      const params = new URLSearchParams(searchParams);
      params.set('category', category);
      params.set('search', search);
      params.set('page', '1');
      return params.toString();
    },
    [searchParams],
  );
  const handleCategoryBtnClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  }
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setIsCategoryOpen(false);
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    router.push(`/products` + '?' + createQueryString(`${activeCategory.attributes.slug}`, `${inputValue}`));
  }
  return (
    <div className={classNames(styles.searchBar, {
      [styles.searchBar_active]: isCategoryOpen
    })}>
      <button onClick={handleCategoryBtnClick} className={styles.category_btn}>
        {activeCategory.attributes.title}
        <Image alt={'Arrow'} src={arrowDown} className={classNames(styles.arrow_down, {
          [styles.arrow_down_active]: isCategoryOpen
        })}/>
        <div className={classNames(styles.categories, {
          [styles.categories_active]: isCategoryOpen
        })}>
          {categories.map((category) => {
            return (
              <a
                key={category.id}
                className={classNames(styles.categories_btn, {
                  [styles.categories_btn_active]: category.id === activeCategory.id
                })}
                onClick={() => handleCategoryClick(category)}
              >
                {category.attributes.title}
              </a>
            )
          })}
        </div>
      </button>
      <span className={styles.border}></span>
      <form onSubmit={(e) => handleSearchSubmit(e)} className={styles.form}>
        <input ref={inputRef} type="text" placeholder={'Search on lenny...'}/>
        <button type={'submit'}>
          <Image src={searchIcon} alt={'Search'}/>
        </button>
      </form>

    </div>)
};

export default SearchBar;