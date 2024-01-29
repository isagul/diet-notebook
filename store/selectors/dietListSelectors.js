export const getDietListSelector = {
  getData: state => state?.dietList?.dietList?.data,
  getIsPending: state => state?.dietList?.dietList?.isPending,
};

export const getCurrentDateSelector = {
  getData: state => state?.dietList?.currentDate,
};

export const getActiveKeySelector = {
  getData: state => state?.dietList?.activeKey,
};

export const getCurrentMealSelector = {
  getData: state => state?.dietList?.currentMeal,
};
