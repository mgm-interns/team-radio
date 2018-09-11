import * as FormValidators from 'redux-form-validators';

export const required = FormValidators.required;
export const email = compose('email');
export const numericality = compose<FormValidators.NumericalityValidatorOptions>('numericality');
export const date = compose<FormValidators.DateValidatorOptions>('date');
export const length = compose<FormValidators.LengthValidatorOptions>('length');
export const confirmation = compose<FormValidators.ConfirmationValidatorOptions>('confirmation');
export const format = compose<FormValidators.FormatOptions>('format');
export const acceptance = compose('acceptance');
export const inclusion = compose<FormValidators.InclusionValidatorOptions>('inclusion');
export const exclusion = compose('exclusion');
export const absence = compose('absence');
export const url = compose<FormValidators.UrlValidatorOptions>('url');
export const file = compose<FormValidators.FileValidatorOptions>('file');

export const slug = () => (value: string) => {
  if (value && value.includes(' ')) {
    return 'must be a slug name (E.g.: "team-radio")';
  }
  return undefined;
};

// Add optional condition to the validator
function compose<DefaultOptions extends FormValidators.DefaultValidatorOptions>(fn: string) {
  return (options?: DefaultOptions) => (value: string) => value && (FormValidators as any)[fn](options)(value);
}
