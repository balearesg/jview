import { list } from "./list";

export /*actions*/ /*bundle*/
  class CompanyBridge {


  data(params) {
    return new Promise((resolve, reject) => {
      try {
        if (!params || typeof params !== "object" || !params.id) throw new Error("invalid params")
        const item = list.find(item => item.id === params.id);
        if (!item) throw new Error("record not found");
        setTimeout(() => {
          resolve({ status: true, data: item })
        }, 4000)
      } catch (error) {
        setTimeout(() => {
          reject({ status: false, error });
        }, 4000)
      }

    })
  }
}
