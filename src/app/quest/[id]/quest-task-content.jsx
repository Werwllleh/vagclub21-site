'use client'


import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import {CMS_URL} from "@/constants";

const QuestTaskContent = ({data}) => {

  return (
    <div className="quest-task-content">
      <h1 className="quest-task-content__title">{data.title}</h1>
      <div className="quest-task-content__preview">
        <img src={`${CMS_URL}${data.preview_image.url}`} alt=""/>
      </div>
      <div className="quest-task-content__content">
        {data?.content && (
          <Markdown remarkPlugins={[remarkGfm]}>{data.content}</Markdown>
        )}
      </div>
    </div>
  );
};

export default QuestTaskContent;
