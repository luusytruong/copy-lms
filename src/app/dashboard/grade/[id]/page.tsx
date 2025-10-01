import GradeDetail from "@/components/features/grade/GradeDetail";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <GradeDetail id={Number(id)} />;
};

export default Page;
