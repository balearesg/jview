import { DataModel, actions } from "trade-market/db";

export /*actions*/ /*bundle*/
class CompanyBridge {
  _model;

  constructor() {
    this._model = DataModel.models.Companies;
  }
  data(params) {}

  publish(params) {}

  remove(params) {}
}
