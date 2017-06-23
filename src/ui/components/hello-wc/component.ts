import Component, { tracked } from '@glimmer/component';

export default class HelloWc extends Component {
  @tracked color = 'red';
  text = 'initial value from outer glimmer template';
  changeColor(): void {
    this.color = {
      red: 'green',
      green: 'red'
    }[this.color];
  }
}
