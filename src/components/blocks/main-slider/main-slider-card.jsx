import React from 'react';
import Link from "next/link";

const MainSliderCard = ({data}) => {

  console.log(data)

  return (
    <div
      style={{backgroundColor: data.bgColor, color: data.textColor}}
      className="main-slider__item"
    >
      <div className="container">
        <div className="main-slider__item_body">
          <div className="main-slider__item_info">
            <h1>{data.title}</h1>
            <p className="text">{data.description}</p>
            {data.link && <Link className="style-btn style-btn-primary" href={data.link}>Подробнее</Link>}
          </div>
          {data.image && (
            <div className="main-slider__item_image">
              <img src={`/images/main-slider/${data.image}`} alt=""/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSliderCard;
