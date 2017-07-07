import App from '../../../main';
import { getOwner } from '@glimmer/di';
import { CustomElementComponent, elementAttribute, elementProperty } from '@glimmer/web-component';

export default class CoolButton extends CustomElementComponent {
  @elementAttribute
  color: string;

  @elementProperty
  foo: { bar: number } = { bar: 10 };

  didAppendLayout() {
    console.log(this.foo);
  }
};
