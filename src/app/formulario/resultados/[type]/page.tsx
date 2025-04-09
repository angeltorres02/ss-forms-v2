import { Header } from "@/forms";

export default async function ResultadosPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);

  return <Header title={slug} subtitle={slug} />;
}
