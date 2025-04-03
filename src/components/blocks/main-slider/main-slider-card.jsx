import React from 'react';
import Link from "next/link";
import {CMS_URL} from "@/constants";
import {Skeleton} from "antd";

const MainSliderCard = ({loading, data}) => {

  if (loading) {
    return (
      <div
        style={{backgroundColor: 'rgb(231 237 245)', color: '#000'}}
        className="main-slider__item"
      >
        <div className="container">
          <div className="main-slider__item_body">
            <div className="main-slider__item_info">
              <Skeleton active paragraph={{ rows: 5 }} /><br/>
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{backgroundColor: data?.bg_color, color: data?.text_color}}
      className="main-slider__item"
    >
      <div className="container">
        <div className="main-slider__item_body">
          <div className="main-slider__item_info">
            <h1>{data?.title}</h1>
            <p className="text">{data?.description}</p>
            {data?.link && <Link className="style-btn style-btn-primary" href={data.link}>Подробнее</Link>}
          </div>
          {data?.image && (
            <div className="main-slider__item_image">
              <img src={`${CMS_URL}${data.image.url}`} alt=""/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSliderCard;