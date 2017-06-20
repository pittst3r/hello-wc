import App from '../../../main';
import Component, { tracked } from '@glimmer/component';
import { getOwner } from '@glimmer/di';

export default class CoolInput extends Component {
  @tracked id: string = 'lol';
  @tracked inputType: string = 'text';

  didInsertElement(): void {
    let shadowRoot = this.element.parentNode as ShadowRoot;
    let element = shadowRoot.host;

    this.id = element.textContent.toLowerCase().trim().replace(/[^a-z]/, '-');
    this.inputType = element.getAttribute('type');
  }
};
