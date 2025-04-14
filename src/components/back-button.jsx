'use client'

import { useRouter } from 'next/navigation'
import {LeftOutlined} from "@ant-design/icons";

const BackButton = ({url, title}) => {

  const router = useRouter()

  return (
    <button className="back-button" type="button" onClick={() => router.push(url)}>
      <span className="back-button__icon"><LeftOutlined /></span>
      <span className="back-button__text">{title ? title : 'Назад'}</span>
    </button >
  );
};

export default BackButton;
