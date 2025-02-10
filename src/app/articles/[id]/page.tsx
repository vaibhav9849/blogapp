import { ArticleDetailPage } from "@/components/articles/article-detail-page";
import { prisma } from "@/lib/prisma";
import React, { Suspense } from "react";

type ArticleDetailPageProps = {
  params: Promise<{ id: string }>;
};

const page: React.FC<ArticleDetailPageProps> = async ({ params }) => {
  const id = (await params).id;
  const article = await prisma.articles.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });
  if (!article) {
    return <h1>Article not found.</h1>;
  }
  return (
    <div>
      {/* <Suspense fallback={<h1>Loading...</h1>}> */}
        <ArticleDetailPage article={article} />
      {/* </Suspense> */}
    </div>
  );
};

export default page;
