/**
 * Pagination meta data
 * @param data
 * @return
 */
export const metaPagination = (data: any) => {
  console.log(data._currentPage, "currentPage");
  return {
    currentPage: data._currentPage,
    totalPage: data._lastPage,
    totalItems: data._total,
  };
};
