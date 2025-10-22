import ClassDetail from "@/components/features/classroom/ClassDetail";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ClassDetail id={Number(id)} />;
};

export default Page;
