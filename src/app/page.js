import {Button} from "antd";

export default function Home() {

  return (
    <div className="page page-main">
      <div className="container">
        <section className="page-main__about">
          <div className="page-main__about_image">
            <img src={"/images/sections/about/cars.jpg"} alt="cars"/>
          </div>
          <div className="page-main__about_description">
            <h3>Автомобильное сообщество VAGCLUB21</h3>
            <p>SAIC-Volkswagen Co., Ltd. («SAIC-Volkswagen») — совместное китайско-германское предприятие, управляемое
              компаниями SAIC Motor и Volkswagen Group. Компания подписала контракт и заложила первый камень в фундамент
              в октябре 1984 года. Это одно из старейших совместных автомобильных предприятий в Китае. </p>
            <Button>Подробнее</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
