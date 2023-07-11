import { DataModel, actions } from "trade-market/db";
import { Op } from "sequelize";
import { utils } from "trade-market/utils";
import { response } from "trade-market/response";

const querySQL = "SELECT MAX(id) as 'id', pos_id FROM surveys_history ";
// prettier-ignore
let groupSQL = "GROUP BY pos_id";
export /*actions*/ /*bundle*/ class PosCollectionBridge {
  _model;

  constructor() {
    this._model = DataModel.models.PosData;
  }

  orderBounds = (valueA: number, valueB: number) => {};

  /**
   * Processes filters based on the provided model and parameters.
   * @param model - Sequelize model used to apply filters.
   * @param params - Object containing filter parameters.
   * @returns An object containing the filters to be applied to the query.
   */
  processFilters = (model, params: any) => {};

  /**
   *
   * @param param0 metodo para filtrar kioskos (pos) por el status que tiene con respecto a la encuesta (survey)
   * surveyStatus = 2 representa a la encuesta finalizada
   * surveyStatus = 1 representa a los que no se les ha realizado al encuesta
   * @returns
   */
  async processBySurveyStatus({
    filters,
    order,
    offset,
    limit,
    surveyId,
    surveyStatus,
  }) {
    try {
      const promise: Promise<any>[] = [];
      let arrayHistory: object[] = [];
      limit = limit ? limit : 100;
      offset = offset ? offset : 0;

      const dataModel = await this._model.findAll({
        order,
        where: filters,
        attributes: ["id", "formattedAddress", "lat", "lng", "placeId", "name"],
      });
      let data = utils.processQueryArray(dataModel, this._model);

      if (!data?.length)
        return response.list(data, 0, { limit, start: offset });

      const ids = data.map((ele) => ele.id);

      let cont = 0;
      let limitCont = 100;
      let queryArray = [];
      do {
        const queryIds = ids.splice(cont, limitCont);
        const history = await DataModel.models.SurveysHistory.findAll({
          where: { posId: queryIds, surveyId, status: surveyStatus },
          order: [["time_created", "DESC"]],
        });
        history.forEach((ele) => queryArray.push(ele));
        cont += limitCont;
      } while (cont < ids.length);

      /**
       * se valida el status del kiosko en el ultimo registrado en el historial en surveys_history
       */
      // data = data.splice(offset, limit + 1);
      let items = [];
      data.forEach((item: any) => {
        const record = Object.assign({}, item);
        const surveys = queryArray.filter(
          (ele: any) => ele.dataValues.posId === item.id
        );
        const survey: any = surveys.length ? surveys[0] : undefined;
        if (surveyStatus === 2 && (!survey || survey?.dataValues?.status !== 2))
          return;
        if (surveyStatus === 1 && survey?.dataValues.status === 2) return;
        record.surveyStatus = survey ? survey.dataValues.status : 3;
        items.push(record);
      });

      const total = items.length;
      items = items.splice(offset, limit + 1);
      return response.list(items, total, { limit, start: offset });
    } catch (exc) {
      console.error("error", exc);
      return { status: false, error: exc.message };
    }
  }

  async list(params) {}

  bulkSave(params) {}
}
