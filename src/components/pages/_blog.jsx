"use client"
import React from 'react';
import AnimateSection from "@/components/blocks/animate-section";

const Blog = () => {
  return (
    <AnimateSection className="blog ppt ppb">
      <div className="container">
        <h1 className="blog__title h1">Блог</h1>
        <div className="blog__soon">
          <h2>Скоро наполним блог новостями</h2>
        </div>
      </div>
    </AnimateSection>
  );
};

export default Blog;
