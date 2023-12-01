'use client';
import styles from "./Comment.module.scss"
import {useCallback} from "react";
import {Rate} from "antd";
import TitleText from "../../ui/TitleText/TitleText";
import SecondaryText from "../../ui/SecondaryText/SecondaryText";
import Image from "next/image";
import classNames from "classnames";
import userPic from "../../../public/icons/user/user-icon.jpg";

const Comment = ({date, title, rating, user, isLast = false}) => {
  const formatDate = useCallback((inputDate) => {
    const dateObject = new Date(inputDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    const formattedDateTime = dateObject.toLocaleString('en-US', options);
    return formattedDateTime;
  }, [date]);
  return (
    <div className={classNames(styles.comment, {
      [styles.comment_last]: isLast,
    })}>
      <Rate disabled allowHalf defaultValue={rating}/>
      <TitleText text={title} size={'sm'} isCenter={false}/>
      <SecondaryText text={formatDate(date)} size={'sm'} isCenter={false}/>
      <div className={styles.user_data}>
        <Image width={28} height={28} src={userPic}
               className={styles.user_pic}
               attributes={user}/>
        <h3 className={styles.user}>{user}</h3>
      </div>
    </div>
  );
};

export default Comment;