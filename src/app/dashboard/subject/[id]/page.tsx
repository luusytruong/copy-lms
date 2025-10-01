import SubjectDetail from "@/components/features/subject/SubjectDetail";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <SubjectDetail id={Number(id)} />;
};

export default Page;
