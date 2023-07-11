import { DataModel, actions } from "trade-market/db";

export /*actions*/ /*bundle*/
class CompaniesBridge {
  _model;

  constructor() {
    this._model = DataModel.models.Companies;
  }

  list(params) {}

  bulkSave(params) {}
}
