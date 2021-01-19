import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'o-icon', styleUrl: 'sass/icon.scss', shadow: true })
export class Icon {

  @Prop() name: string;
  @Prop() size: 'x-small' | 'small' | 'medium'| 'large' | 'x-large' = 'small';

  render() {
    const classes = [
      'o-icon',
      `o-icon-${this.name}`,
      `o-icon-size-${this.size}`,
    ];
    return <span data-se="icon" class={classes.join(' ')} />;
  }
}
