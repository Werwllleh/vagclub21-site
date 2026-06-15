"use client"
import React from 'react';
import AnimateSection from "@/components/blocks/animate-section";
import H1 from "@/components/UI/h1";

const Blog = () => {
  return (
    <AnimateSection className="blog ppt ppb">
      <div className="container">
        <H1 className="blog__title pageTitle">Блог</H1>
        <div className="blog__soon">
          <h2>Скоро наполним блог новостями</h2>
        </div>
      </div>
    </AnimateSection>
  );
};

export default Blog;
