import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { path } = router.query;

  return <p>Post: {path}</p>;
};

export default Page;
