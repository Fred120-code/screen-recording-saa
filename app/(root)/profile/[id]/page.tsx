import Header from "@/app/components/Header";
import VideoCard from "@/app/components/VideoCard";
import { dummyCards } from "@/constants";

const page = async ({ params }: ParamsWithSearch) => {
  const { id } = await params;
  return (
    <div className="wrapper page">
      <Header
        subHeader="fredayemtsa@gmail.com"
        title="Joran Fred"
        userImg="/assets/images/dummy.jpg"
      />

      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard {...card} key={card.id} />
        ))}
      </section>
    </div>
  );
};

export default page;
