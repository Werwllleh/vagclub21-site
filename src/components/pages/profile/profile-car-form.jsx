import {Button, Form, Input, Select} from "antd";
import {useCar} from "@/hooks/useCar";
import {useEffect, useState} from "react";
import {validateCarNumber} from "@/utils/patterns";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import CarService from "@/services/car.service";

const ProfileCarForm = ({car, onClose}) => {

  const {carRegData, isLoading} = useCar();

  const [form] = Form.useForm();
  const selectedBrand = Form.useWatch('carBrand', form);
  const selectedModel = Form.useWatch('carModel', form);

  const [formPending, setFormPending] = useState(false);

  useEffect(() => {

    if (selectedBrand && carRegData) {

      const selectedBrandModels = carRegData?.models[selectedBrand?.toUpperCase()];

      if (selectedModel) {
        const findBrandModel = selectedBrandModels.find(model => model.value === selectedModel);

        if (findBrandModel === undefined) {
          form.setFieldsValue({carModel: undefined});
        }
      }

    }

  }, [form, carRegData, selectedBrand, selectedModel]);

  const handleSubmit = async (values) => {
    if (!validateCarNumber.test(values.carNumber)) {
      return toast.error('Номер авто некорректный')
    }

    if (Number(values.carYear) < 1800 || Number(values.carYear) > dayjs().year()) {
      return toast.error('Год некорректный')
    }

    if (values.carDrive2 !== null && values.carDrive2 !== '' && !values.carDrive2.includes('www.drive2.ru')) {
      return toast.error('Ссылка должна быть с Drive2')
    }

    if (!car.car_id) {
      return toast.error('Не найден ID авто')
    }

    setFormPending(true);

    const response = await CarService.changeCarInfo(car.car_id, values);

    if (response.status === 200) {
      onClose();
      toast.success(response.data)
      setFormPending(false);
    } else {
      toast.error(response.data)
      setFormPending(false);
    }

  }

  return (
    <div className="profile-car-form">
      {carRegData && (
        <Form
          disabled={formPending}
          className="profile-car-form__form"
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            carBrand: car?.car_brand,
            carModel: car?.car_model,
            carNumber: car?.car_number,
            carYear: car?.car_year,
            carNote: car?.car_note,
            carDrive2: car?.car_drive2,
          }}
        >
          <div className="profile-car-form__form_fields">
            <Form.Item
              name="carBrand"
              rules={[
                {
                  required: true,
                  message: 'Укажи бренд!',
                },
              ]}
            >
              <Select options={carRegData.brands}/>
            </Form.Item>
            <Form.Item
              name="carModel"
              rules={[
                {
                  required: true,
                  message: 'Укажи модель!',
                },
              ]}
            >
              <Select options={carRegData.models[selectedBrand?.toUpperCase()]}/>
            </Form.Item>
            <Form.Item
              name="carNumber"
              rules={[
                {
                  required: true,
                  message: 'Укажи номер!',
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="carYear"
              rules={[
                {
                  required: true,
                  message: 'Укажи год выпуска!',
                },
              ]}
            >
              <Input type="tel" placeholder="Год выпуска авто"/>
            </Form.Item>
            <Form.Item name="carDrive2">
              <Input placeholder="Ссылка на Drive2"/>
            </Form.Item>
            <Form.Item name="carNote">
              <Input placeholder="Примечание"/>
            </Form.Item>
          </div>
          <div className="profile-car-form__form_footer">
            <Button
              className="style-btn style-btn-default"
              type="primary"
              htmlType="submit"
            >Обновить
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default ProfileCarForm;
