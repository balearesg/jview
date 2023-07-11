import { DataModel, actions } from "trade-market/db";

export /*actions*/ /*bundle*/
class DistributorBridge {
  _model;

  constructor() {
    this._model = DataModel.models.Distributors;
  }
  data(params) {}

  publish(params) {}

  remove(params) {}
}
