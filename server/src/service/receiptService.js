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

export const getCashierDailyReportService = async (surname, date) => {
  if (!surname || !date) {
    return {
      status: 400,
      success: false,
      message: "Прізвище та дата є обов'язковими параметрами"
    };
  }

  try {
    const data = await repo.findReceiptsByCashierAndExactDateFromDB(surname, date);
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

export const getReceiptDetailsService = async (idCheck) => {
  if (!idCheck) {
    return {
      status: 400,
      success: false,
      message: "Номер чека (id_check) є обов'язковим"
    };
  }

  try {
    const data = await repo.getReceiptDetailsFromDB(idCheck);

    if (data.length === 0) {
      return {
        status: 404,
        success: false,
        message: "Чек з таким номером не знайдено"
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
      message: "Помилка при отриманні деталей чека: " + error.message
    };
  }
};

export const getCashierTotalRevenueService = async (surname, start, end) => {
  if (!surname || !start || !end) {
    return {
      status: 400,
      success: false,
      message: "Прізвище та часовий проміжок (start, end) обов'язкові"
    };
  }

  try {
    const result = await repo.getTotalSumByCashierFromDB(surname, start, end);
    
    const total = result.total_sum || 0;

    return {
      status: 200,
      success: true,
      data: {
        cashier: surname,
        period: { start, end },
        total_sum: total
      }
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Помилка при обчисленні виручки: " + error.message
    };
  }
};

export const getTotalRevenueService = async (start, end) => {
  if (!start || !end) {
    return {
      status: 400,
      success: false,
      message: "Потрібно вказати початкову та кінцеву дати"
    };
  }

  try {
    const result = await repo.getTotalRevenueFromDB(start, end);
    const total = result.total_sum || 0;

    return {
      status: 200,
      success: true,
      data: {
        period: { start, end },
        total_revenue: total
      }
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Помилка сервера при підрахунку виручки: " + error.message
    };
  }
};