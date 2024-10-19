"use client";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationArticle({
  total,
  currentPage,
}: {
  total: number;
  currentPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  };
  return (
    <>
      <Pagination
        align="center"
        defaultCurrent={1}
        current={currentPage}
        total={total}
        pageSize={Number(process.env.NEXT_PUBLIC_LIMIT_ARTICLE)}
        onChange={onChangePage}
        showSizeChanger={false}
        hideOnSinglePage={true}
        simple
      />
    </>
  );
}
