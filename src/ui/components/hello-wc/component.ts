import Component, { tracked } from '@glimmer/component';

export default class HelloWc extends Component {
  @tracked color = 'red';
  text = 'initial value from outer glimmer template';
  @tracked
  foo;
  changeColor(): void {
    this.color = {
      red: 'green',
      green: 'red'
    }[this.color];
    if (!this.foo) {
      this.foo = { bar: 0 }
    }
    this.foo = { bar: this.foo.bar + 1 };
  }
}
