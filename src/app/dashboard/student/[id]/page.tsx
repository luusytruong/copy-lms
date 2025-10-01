import StudentDetail from "@/components/features/student/StudentDetail";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <StudentDetail id={Number(id)} />;
};

export default Page;
