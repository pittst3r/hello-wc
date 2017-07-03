import App from '../../../main';
import { getOwner } from '@glimmer/di';
import { CustomElementComponent, tracked } from '@glimmer/web-component';

export default class CoolButton extends CustomElementComponent {
  get color(): string {
    return this.args.htmlAttributes.color;
  }
};
