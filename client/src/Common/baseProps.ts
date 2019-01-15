/**
 * Must be identifiable.
 */
export interface Identified {
  /**
   * Specifies an id that is used for html id attribute.
   *
   * @see [MDN]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id}
   */
  id: string;
}

/**
 * Optional version of {@link Identified}.
 */
export interface Identifiable {
  /**
   * Specifies an id that is used for html id attribute.
   *
   * @see [MDN]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id}
   */
  id?: string;
}

/**
 * Can contain children.
 */
export interface Container {
  /**
   * children that will be rendered inside the component.
   */
  children?: React.ReactNode;
}

/**
 * Can not contain children.
 */
export interface InContainer {
  /**
   * define children will throw compiler error
   */
  children?: never;
}

/**
 * Can be styled.
 */
export interface Styleable {
  /**
   * Additional css class names.
   */
  className?: string;

  /**
   * Additional style.
   */
  style?: React.CSSProperties;
}
