import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import { initializeCustomElement, CustomElementComponentManager } from '@glimmer/web-component';

const app = new App();
const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
    registry.register(`component-manager:/${app.rootName}/component-managers/custom-element`, CustomElementComponentManager);
  }
});

initializeCustomElement({ app, componentName: 'cool-button', elementName: 'cool-button-wc' });
app.renderComponent('hello-wc', containerElement);

app.boot();
