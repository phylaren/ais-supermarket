import * as repo from "../repositories/receiptRepository.js";

export const getCashierReportService = async (surname, start, end) => {
  if (!surname || !start || !end) {
    return {
      status: 400,
      success: false,
      message: "Прізвище та обидві дати (початок і кінець) є обов'язковими"
    };
  }

  try {
    const data = await repo.findReceiptsByCashierAndDateFromDB(surname, start, end);
    return {
      status: 200,
      success: true,
      data
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Помилка бази даних: " + error.message
    };
  }
};

export const getGeneralSalesReportService = async (start, end) => {
  if (!start || !end) {
    return {
      status: 400,
      success: false,
      message: "Необхідно вказати обидві дати: start та end"
    };
  }

  try {
    const data = await repo.getGeneralSalesReportFromDB(start, end);
    return {
      status: 200,
      success: true,
      data
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Помилка сервера: " + error.message
    };
  }
};