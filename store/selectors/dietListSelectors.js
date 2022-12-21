export const getDietListSelector = {
  getData: state => state?.dietList?.dietList?.data,
  getIsPending: state => state?.dietList?.dietList?.isPending,
};
