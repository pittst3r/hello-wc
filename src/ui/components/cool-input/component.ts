import App from '../../../main';
import Component, { tracked } from '@glimmer/component';
import { getOwner } from '@glimmer/di';
import { CustomElementComponent } from '@glimmer/web-component';

export default class CoolInput extends CustomElementComponent {
  // id = 'lol';

  get text(): string {
    return this.shadowDom.parentNode.host.getAttribute('text');
  }

  // @tracked element;

  // @tracked('element')
  // get inputType(): string {
  //   if (!this.element) return '';
  //   return this.element.getAttribute('type');
  // }
};
