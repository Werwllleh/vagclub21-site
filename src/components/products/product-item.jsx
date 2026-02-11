'use client'
import React, {useEffect} from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation'


const ProductItem = ({info}) => {

  useEffect(() => {
    console.log(info)
  }, [info]);

  const router = useRouter();

  return (
    <div className="product-item">
      <div className="product-item__body">
        <div className="product-item__image">
          {info?.mainImage?.url ? <img src={info?.mainImage?.url} alt={info.name} /> : null}
        </div>
        <div className="product-item__info">
          <h3 className="product-item__name">{info.name}</h3>
        </div>
        <div className="product-item__footer"></div>
      </div>
      <Link className="product-item__link" href={`./${info.type}/${info.slug}`} />
    </div>
  );
};

export default ProductItem;
