import type { App, Plugin} from 'vue';
import { each } from 'lodash-es';

type SFCWithInstall<T> = T & Plugin;

export function makeInstaller(components: Plugin[]) {
  return (app: App) => {
    each(components, (component) => {
      app.use(component);
    });
  }
}

export function withInstall<T>(component: T) {
  (component as any).install = (app: App) => {
    const name = (component as any).name as string;
    app.component(name, component as Plugin);
  }
  return component as SFCWithInstall<T>;
}