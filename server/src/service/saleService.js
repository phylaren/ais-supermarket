import * as repo from "../repositories/saleRepository.js";

export const getProductSalesStatsService = async (upc, start, end) => {
  if (!upc || !start || !end) {
    return {
      status: 400,
      success: false,
      message: "UPC та період (start, end) обов'язкові"
    };
  }

  try {
    const data = await repo.getProductSalesStatsFromDB(upc, start, end);

    if (!data) {
      return {
        status: 200,
        success: true,
        data: { upc, message: "За цей період продажів не знайдено", total_quantity: 0 }
      };
    }

    return {
      status: 200,
      success: true,
      data
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Помилка при отриманні статистики продажів: " + error.message
    };
  }
};