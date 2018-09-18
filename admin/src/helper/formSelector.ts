export namespace FormSelector {
  export function getFormRecord(state: any): { values: any } | undefined {
    if (state.form && state.form[RECORD_FORM_KEY]) {
      return state.form[RECORD_FORM_KEY];
    }
    return undefined;
  }

  export function getFormRecordField<T>(state: any, source: string): T | string | undefined {
    const form = getFormRecord(state);
    if (form && form.values && form.values[source]) {
      return form.values[source];
    }
    return undefined;
  }

  export const RECORD_FORM_KEY = 'record-form';
}
