'use client'
import React, {useEffect, useState} from 'react';
import { Image, Upload } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {API_URL} from "@/constants";
import UploadService from "@/services/upload.service";
import {getBase64} from "@/utils/utils";



const FormUpload = () => {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  /*useEffect(() => {
    console.log(fileList)
  }, [fileList]);*/

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </button>
  );

  return (
    <>
      <Upload
        action={`${API_URL}/upload`}
        // action={UploadService.upload}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={true}
        maxCount={6}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default FormUpload;
