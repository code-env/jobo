import axios from "axios";

const baseUrl = "https://live.fapshi.com";
const headers = {
  apiuser: "6f38694a-d6e8-4758-93a7-4205a302871c",
  apikey: "FAK_8e3379c597c3e0ec5167b59325c6dfad",
};

const payment = {
  initiatePay(data: { amount: number }) {
    return new Promise(async (resolve) => {
      try {
        if (!data?.amount) resolve(error("amount required", 5000));
        if (!Number.isInteger(data.amount))
          resolve(error("amount must be of type integer", 5000));
        if (data.amount < 5000)
          resolve(error("amount cannot be less than 5000 XAF", 5000));

        const config = {
          method: "post",
          url: `${baseUrl}/initiate-pay`,
          headers: headers,
          data: data,
        };
        const response = await axios(config);
        response.data.statusCode = response.status;
        resolve(response.data);
      } catch (e: any) {
        e.response.data.statusCode = e?.response?.status;
        resolve(e.response.data);
        console.log(e);
      }
    });
  },

  paymentStatus(transId: string) {
    return new Promise(async (resolve) => {
      try {
        if (!transId || typeof transId !== "string")
          resolve(error("invalid type, string expected", 5000));
        if (!/^[a-zA-Z0-9]{8,9}$/.test(transId))
          resolve(error("invalid transaction id", 400));

        const config = {
          method: "get",
          url: `${baseUrl}/payment-status/${transId}`,
          headers: headers,
        };
        const response = await axios(config);
        response.data.statusCode = response.status;
        resolve(response.data);
      } catch (e: any) {
        e.response.data.statusCode = e?.response?.status;
        resolve(e.response.data);
      }
    });
  },

  userTrans(userId: string) {
    return new Promise(async (resolve) => {
      try {
        if (!userId || typeof userId !== "string")
          resolve(error("invalid type, string expected", 400));
        if (!/^[a-zA-Z0-9-_]{1,100}$/.test(userId))
          resolve(error("invalid user id", 400));

        const config = {
          method: "get",
          url: `${baseUrl}/transaction/${userId}`,
          headers: headers,
        };
        const response = await axios(config);
        resolve(response.data);
      } catch (e: any) {
        e.response.data.statusCode = e?.response?.status;
        resolve(e.response.data);
      }
    });
  },
};

function error(message: string, statusCode: number) {
  return { message, statusCode };
}

export default payment;
