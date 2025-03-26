import ServiceApp from "../services";

export const getCFDI = async () => {
  try {
    return await ServiceApp.getCFDI();
  } catch (error) {
    console.log("🚀 ~ getCFDI ~ error:", error);
  }
}

export const getTaxRegime = async () => {
  try {
    return await ServiceApp.getTaxRegime();
  } catch (error) {
    console.log("🚀 ~ getTaxRegime ~ error:", error);
  }
};