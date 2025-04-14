import getRandomNumber from "@/functions/getRandomNumber";
import Link from "next/link";
import {API_URL} from "@/constants";

const CarCard = ({car}) => {
  const link = `/cars/${car.car_brand}_${car.car_model}_${car.car_number}`;

  const images = JSON.parse(car.car_images);
  const image = images[getRandomNumber(0, images.length - 1)];

  return (
    <Link className="car-card" href={link}>
      <img className="car-card__image" src={`${API_URL}/car/${image}`}  alt={`${car.car_brand} ${car.car_model}`}/>
    </Link>
  )
};

export default CarCard;
