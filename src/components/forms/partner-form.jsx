'use client';

import {useEffect, useMemo, useState} from 'react';
import Image from 'next/image'
import styled from 'styled-components';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
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
import {TYPE} from "@/constants";
import {useQueryClient} from "@tanstack/react-query";
import {MaskedInput} from "antd-mask-input";

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
    
    button.remove {
        padding: 0;
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

const PartnerForm = ({type, onSuccess, onClose, values}) => {
  const DEFAULT_FORM_VALUES = {
    contacts: {
      phones: [],
      emails: [],
    },
  };

  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const isUpdate = type === TYPE.UPDATE;

  useEffect(() => {
    if (!isUpdate || !values) {
      form.resetFields();

      setLogo(null);
      setGallery([]);

      return;
    }

    form.resetFields();

    form.setFieldsValue({
      title:
        values.title ?? '',

      description:
        values.description ?? '',

      categories: Array.isArray(values.categories)
        ? values.categories
          .map((category) => {
            if (
              typeof category === 'object' &&
              category !== null
            ) {
              return category.id;
            }

            return category;
          })
          .filter(
            (categoryId) =>
              categoryId !== null &&
              categoryId !== undefined,
          )
        : [],

      address:
        values.address ?? undefined,

      discount:
        values.discount ?? undefined,

      contacts: {
        instagram:
          values.contacts?.instagram ??
          undefined,

        telegram:
          values.contacts?.telegram ??
          undefined,

        max:
          values.contacts?.max ??
          undefined,

        vk:
          values.contacts?.vk ??
          undefined,

        avito:
          values.contacts?.avito ??
          undefined,

        site:
          values.contacts?.site ??
          undefined,

        yandexMaps:
          values.contacts?.yandexMaps ??
          undefined,

        phones: Array.isArray(
          values.contacts?.phones,
        )
          ? values.contacts.phones.map(
            (item) => ({
              id: item.id,
              phone: item.phone ?? '',
            }),
          )
          : [],

        emails: Array.isArray(
          values.contacts?.emails,
        )
          ? values.contacts.emails.map(
            (item) => ({
              id: item.id,
              email: item.email ?? '',
            }),
          )
          : [],
      },

      coordinates: {
        lat:
          values.coordinates?.lat ??
          undefined,

        lng:
          values.coordinates?.lng ??
          undefined,
      },
    });

    setLogo(values.logo ?? null);

    setGallery(
      Array.isArray(values.gallery)
        ? values.gallery
        : [],
    );
  }, [
    form,
    isUpdate,
    values,
  ]);

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

  useEffect(() => {
    form.resetFields();

    setDeletingMediaIds([]);

    if (isUpdate && values) {
      form.setFieldsValue(
        mapCompanyToFormValues(values),
      );

      setLogo(values.logo ?? null);

      setGallery(
        Array.isArray(values.gallery)
          ? [...values.gallery]
          : [],
      );

      return;
    }

    setLogo(null);
    setGallery([]);
  }, [values, form, isUpdate]);


  const mapCompanyToFormValues = (values) => ({
    title: values?.title ?? '',
    description: values?.description ?? '',

    categories: Array.isArray(values?.categories)
      ? values.categories
        .map((category) => (
          typeof category === 'object' && category !== null
            ? category.id
            : category
        ))
        .filter((id) => id !== null && id !== undefined)
      : [],

    address: values?.address ?? undefined,
    discount: values?.discount ?? undefined,

    contacts: {
      instagram:
        values?.contacts?.instagram ?? undefined,

      telegram:
        values?.contacts?.telegram ?? undefined,

      max:
        values?.contacts?.max ?? undefined,

      vk:
        values?.contacts?.vk ?? undefined,

      avito:
        values?.contacts?.avito ?? undefined,

      site:
        values?.contacts?.site ?? undefined,

      yandexMaps:
        values?.contacts?.yandexMaps ?? undefined,

      phones: Array.isArray(values?.contacts?.phones)
        ? values.contacts.phones.map((item) => ({
          ...(item?.id !== null &&
          item?.id !== undefined
            ? {id: item.id}
            : {}),
          phone: item?.phone ?? '',
        }))
        : [],

      emails: Array.isArray(values?.contacts?.emails)
        ? values.contacts.emails.map((item) => ({
          ...(item?.id !== null &&
          item?.id !== undefined
            ? {id: item.id}
            : {}),
          email: item?.email ?? '',
        }))
        : [],
    },

    coordinates: {
      lat: values?.coordinates?.lat ?? undefined,
      lng: values?.coordinates?.lng ?? undefined,
    },
  });

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

  const onSubmit = async (formValues) => {
    if (submitting) {
      return;
    }

    if (isUpdate && !values?.id) {
      toast.error(
        'Не удалось определить ID компании',
      );

      return;
    }

    setSubmitting(true);

    try {
      /*
       * При создании пустые значения отправляем
       * как undefined.
       *
       * При обновлении пустые значения отправляем
       * как null, чтобы Payload очистил старые данные.
       */
      const emptyValue = isUpdate
        ? null
        : undefined;

      const normalizeOptionalString = (
        value,
      ) => {
        if (typeof value !== 'string') {
          return emptyValue;
        }

        const normalizedValue = value.trim();

        return normalizedValue || emptyValue;
      };

      const galleryIds = gallery
        .map((item) => item?.id)
        .filter(
          (id) =>
            id !== null &&
            id !== undefined,
        );

      const phones = Array.isArray(
        formValues.contacts?.phones,
      )
        ? formValues.contacts.phones
          .filter((item) =>
            item?.phone?.trim(),
          )
          .map((item) => ({
            ...(
              item.id !== undefined &&
              item.id !== null &&
              item.id !== ''
                ? {
                  id: item.id,
                }
                : {}
            ),

            phone: item.phone.trim(),
          }))
        : [];

      const emails = Array.isArray(
        formValues.contacts?.emails,
      )
        ? formValues.contacts.emails
          .filter((item) =>
            item?.email?.trim(),
          )
          .map((item) => ({
            ...(
              item.id !== undefined &&
              item.id !== null &&
              item.id !== ''
                ? {
                  id: item.id,
                }
                : {}
            ),

            email: item.email.trim(),
          }))
        : [];

      const payload = {
        title:
          formValues.title.trim(),

        description:
          formValues.description.trim(),

        categories:
          formValues.categories ?? [],

        /*
         * UPDATE:
         * null удалит логотип.
         *
         * CREATE:
         * undefined не отправит поле.
         */
        logo:
          logo?.id ?? emptyValue,

        /*
         * UPDATE:
         * [] очистит галерею.
         *
         * CREATE:
         * пустая галерея не отправляется.
         */
        gallery: isUpdate
          ? galleryIds
          : galleryIds.length
            ? galleryIds
            : undefined,

        address: normalizeOptionalString(
          formValues.address,
        ),

        discount:
          formValues.discount === undefined ||
          formValues.discount === null ||
          formValues.discount === ''
            ? emptyValue
            : formValues.discount,

        contacts: {
          instagram:
            normalizeOptionalString(
              formValues.contacts?.instagram,
            ),

          telegram:
            normalizeOptionalString(
              formValues.contacts?.telegram,
            ),

          max:
            normalizeOptionalString(
              formValues.contacts?.max,
            ),

          vk:
            normalizeOptionalString(
              formValues.contacts?.vk,
            ),

          avito:
            normalizeOptionalString(
              formValues.contacts?.avito,
            ),

          site:
            normalizeOptionalString(
              formValues.contacts?.site,
            ),

          yandexMaps:
            normalizeOptionalString(
              formValues.contacts?.yandexMaps,
            ),

          phones,

          emails,
        },

        coordinates: {
          lat:
            formValues.coordinates?.lat ??
            emptyValue,

          lng:
            formValues.coordinates?.lng ??
            emptyValue,
        },
      };

      let response;

      if (isUpdate) {
        response =
          await CmsService.updateUserCompany(
            values.id,
            payload,
          );
      } else {
        response =
          await CmsService.attachUserCompany(
            payload,
          );
      }

      // без await: обновление пользователя в фоне, не блокируем закрытие формы
      queryClient.invalidateQueries({queryKey: ['user']})

      toast.success(
        isUpdate
          ? 'Компания успешно обновлена'
          : 'Компания успешно создана и отправлена на проверку',
      );

      if (typeof onSuccess === 'function') {
        onSuccess(response.values);
      }

      if (!isUpdate) {
        form.resetFields();

        setLogo(null);
        setGallery([]);
      }

      if (typeof onClose === 'function') {
        onClose();
      }
    } catch (error) {
      console.error(
        isUpdate
          ? 'Ошибка обновления компании:'
          : 'Ошибка создания компании:',
        error?.response?.data ?? error,
      );

      toast.error(
        error?.response?.data?.message ||
        (
          isUpdate
            ? 'Не удалось обновить компанию'
            : 'Не удалось создать компанию'
        ),
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
        initialValues={DEFAULT_FORM_VALUES}
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

            {logo && logo?.url ? (
              <UploadPreview>
                <Image
                  src={logo.url}
                  alt={logo?.alt || logo?.filename || 'Логотип'}
                  width={150}
                  height={150}
                />

                <button
                  type="button"
                  className="btn default remove"
                  aria-label="Удалить логотип"
                  onClick={handleRemoveLogo}
                  disabled={logoDeleting}
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
              {!!gallery.length && gallery.map((media) => (
                <UploadPreview key={media.id}>
                  <Image
                    src={media.url}
                    alt={
                      media.alt ||
                      media.filename ||
                      'Изображение галереи'
                    }
                    width={150}
                    height={150}
                  />

                  <button
                    type="button"
                    className="btn default remove"
                    aria-label="Удалить изображение"
                    onClick={() => {
                      handleRemoveGalleryItem(media.id);
                    }}
                    disabled={deletingMediaIds.includes(media.id)}
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
                  <Input placeholder="https://values.ru"/>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name={['contacts', 'telegram']}
                  label="Telegram"
                >
                  <Input placeholder="https://t.me/values"/>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name={['contacts', 'instagram']}
                  label="Instagram"
                >
                  <Input placeholder="https://instagram.com/values"/>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name={['contacts', 'vk']}
                  label="VK"
                >
                  <Input placeholder="https://vk.com/values"/>
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
                  {fields.map(
                    ({key, name, ...restField}) => (
                      <Row
                        key={key}
                        gutter={12}
                        align="middle"
                      >
                        <Form.Item
                          name={[name, 'id']}
                          hidden
                        >
                          <Input/>
                        </Form.Item>

                        <Col flex="auto">
                          <Form.Item
                            {...restField}
                            name={[name, 'phone']}
                            label="Телефон"
                            rules={[
                              {
                                required: true,
                                message: 'Укажите номер телефона',
                              },
                              {
                                pattern: /^\+7 \(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
                                message: 'Укажите номер телефона полностью',
                              },
                            ]}
                          >
                            <MaskedInput mask="+7 (000)-000-00-00" placeholder="+7 999 999-99-99"/>
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
                    ),
                  )}

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
                  {fields.map(
                    ({key, name, ...restField}) => (
                      <Row
                        key={key}
                        gutter={12}
                        align="middle"
                      >
                        <Form.Item
                          name={[name, 'id']}
                          hidden
                        >
                          <Input/>
                        </Form.Item>

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
                            <Input placeholder="info@values.ru"/>
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
                    ),
                  )}

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
              galleryUploading ||
              logoDeleting ||
              deletingMediaIds.length > 0
            }
          >
            {isUpdate
              ? 'Обновить компанию'
              : 'Добавить компанию'}
          </Button>
        </FormFooter>
      </FormWrap>
    </Wrapper>
  );
};

export default PartnerForm;
