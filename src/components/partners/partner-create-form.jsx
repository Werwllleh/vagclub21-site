'use client';

import {useMemo, useState} from 'react';
import styled from 'styled-components';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Upload,
} from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import {usePartnerCategories} from '@/hooks/usePartnerCategories';
import TextArea from "antd/lib/input/TextArea";
import CmsService from "@/services/cms.service";
import toast from "react-hot-toast";

const Wrapper = styled.div`
    min-width: 65rem;
    max-width: 100rem;
    width: 100%;

    @media (max-width: 768px) {
        min-width: 0;
    }
`;

const FormWrap = styled(Form)`
    width: 100%;
`;

const FormFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    max-height: 60rem;
    overflow-y: auto;
`;

const FormSection = styled.section`
    padding: 2.4rem;
    border: 1px solid #e5e5e5;
    border-radius: 1.2rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    
    & > .ant-row {
        gap: 1.6rem 0;
    }
`;

const FormSectionTitle = styled.h3`
    font-size: 2rem;
    font-weight: 600;
`;

const FormFooter = styled.div`
    position: sticky;
    bottom: 0;
    z-index: 2;

    display: flex;
    justify-content: center;

    margin-top: 3rem;
    padding: 1.5rem;

    background-color: rgba(255, 255, 255, 0.95);
    border-top: 1px solid #e5e5e5;
    backdrop-filter: blur(8px);

    button {
        width: 100%;
        max-width: 30rem;
    }
`;

const UploadList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
`;

const UploadPreview = styled.div`
    position: relative;

    width: 12rem;
    height: 12rem;

    overflow: hidden;
    border: 1px solid #e5e5e5;
    border-radius: 1rem;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 3rem;
        height: 3rem;

        border: 0;
        border-radius: 50%;

        color: #fff;
        background-color: rgba(0, 0, 0, 0.65);

        cursor: pointer;
    }
`;

const AddArrayButton = styled(Button)`
    margin-top: 1rem;
`;

const DISCOUNT_OPTIONS = Array.from(
  {length: 20},
  (_, index) => {
    const value = String((index + 1) * 5);

    return {
      label: `${value}%`,
      value,
    };
  },
);

const PartnerCreateForm = ({onSuccess}) => {
  const [form] = Form.useForm();

  const {partnerCategories = [], isLoading: categoriesLoading} = usePartnerCategories();

  const [submitting, setSubmitting] = useState(false);

  const [logo, setLogo] = useState(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoDeleting, setLogoDeleting] = useState(false);

  const [gallery, setGallery] = useState([]);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [deletingMediaIds, setDeletingMediaIds] = useState([]);

  const categoryOptions = useMemo(
    () => partnerCategories?.map((category) => ({
      label: category.title,
      value: category.id,
    })),
    [partnerCategories],
  );

  const handleLogoUpload = async (uploadFile) => {
    setLogoUploading(true);

    try {
      const uploadedMedia =
        await CmsService.uploadPartnerMedia(uploadFile);

      if (!uploadedMedia?.id) {
        throw new Error(
          'Сервер не вернул ID логотипа',
        );
      }

      setLogo(uploadedMedia);

      toast.success('Логотип загружен');
    } catch (error) {
      console.error(
        'Ошибка загрузки логотипа:',
        error?.response?.data ?? error,
      );

      toast.error('Не удалось загрузить логотип');
    } finally {
      setLogoUploading(false);
    }

    return Upload.LIST_IGNORE;
  };

  const handleGalleryUpload = async (uploadFile) => {
    setGalleryUploading(true);

    try {
      const uploadedMedia =
        await CmsService.uploadPartnerMedia(uploadFile);

      if (!uploadedMedia?.id) {
        throw new Error(
          'Сервер не вернул ID фотографии',
        );
      }

      setGallery((currentGallery) => [
        ...currentGallery,
        uploadedMedia,
      ]);

      toast.success('Фотография загружена');
    } catch (error) {
      console.error(
        'Ошибка загрузки фотографии:',
        error,
      );

      toast.error(
        'Не удалось загрузить фотографию',
      );
    } finally {
      setGalleryUploading(false);
    }

    return Upload.LIST_IGNORE;
  };

  const handleRemoveLogo = async () => {
    if (!logo?.id || logoDeleting) {
      return;
    }

    setLogoDeleting(true);

    try {
      await CmsService.deletePartnerMedia(logo.id);

      setLogo(null);

      toast.success('Логотип удалён');
    } catch (error) {
      console.error(
        'Ошибка удаления логотипа:',
        error?.response?.data ?? error,
      );

      toast.error(
        'Не удалось удалить логотип',
      );
    } finally {
      setLogoDeleting(false);
    }
  };

  const handleRemoveGalleryItem = async (mediaId) => {
    if (
      !mediaId ||
      deletingMediaIds.includes(mediaId)
    ) {
      return;
    }

    setDeletingMediaIds((current) => [
      ...current,
      mediaId,
    ]);

    try {
      await CmsService.deletePartnerMedia(mediaId);

      setGallery((currentGallery) =>
        currentGallery.filter(
          (item) => item.id !== mediaId,
        ),
      );

      toast.success('Фотография удалена');
    } catch (error) {
      console.error(
        'Ошибка удаления фотографии:',
        error?.response?.data ?? error,
      );

      toast.error(
        'Не удалось удалить фотографию',
      );
    } finally {
      setDeletingMediaIds((current) =>
        current.filter((id) => id !== mediaId),
      );
    }
  };

  const onSubmit = async (values) => {
    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        categories: values.categories,

        logo: logo?.id ?? undefined,

        gallery: gallery.length
          ? gallery.map((item) => item.id)
          : undefined,

        address:
          values.address?.trim() || undefined,

        discount:
          values.discount || undefined,

        contacts: {
          instagram:
            values.contacts?.instagram?.trim() || undefined,

          telegram:
            values.contacts?.telegram?.trim() || undefined,

          max:
            values.contacts?.max?.trim() || undefined,

          vk:
            values.contacts?.vk?.trim() || undefined,

          avito:
            values.contacts?.avito?.trim() || undefined,

          site:
            values.contacts?.site?.trim() || undefined,

          yandexMaps:
            values.contacts?.yandexMaps?.trim() || undefined,

          phones:
            values.contacts?.phones
              ?.filter((item) => item?.phone?.trim())
              .map((item) => ({
                phone: item.phone.trim(),
              })) || [],

          emails:
            values.contacts?.emails
              ?.filter((item) => item?.email?.trim())
              .map((item) => ({
                email: item.email.trim(),
              })) || [],
        },

        coordinates: {
          lat:
            values.coordinates?.lat ?? undefined,

          lng:
            values.coordinates?.lng ?? undefined,
        },
      };

      const response =
        await CmsService.attachUserCompany(payload);

      toast.success(
        'Компания успешно создана и отправлена на проверку',
      );

      form.resetFields();
      setLogo(null);
      setGallery([]);

      if (typeof onSuccess === 'function') {
        onSuccess(response.company);
      }
    } catch (error) {
      console.error(
        'Ошибка создания компании:',
        error?.response?.data ?? error,
      );

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        'Не удалось создать компанию',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <FormWrap
        form={form}
        layout="vertical"
        initialValues={{
          contacts: {
            phones: [],
            emails: [],
          },
        }}
        onFinish={onSubmit}
        scrollToFirstError
      >
        <FormFields data-lenis-prevent>
          <FormSection>
            <FormSectionTitle>
              Основная информация
            </FormSectionTitle>

            <Form.Item
              name="title"
              label="Название компании"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Укажи название компании',
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Название компании"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Описание компании"
              rules={[
                {
                  required: true,
                  message: 'Добавь описание компании',
                },
              ]}
            >
              <TextArea
                placeholder="Расскажи о компании, товарах и услугах"
              />
            </Form.Item>

            <Form.Item
              name="categories"
              label="Категории"
              rules={[
                {
                  required: true,
                  message: 'Выбери хотя бы одну категорию',
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                showSearch
                loading={categoriesLoading}
                options={categoryOptions}
                optionFilterProp="label"
                placeholder="Выбери категории"
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Адрес"
            >
              <Input placeholder="Адрес компании"/>
            </Form.Item>

            <Form.Item
              name="discount"
              label="Скидка для участников клуба"
            >
              <Select
                allowClear
                options={DISCOUNT_OPTIONS}
                placeholder="Выбери размер скидки"
              />
            </Form.Item>
          </FormSection>

          <FormSection>
            <FormSectionTitle>
              Логотип
            </FormSectionTitle>

            {logo ? (
              <UploadPreview>
                <img
                  src={logo.url}
                  alt={logo.alt || logo.filename || 'Логотип'}
                />

                <button
                  type="button"
                  className="btn m default"
                  aria-label="Удалить логотип"
                  onClick={handleRemoveLogo}
                >
                  <DeleteOutlined/>
                </button>
              </UploadPreview>
            ) : (
              <Upload
                accept="image/jpeg,image/png,image/webp,image/avif"
                showUploadList={false}
                beforeUpload={handleLogoUpload}
                disabled={logoUploading}
              >
                <Button
                  type="button"
                  className="btn m default"
                  icon={<UploadOutlined/>}
                  loading={logoUploading}
                >
                  Загрузить логотип
                </Button>
              </Upload>
            )}
          </FormSection>

          <FormSection>
            <FormSectionTitle>
              Галерея
            </FormSectionTitle>

            <UploadList>
              {gallery.map((media) => (
                <UploadPreview key={media.id}>
                  <img
                    src={media.url}
                    alt={
                      media.alt ||
                      media.filename ||
                      'Изображение галереи'
                    }
                  />

                  <button
                    type="button"
                    className="btn m default"
                    aria-label="Удалить изображение"
                    onClick={() => {
                      handleRemoveGalleryItem(media.id);
                    }}
                  >
                    <DeleteOutlined/>
                  </button>
                </UploadPreview>
              ))}

              <Upload
                multiple
                accept="image/jpeg,image/png,image/webp,image/avif"
                showUploadList={false}
                beforeUpload={handleGalleryUpload}
                disabled={galleryUploading}
              >
                <Button
                  type="button"
                  className="btn m default"
                  icon={<PlusOutlined/>}
                  loading={galleryUploading}
                >
                  Добавить фотографии
                </Button>
              </Upload>
            </UploadList>
          </FormSection>

          <FormSection>
            <FormSectionTitle>
              Контакты
            </FormSectionTitle>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name={['contacts', 'site']}
                  label="Сайт"
                  rules={[
                    {
                      type: 'url',
                      warningOnly: true,
                      message: 'Укажи корректную ссылку',
                    },
                  ]}
                >
                  <Input placeholder="https://company.ru"/>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name={['contacts', 'telegram']}
                  label="Telegram"
                >
                  <Input placeholder="https://t.me/company"/>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name={['contacts', 'instagram']}
                  label="Instagram"
                >
                  <Input placeholder="https://instagram.com/company"/>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name={['contacts', 'vk']}
                  label="VK"
                >
                  <Input placeholder="https://vk.com/company"/>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name={['contacts', 'max']}
                  label="MAX"
                >
                  <Input placeholder="Ссылка на профиль MAX"/>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name={['contacts', 'avito']}
                  label="Avito"
                >
                  <Input placeholder="Ссылка на профиль Avito"/>
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  name={['contacts', 'yandexMaps']}
                  label="Яндекс Карты"
                >
                  <Input placeholder="Ссылка на организацию в Яндекс Картах"/>
                </Form.Item>
              </Col>
            </Row>

            <Form.List name={['contacts', 'phones']}>
              {(fields, {add, remove}) => (
                <>
                  {fields.map(({key, name, ...restField}) => (
                    <Row
                      key={key}
                      gutter={12}
                      align="middle"
                    >
                      <Col flex="auto">
                        <Form.Item
                          {...restField}
                          name={[name, 'phone']}
                          label="Телефон"
                          rules={[
                            {
                              required: true,
                              message: 'Укажи телефон',
                            },
                          ]}
                        >
                          <Input placeholder="+7 999 999-99-99"/>
                        </Form.Item>
                      </Col>

                      <Col>
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined/>}
                          onClick={() => remove(name)}
                        />
                      </Col>
                    </Row>
                  ))}

                  <AddArrayButton
                    type="dashed"
                    className="btn m default"
                    icon={<PlusOutlined/>}
                    onClick={() => add()}
                  >
                    Добавить телефон
                  </AddArrayButton>
                </>
              )}
            </Form.List>

            <Form.List name={['contacts', 'emails']}>
              {(fields, {add, remove}) => (
                <>
                  {fields.map(({key, name, ...restField}) => (
                    <Row
                      key={key}
                      gutter={12}
                      align="middle"
                    >
                      <Col flex="auto">
                        <Form.Item
                          {...restField}
                          name={[name, 'email']}
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: 'Укажи email',
                            },
                            {
                              type: 'email',
                              message: 'Некорректный email',
                            },
                          ]}
                        >
                          <Input placeholder="info@company.ru"/>
                        </Form.Item>
                      </Col>

                      <Col>
                        <Button
                          className="btn m default"
                          danger
                          type="text"
                          icon={<DeleteOutlined/>}
                          onClick={() => remove(name)}
                        />
                      </Col>
                    </Row>
                  ))}

                  <AddArrayButton
                    className="btn m default"
                    type="dashed"
                    icon={<PlusOutlined/>}
                    onClick={() => add()}
                  >
                    Добавить email
                  </AddArrayButton>
                </>
              )}
            </Form.List>
          </FormSection>

          <FormSection>
            <FormSectionTitle>
              Координаты
            </FormSectionTitle>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name={['coordinates', 'lat']}
                  label="Широта"
                >
                  <InputNumber
                    min={-90}
                    max={90}
                    step={0.000001}
                    precision={6}
                    style={{width: '100%'}}
                    placeholder="55.755800"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name={['coordinates', 'lng']}
                  label="Долгота"
                >
                  <InputNumber
                    min={-180}
                    max={180}
                    step={0.000001}
                    precision={6}
                    style={{width: '100%'}}
                    placeholder="47.617600"
                  />
                </Form.Item>
              </Col>
            </Row>
          </FormSection>
        </FormFields>

        <FormFooter>
          <Button
            className="btn m default"
            type="primary"
            htmlType="submit"
            loading={submitting}
            disabled={
              logoUploading ||
              galleryUploading
            }
          >
            Добавить компанию
          </Button>
        </FormFooter>
      </FormWrap>
    </Wrapper>
  );
};

export default PartnerCreateForm;
