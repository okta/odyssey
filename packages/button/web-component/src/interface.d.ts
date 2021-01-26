import { ComponentInterface } from '@stencil/core';
import { ButtonTypes, ButtonSizes } from './types';

export interface ButtonInterface extends ComponentInterface {
  type: ButtonTypes;
  size: ButtonSizes;
  disabled: boolean;
  href: string;
}
