import ServiceApp from "../services";

export const getCfdiTaxData = async (data: any) => {
  try {
    return await ServiceApp.getCfdiTaxData(data);
  } catch (error) {
    console.log("🚀 ~ getCfdiTaxData ~ error:", error);
  }
};