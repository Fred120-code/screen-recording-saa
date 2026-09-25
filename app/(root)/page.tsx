import React from "react";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import { dummyCards } from "@/constants";

const Page = () => {
  return (
    <div className="wrapper page">
      <Header subHeader="Public Library" title="All Vidéo" />

      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard {...card} key={card.id} />
        ))}
      </section>
    </div>
  );
};

export default Page;
