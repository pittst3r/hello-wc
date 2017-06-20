import Component from "@glimmer/component";

export default class HelloWc extends Component {
  doSomething(): void {
    alert('lol');
  }

  get labels(): string[] {
    return ['Name'];
  }
}
