import H1 from "@/components/UI/h1";
import Container from "@/components/container";

const Page = async ({params}) => {

  const {slug} = await params;

  return (
    <div className="page ppt ppb">
      <Container>
        <H1>{slug}</H1>
      </Container>
    </div>
  );
};

export default Page;
