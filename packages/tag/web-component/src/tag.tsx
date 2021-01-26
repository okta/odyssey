import { Component, Element, h } from '@stencil/core';
import { TagInterface } from './interface';

@Component({ tag: 'ods-tag', styleUrl: 'tag.scss', shadow: true })
export class Tag implements TagInterface {
  @Element() el: HTMLElement;

  render() {
    return (
      <li class='ods-tag'>
        <slot></slot>
      </li>
    )
  }
}
