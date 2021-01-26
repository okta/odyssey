import { Component, Prop, Element, Event, EventEmitter, h } from '@stencil/core';
import classNames from 'classnames';
import { ButtonInterface } from './interface';
import { ButtonTypes, ButtonActionTypes, ButtonSizes } from './types';

@Component({ tag: 'ods-button', styleUrl: 'button.scss', shadow: true })
export class Button implements ButtonInterface {

  // TODO: OKTA-328844 Rename `type` to `theme` (or other) as 
  // buttons have a valid type as part of HTML spec. Ensure type
  // is repurposed for its intended use.
  @Prop({ reflect: true }) type: ButtonTypes = 'primary';
  @Prop() disabled: boolean;
  @Prop({ reflect: true }) size: ButtonSizes = 'regular';

  // TODO: OKTA-252008 Have to swap the functionality of type and actionType. 
  // type is a standard button attribute which we are currently setting using actionType
  // so that it is not breaking in other places.
  @Prop() actionType: ButtonActionTypes = 'button';

  // Currently unspecified in new design system
  @Prop() href: string;

  @Element() el: HTMLElement;
  @Event() odsButtonFocus: EventEmitter;

  handleFocusEvent() {
    this.odsButtonFocus.emit();
  }

  render() {
    const buttonClassName = classNames({
      'ods-button': true,
      'is-ods-button-small': this.size === 'small',
      [`is-ods-button-${this.type}`]: this.type
    });
    
    const ariaDescribedBy = this.el.getAttribute('aria-describedby');

    let button =
      <button
        data-se="button"
        type={this.actionType}
        class={buttonClassName}
        disabled={this.disabled}
        {...(ariaDescribedBy && {'aria-describedby': ariaDescribedBy})}
        onFocus={this.handleFocusEvent.bind(this)}
      >
        <slot></slot>
      </button>;

    const linkButton =
      <a href={this.href} tabindex="-1" target="_blank" rel="noopener noreferrer">
        {button}
      </a>;

    return (
      this.href && !this.disabled ? linkButton : button
    );
  }
}
