"use client";
import React, {useEffect, useState} from 'react';
import {Button, Form, Image, Input, Select, Upload} from "antd";

const {TextArea} = Input;
import toast from "react-hot-toast";
import {useRegisterCars} from "@/hooks/useRegisterCar";
import {validateCarNumber} from "@/utils/patterns";
import dayjs from "dayjs";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import CarService from "@/services/car.service";
import UploadService from "@/services/upload.service";
import {API_URL} from "@/constants";
import {useQueryClient} from "@tanstack/react-query";
import {deepEqual, getBase64} from "@/utils/utils";

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const CarForm = ({carIndex, initialValues, type, step = 1, images = [], onClose}) => {

  const queryClient = useQueryClient();

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
  const [uploadingImages, setUploadingImages] = useState(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChangeUpload = ({ fileList: newFileList }) => {
    newFileList.forEach((file) => {
      if (!file.url && !file.preview) {
        file.preview = URL.createObjectURL(file.originFileObj || file);
      }
    });

    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    setFileList([...fileList, file]);
    return false;
  }

  const handleRemoveUploadImage = async (file) => {

    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  }

  const deleteImage = async (file) => {
    const res = await UploadService.deleteFile(file, "car");

    if (res.status === 200) {
      toast.success(res.data.message);
      await queryClient.invalidateQueries(['user-cars']);
    } else {
      toast.error(res.data.message);
    }
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

  const handleSaveImages = async () => {
    if (!fileList.length) return;

    try {
      setUploadingImages(true);

      const files = fileList.map((file) => file.originFileObj || file);

      const response = await UploadService.uploadFiles("car", files, carId);

      if (response.status === 200) {
        toast.success("Файлы успешно загружены!");
        onClose();
        await queryClient.invalidateQueries(['user-cars']);
        setFileList([])

        setTimeout(async () => {
          form.resetFields();
          setCarRegisterStep(1);
        }, 300)
      } else {
        toast.error("Ошибка при загрузке файлов");
      }
    } catch (err) {
      console.error(err);
      toast.error("Ошибка загрузки");
    } finally {
      setUploadingImages(false);
    }
  };

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

      if (type === 'update' && carIndex && initialValues) {
        const compare = deepEqual(values, initialValues)

        if (compare) {
          return setCarRegisterStep(2)
        } else {
          try {
            setIsSubmittingForm(true);
            const res = await CarService.updateUserCar(carIndex, values);

            if (res.status === 200) {
              setIsSubmittingForm(false);
              await queryClient.invalidateQueries(['user-cars']);
              toast.success('Данные обновлены');
              setCarRegisterStep(2);
            }
          } catch (error) {
            setIsSubmittingForm(false);
            if (error.response) {
              toast.error(error.response.data?.message || 'Ошибка на сервере');
            } else {
              toast.error('Ошибка сети. Попробуйте позже');
            }
          }
        }
      } else {
        try {
          setIsSubmittingForm(true);
          const res = await CarService.addCar(values);
          setCarId(res.data?.carId)

          if (res.status === 200) {
            setIsSubmittingForm(false);
            setCarRegisterStep(carRegisterStep + 1);
            await queryClient.invalidateQueries(['user-cars']);
            toast.success('Автомобиль успешно добавлен');
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
    }

    if (carRegisterStep === 2) {
      if (!fileList.length) {
        onClose()
        setTimeout(() => {
          setCarRegisterStep(1)
        }, 100)
      } else {
        await handleSaveImages()
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
                      // customRequest={UploadService.upload("car", carId)}
                      listType="picture-card"
                      fileList={fileList}
                      withCredentials={true}
                      beforeUpload={beforeUpload}
                      onPreview={handlePreview}
                      onChange={handleChangeUpload}
                      onRemove={handleRemoveUploadImage}
                      multiple={true}
                      maxCount={6}
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
                <div className="car-form__available-list">
                  <p>Ваши фото</p>
                  <Swiper
                    modules={[Pagination]}
                    spaceBetween={20}
                    pagination={{
                      enabled: true,
                      clickable: true,
                    }}
                    slidesPerView={"auto"}
                  >
                    {images.map(image => {
                      return (
                        <SwiperSlide key={image.id}>
                          <div className="car-form__available-list--card">
                            <div className="car-form__available-list--img">
                              <Image
                                src={`${API_URL}/image/${image.source}`}
                              />
                            </div>
                            <div className="car-form__available-list--actions">
                              <Button
                                onClick={() => deleteImage(image.source)}
                                type="primary"
                                size={"small"}
                                className="style-btn style-btn-default "
                              >
                                <DeleteOutlined/>
                              </Button>
                            </div>
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                  <ul className="car-form__available-images--list">
                    {images.map(image => (
                      <li key={image.id}>

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
              className="btn default m"
              type="primary"
              onClick={() => setCarRegisterStep(carRegisterStep - 1)}
            >
              Назад
            </Button>
          )}
          <Button className="btn primary m" type="primary" htmlType="submit">
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
