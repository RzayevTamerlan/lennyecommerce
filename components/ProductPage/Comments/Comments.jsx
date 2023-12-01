'use client'
import styles from "./Comments.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import classNames from "classnames";
import {motion} from "framer-motion";
import Comment from "../Comment/Comment";
import {addComment} from "../../../actions/addComment";
import {Dropdown, Rate, Space, Typography,} from "antd";
import {DownOutlined} from '@ant-design/icons';
import {useRef, useState} from "react";
import filterIcon from "../../../public/icons/filter/filter.svg"
import Image from "next/image";
import {useCommentsFilter} from "../../../store/store";

const Comments = ({comments, userData, product}) => {
  const [rating, setRating] = useState(3);
  const [type, setType] = useState('Product Quality');
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef(null);
  const openFilter = useCommentsFilter((state) => state.openFilter);
  const onClick = ({key}) => {
    setType(() => items[key - 1].label);
  };
  const handleFilterOpen = (e) => {
    e.preventDefault();
    openFilter();
  }
  const items = [
    {
      key: '1',
      label: 'Product Quality',
    },
    {
      key: '2',
      label: 'Seller Services',
    },
    {
      key: '3',
      label: 'Product Price',
    },
    {
      key: '4',
      label: 'Shipment',
    },
    {
      key: '5',
      label: 'Match with Description',
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <TitleText text={'Review Lists'} isCenter={false} size={'sm'}/>
        <button onClick={(e) => handleFilterOpen(e)} className={styles.filters}>
          <Image alt={'filters'} src={filterIcon}/>
        </button>
      </div>
      <ul className={classNames(styles.list)}>
        {comments.map((comment, index) => {
          return (
            <motion.li initial={{opacity: 0, left: -20}}
                       animate={{opacity: 1}}
                       exit={{opacity: 0}}
                       layout
                       transition={{duration: 0.5}}
                       key={comment.id}>
              <Comment isLast={index + 1 === comments.length ? true : false} rating={comment.attributes.rating}
                       date={comment.attributes.createdAt}
                       user={comment.attributes.username}
                       title={comment.attributes.description}/>
            </motion.li>
          )
        })}
      </ul>
      {userData?.username ? <form action={formData => {
        if (formData.get('comment').length === 0) {
          setInputError(() => true);
        } else {
          setInputError(() => false);
          inputRef.current.value = '';
          console.log(rating, type, userData.username, userData.id, formData.get('comment'));
          addComment(formData, rating, type, userData.username, product);
        }
      }} className={styles.form}>
        <div className={styles.rating_select}>
          <Rate onChange={(value) => setRating(() => value)} defaultValue={rating}/>
          <Dropdown
            className={styles.dropdown}
            menu={{
              items,
              onClick,
              selectable: true,
              defaultSelectedKeys: ['1'],
            }}
            placement="bottom"
          >
            <Typography.Link>
              <Space>
                {type}
                <DownOutlined/>
              </Space>
            </Typography.Link>
          </Dropdown>
        </div>
        <div className={styles.enter_comment}>
          <input ref={inputRef} name={'comment'} className={styles.comment_input}
                 placeholder={'Type your comment here...'} type="text"/>
          <button type={'submit'} className={styles.comment_submit}>Send</button>
          {inputError ? <p className={styles.error}>You have to type something</p> : null}
        </div>
      </form> : <h3 className={styles.login}>You have to be logged in to add comments</h3>}
    </div>
  );
};

export default Comments;