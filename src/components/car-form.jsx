"use client";
import React, {useEffect, useState} from 'react';
import {Button, Form, Image, Input, Select, Upload} from "antd";

const {TextArea} = Input;
import toast from "react-hot-toast";
import {useRegisterCars} from "@/hooks/useRegisterCar";
import {validateCarNumber} from "@/utils/patterns";
import dayjs from "dayjs";
import {PlusOutlined} from "@ant-design/icons";
import {API_URL} from "@/constants";
import {getBase64} from "@/utils/utils";
import CarService from "@/services/car.service";

const CarForm = ({initialValues, type, step = 1}) => {

  const {brands, models, isLoading} = useRegisterCars();

  const [form] = Form.useForm();
  const selectedBrand = Form.useWatch('brand', form);
  const selectedModel = Form.useWatch('model', form);

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const [carRegisterStep, setCarRegisterStep] = useState(step)

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

  const handleRemoveUpload = () => {
    console.log('Delete')
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

        console.log(res.status)

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
          {carRegisterStep === 1 && (
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
          {carRegisterStep === 2 && (
            <div className="car-form__form--images">
              <p>Добавить фото</p>
              <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
                <>
                  <Upload
                    action={`${API_URL}/upload`}
                    // action={UploadService.upload}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChangeUpload}
                    onRemove={handleRemoveUpload}
                    multiple={true}
                    maxCount={6}
                  >
                    {fileList.length >= 6 ? null : (
                      <button
                        style={{color: 'inherit', cursor: 'inherit', border: 0, background: 'none'}}
                        type="button"
                      >
                        <PlusOutlined/>
                        <div style={{marginTop: 8}}>Загрузить</div>
                      </button>
                    )}
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
            {type === 'update' ? 'Обновить' : 'Добавить'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CarForm;
