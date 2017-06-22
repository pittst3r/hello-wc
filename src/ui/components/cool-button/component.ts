import App from '../../../main';
import { getOwner } from '@glimmer/di';
import { CustomElementComponent, tracked } from '@glimmer/web-component';

export default class CoolInput extends CustomElementComponent {
  attributes: {
    color: string;
  };

  @tracked('attributes')
  get color(): string {
    return this.attributes.color ||
      (this.shadowDom.parentNode && this.shadowDom.parentNode.host.getAttribute('color')) ||
      'yellow';
  }
};
