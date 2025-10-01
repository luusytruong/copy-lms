import LecturerDetail from "@/components/features/lecturer/LecturerDetail";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <LecturerDetail id={Number(id)} />;
};

export default Page;
