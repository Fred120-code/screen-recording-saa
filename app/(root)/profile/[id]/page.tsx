import Header from "@/app/components/Header";

const page = async ({ params }: ParamsWithSearch) => {
  const { id } = await params;
  return (
    <div className="wrapper page">
      <Header
        subHeader="fredayemtsa@gmail.com"
        title="Joran Fred"
        userImg="/assets/images/dummy.jpg"
      />
    </div>
  );
};

export default page;
