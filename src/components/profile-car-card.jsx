import React, {useEffect, useState} from 'react';
import CarForm from "@/components/car-form";
import {Modal} from "antd";

const ProfileCarCard = ({carId, data}) => {

  const [isModalUpdateCarActive, setIsModalUpdateCarActive] = useState(false);

  const openUpdateCarModal = () => {
    setIsModalUpdateCarActive(true)
  }
  const closeUpdateCarModal = () => {
    setIsModalUpdateCarActive(false)
  }

  useEffect(() => {
    console.log(data.carsImages)
  }, [carId, data]);

  return (
    <>
      <div className="profile-car-card" onClick={openUpdateCarModal}>
        <div className="profile-car-card__body">
          <div className="profile-car-card__images"></div>
          <div className="profile-car-card__info">
            <p className="profile-car-card__info--name">{data?.brand} {data?.model}</p>
            <p className="profile-car-card__info--year">{data?.year}</p>
          </div>
        </div>
      </div>
      <Modal open={isModalUpdateCarActive} onCancel={closeUpdateCarModal} footer={false}>
        <CarForm
          type={'update'}
          carIndex={carId}
          onClose={closeUpdateCarModal}
          images={data?.carsImages}
          initialValues={{
            brand: data?.brand,
            model: data?.model,
            number: data?.number,
            year: data?.year,
            drive2: data?.drive2,
            note: data?.note,
          }}/>
      </Modal>
    </>
  );
};

export default ProfileCarCard;
