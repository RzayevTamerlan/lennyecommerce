'use client';
import styles from "./ProductRatingStats.module.scss"
import TitleText from "../../ui/TitleText/TitleText";
import {Progress, Rate} from "antd";
import {useCallback} from "react";

const ProductRatingStats = ({coments}) => {
  const totalRating = coments.reduce((acc, cur, index) => {
    if (index === 0) return cur.attributes.rating;
    if (index === coments.length - 1) {
      return (acc + cur.attributes.rating) / coments.length;
    }
    return acc + cur.attributes.rating;
  }, 0);
  const formatFunc = useCallback((percent) => {
    const newPercent = (+percent / 20).toFixed(1);
    return newPercent;
  }, []);
  const ratingsObj = {};
  coments.forEach((comment) => {
    if (ratingsObj[comment.attributes.rating]) {
      ratingsObj[comment.attributes.rating] += 1;
    } else {
      ratingsObj[comment.attributes.rating] = 1;
    }
  });
  return (
    <section id={'reviews'} className={styles.wrapper}>
      <TitleText isCenter={false} size={'sm'} text={'Product Reviews'}/>
      <div className={styles.stats_box}>
        <div className={styles.stats_circle}>
          <Progress className={styles.circle_progress} format={formatFunc} type="circle"
                    percent={+((totalRating * 20).toFixed(1))} strokeColor={totalRating === 5 ? '#1D9E34' : '#FFA439'}
                    size={80}/>
          <div className={styles.stats_stars_box}>
            <Rate style={{color: '#FFA439'}} allowHalf disabled defaultValue={totalRating}/>
            <p className={styles.stats_count_circle}>
              from {coments.length} reviews
            </p>
          </div>
        </div>
        <div className={styles.stats_count}>
          <ul className={styles.stats_list}>
            <li className={styles.stats_item}>
              <div className={styles.stats_rating_box}>
                5.0
                <Rate style={{color: '#FFA439'}} disabled defaultValue={1} count={1}/>
              </div>
              <Progress showInfo={false} className={styles.stats_progress} strokeColor={'#1D9E34'}
                        percent={((ratingsObj[5] / coments.length)*100)} size="small"/>
              <p className={styles.this_stats_count}>
                {ratingsObj[5] ? ratingsObj[5] : 0}
              </p>
            </li>
            <li className={styles.stats_item}>
              <div className={styles.stats_rating_box}>
                4.0
                <Rate style={{color: '#FFA439'}} disabled defaultValue={1} count={1}/>
              </div>
              <Progress showInfo={false} className={styles.stats_progress} strokeColor={'#1D9E34'}
                        percent={((ratingsObj[4] / coments.length)*100)} size="small"/>
              <p className={styles.this_stats_count}>
                {ratingsObj[4] ? ratingsObj[4] : 0}
              </p>
            </li>
            <li className={styles.stats_item}>
              <div className={styles.stats_rating_box}>
                3.0
                <Rate style={{color: '#FFA439'}} disabled defaultValue={1} count={1}/>
              </div>
              <Progress showInfo={false} className={styles.stats_progress} strokeColor={'#1D9E34'}
                        percent={((ratingsObj[3] / coments.length)*100)} size="small"/>
              <p className={styles.this_stats_count}>
                {ratingsObj[3] ? ratingsObj[3] : 0}
              </p>
            </li>
            <li className={styles.stats_item}>
              <div className={styles.stats_rating_box}>
                2.0
                <Rate style={{color: '#FFA439'}} disabled defaultValue={1} count={1}/>
              </div>
              <Progress showInfo={false} className={styles.stats_progress} strokeColor={'#1D9E34'}
                        percent={((ratingsObj[2] / coments.length)*100)} size="small"/>
              <p className={styles.this_stats_count}>
                {ratingsObj[2] ? ratingsObj[2] : 0}
              </p>
            </li>
            <li className={styles.stats_item}>
              <div className={styles.stats_rating_box}>
                1.0
                <Rate style={{color: '#FFA439'}} disabled defaultValue={1} count={1}/>
              </div>
              <Progress showInfo={false} className={styles.stats_progress} strokeColor={'#1D9E34'}
                        percent={((ratingsObj[1] / coments.length)*100)} size="small"/>
              <p className={styles.this_stats_count}>
                {ratingsObj[1] ? ratingsObj[1] : 0}
              </p>
            </li>
          </ul>
        </div>
      </div>

    </section>
  );
};

export default ProductRatingStats;