"use client";
import React, {useEffect, useState} from 'react';
import {Button, Form, Image, Input, Select, Upload} from "antd";

const {TextArea} = Input;
import toast from "react-hot-toast";
import {useRegisterCars} from "@/hooks/useRegisterCar";
import {validateCarNumber} from "@/utils/patterns";
import dayjs from "dayjs";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {getBase64} from "@/utils/utils";
import CarService from "@/services/car.service";
import UploadService from "@/services/upload.service";
import {API_URL} from "@/constants";

const CarForm = ({carIndex, initialValues, type, step = 1, images = [], onClose}) => {

  const {brands, models, isLoading} = useRegisterCars();

  const [form] = Form.useForm();
  const selectedBrand = Form.useWatch('brand', form);
  const selectedModel = Form.useWatch('model', form);

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const [carId, setCarId] = useState(null)
  const [carRegisterStep, setCarRegisterStep] = useState(step)

  useEffect(() => {
    if (carIndex) {
      setCarId(carIndex);
    }
  }, [carIndex]);

  useEffect(() => {
    setCarRegisterStep(step)
  }, [step]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChangeUpload = ({fileList: newFileList}) => setFileList(newFileList);

  const handleRemoveUploadImage = (file) => {
    console.log(file)
    console.log('Delete')
  }

  const deleteImage = (image) => {

  }

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {

    if (selectedBrand && brands && models) {

      const selectedBrandModels = models[selectedBrand?.toUpperCase()];

      if (selectedModel) {
        const findBrandModel = selectedBrandModels.find(model => model.value === selectedModel);

        if (findBrandModel === undefined) {
          form.setFieldsValue({model: undefined});
        }
      }

    }

  }, [form, brands, models, selectedBrand, selectedModel]);

  /*useEffect(() => {
    console.log(images)
  }, [images]);*/

  const submitForm = async (values) => {

    if (carRegisterStep === 1) {
      if (!validateCarNumber.test(values.number.trim())) {
        return toast.error('Номер авто некорректный')
      }

      values.year = parseInt(values.year)

      if (parseInt(values.year) < 1800 || parseInt(values.year) > dayjs().year()) {
        return toast.error('Год некорректный')
      }

      if (values.drive2 && values.drive2 !== '') {
        if (!values.drive2.includes('www.drive2.ru')) {
          return toast.error('Ссылка должна быть с Drive2')
        }
      }

      try {
        setIsSubmittingForm(true);
        const res = await CarService.addCar(values);
        setCarId(res.data?.carId)

        if (res.status === 200) {
          setIsSubmittingForm(false);
          setCarRegisterStep(carRegisterStep + 1);
          toast.success('Автомобиль успешно добавлен!');
        } else {
          setIsSubmittingForm(false);
          toast.error(res.data?.message || 'Ошибка при добавлении автомобиля');
        }

      } catch (error) {
        setIsSubmittingForm(false);

        setCarId(error.response.data?.carId)

        if (error.status === 409) {
          setIsSubmittingForm(false);
          toast.error(error.response.data?.message);
          return setCarRegisterStep(carRegisterStep + 1)
        }

        if (error.response) {
          toast.error(error.response.data?.message || 'Ошибка на сервере');
        } else {
          toast.error('Ошибка сети. Попробуйте позже');
        }
      }
    }

    if (carRegisterStep === 2) {
      onClose();
      setTimeout(() => {
        form.resetFields();
        setCarRegisterStep(1);
      }, 300)
    }

  }

  return (
    <div className="car-form">
      <Form
        form={form}
        className="car-form__form"
        layout="vertical"
        variant="filled"
        disabled={isSubmittingForm}
        onFinish={submitForm}
        initialValues={initialValues}
        requiredMark={false}
      >
        <div className="car-form__form--fields">
          {carRegisterStep === 1 && !isLoading && (
            <>
              <Form.Item
                name="brand"
                rules={[
                  {
                    required: true,
                    message: 'Укажи бренд!',
                  },
                ]}
              >
                <Select placeholder={'Выбери бренд'} options={brands}/>
              </Form.Item>
              {selectedBrand && (
                <Form.Item
                  name="model"
                  rules={[
                    {
                      required: true,
                      message: 'Укажи модель!',
                    },
                  ]}
                >
                  <Select placeholder="Выбери модель" options={models[selectedBrand?.toUpperCase()]}/>
                </Form.Item>
              )}
              <Form.Item
                name="number"
                rules={[
                  {
                    required: true,
                    message: 'Укажи номер!',
                  },
                ]}
              >
                <Input placeholder="Номер авто"/>
              </Form.Item>
              <Form.Item
                name="year"
                rules={[
                  {
                    required: true,
                    message: 'Укажи год выпуска!',
                  },
                ]}
              >
                <Input type="tel" placeholder="Год выпуска авто"/>
              </Form.Item>
              <Form.Item name="drive2">
                <Input placeholder="Ссылка на Drive2"/>
              </Form.Item>
              <Form.Item name="note">
                <TextArea placeholder="Примечание" autoSize={{minRows: 2, maxRows: 8}}/>
              </Form.Item>
            </>
          )}
          {carRegisterStep === 2 && carId && (
            <>
              <div className="car-form__form--images">
                <p>Добавить фото</p>
                <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
                  <>
                    <Upload
                      // action={`${API_URL}/upload`}
                      customRequest={UploadService.upload("car", carId)}
                      listType="picture-card"
                      fileList={fileList}
                      withCredentials={true}
                      onPreview={handlePreview}
                      onChange={handleChangeUpload}
                      onRemove={handleRemoveUploadImage}
                      multiple={true}
                    >
                      <button
                        style={{color: 'inherit', cursor: 'inherit', border: 0, background: 'none'}}
                        type="button"
                      >
                        <PlusOutlined/>
                        <div style={{marginTop: 8}}>Загрузить</div>
                      </button>
                    </Upload>
                    {previewImage && (
                      <Image
                        wrapperStyle={{display: 'none'}}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: visible => setPreviewOpen(visible),
                          afterOpenChange: visible => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                      />
                    )}
                  </>
                </Form.Item>
              </div>
              {!!images?.length && (
                <div className="car-form__available-images">
                  <p>Ваши фото</p>
                  <ul className="car-form__available-images--list">
                    {images.map(image => (
                      <li key={image.id}>
                        <div className="car-form__available-images--img">
                          <Image
                            src={`${API_URL}/image/${image.source}`}
                          />
                        </div>
                        <div className="car-form__available-images--actions">
                          <Button
                            onClick={() => handleRemoveUploadImage({file: image.source})}
                            type="primary"
                            className="style-btn style-btn-default"
                          >
                            <DeleteOutlined/>
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
        <div className="car-form__form--footer">
          {carRegisterStep !== 1 && (
            <Button
              className="style-btn style-btn-default"
              type="primary"
              onClick={() => setCarRegisterStep(carRegisterStep - 1)}
            >
              Назад
            </Button>
          )}
          <Button className="style-btn style-btn-primary" type="primary" htmlType="submit">
            {/*{type === 'update' ? 'Обновить' : 'Добавить'}*/}
            {carRegisterStep === 1 && 'Далее'}
            {carRegisterStep === 2 && 'Сохранить'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CarForm;
