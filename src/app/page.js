import CooperationForm from "@/components/cooperation-form";
import Products from "@/components/blocks/products";
import MainSlider from "@/components/blocks/main-slider/main-slider";
import Link from "next/link";

export default function Home() {

  return (
    <div className="page page-main">
      <section className="page-main__slider">
        <MainSlider />
      </section>
      <section className="page-main__products">
        <h3>Атрибутика клуба</h3>
        <div className="container"><Products /></div>
      </section>
      <section className="page-main__cooperation">
        <CooperationForm />
      </section>
      <section className="page-main__about">
        <div className="container">
          <div className="page-main__about_body">
            <div className="page-main__about_image">
              <img src={"/images/sections/about/cars.jpg"} alt="cars"/>
            </div>
            <div className="page-main__about_description">
              <h3>Автомобильное сообщество VAGCLUB21</h3>
              <p className="text">SAIC-Volkswagen Co., Ltd. («SAIC-Volkswagen») — совместное китайско-германское предприятие, управляемое
                компаниями SAIC Motor и Volkswagen Group. Компания подписала контракт и заложила первый камень в
                фундамент
                в октябре 1984 года. Это одно из старейших совместных автомобильных предприятий в Китае. </p>
              <Link href={"/about"} className="style-btn style-btn-default">Подробнее</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


