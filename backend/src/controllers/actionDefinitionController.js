import ActionDefinition from '../models/action-definition';

export const getActionDefinitionByKey = async (actionKey) => {
  try {
    return await ActionDefinition.getActionDefinitionByKey(actionKey);
  } catch (error) {
    throw error;
  }
}
