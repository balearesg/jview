import { DataModel, actions } from "trade-market/db";
import { utils } from "trade-market/utils";
import { v4 as uuidv4 } from "uuid";

export /*actions*/ /*bundle*/ class PosItemBridge {
  _model;

  constructor() {
    this._model = DataModel.models.PosData;
  }
  async data(params) {
    try {
      if (!params?.id) throw "MISSING_PARAMS";
      let record = await this._model.findOne({
        where: { id: params.id },
        include: [
          {
            model: DataModel.models.Chains,
            as: "chain",
          },
          {
            model: DataModel.models.Distributors,
            as: "distributor",
          },
        ],
      });
      if (!record) throw "RECORD_NOT_EXIST";

      const additionalAttributes = ["chain", "distributor"];
      const additionalModels = [
        DataModel.models.Chains,
        DataModel.models.Distributors,
      ];
      record = utils.processQueryItem(
        record,
        this._model,
        additionalAttributes,
        additionalModels
      );
      return { status: true, data: record };
    } catch (exc) {
      console.error(exc);
      return { status: false, error: exc };
    }
  }

  publish(params) {}

  remove(params) {}

  async checkIn(params) {
    try {
      if (!params.id) throw "MISSING_ID_PARAMS";
      if (!params.surveyId) throw "MISSING_SURVEY_ID_PARAMS";
      if (!params.lat) throw "MISSING_LAT_PARAMS";
      if (!params.lng) throw "MISSING_LNG_PARAMS";
      if (!params.userId) throw "MISSING_USER_ID_PARAMS";

      const { Surveys, PosData, SurveysHistory } = DataModel.models;
      const survey = await Surveys.findOne({
        where: { id: params.surveyId },
      });
      if (!survey) throw "SURVEY_NOT_EXIST";
      const pos = await PosData.findOne({
        where: { id: params.id },
      });
      if (!pos) throw "POS_NOT_EXIST";
      const specs = {
        status: 1,
        userId: params.userId,
        surveyId: params.surveyId,
        posId: params.id,
        lat: params.lat,
        lng: params.lng,
        id: uuidv4(),
      };

      const insert = await SurveysHistory.create(specs);

      return { status: true, data: { id: insert.id } };
    } catch (exc) {
      return { status: false, error: exc };
    }
  }
}
