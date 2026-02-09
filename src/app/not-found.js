import React from 'react';
import {Result} from "antd";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="page ppt ppb">
      <div className="not-found-page">
        <div className="container">
          <Result
            status="404"
            title="Страница не найдена"
            subTitle="Что-то пошло не так"
            extra={<Link href="/" className="btn default l" type="primary">На главную</Link>}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
