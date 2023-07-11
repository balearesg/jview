import { DataModel, actions } from "trade-market/db";

export /*actions*/ /*bundle*/
class DistributorsBridge {
  _model;

  constructor() {
    this._model = DataModel.models.Distributors;
  }

  async list(params) {}

  bulkSave(params) {}
}
