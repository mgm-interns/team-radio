import { ObjectId } from 'bson';

export function addValueOfToObjectID() {
  ObjectId.prototype.valueOf = function() {
    return this.toString();
  };
}

export default () => {
  addValueOfToObjectID();
};
