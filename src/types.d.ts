declare const window: any;

declare class Compendium {
  importEntity(entity: Entity<T>);
}

declare class ClientSettings {
  get(module: string, key: string);
  set(module: string, key: string, value: any);
  register(module: string, key: string, data: any);
}

declare interface Game {
  packs: Map<string, Compendium>;
  settings: ClientSettings;
  user: any;
  i18n: any;
}

declare const game: Game;

declare module Hooks {
  function on(trigger: string, callback: (args: any) => void);
}

declare abstract class FormApplication {
  constructor();
  constructor(object: any, options?: any);
  static defaultOptions: any;
  editors: any;
  form: HTMLElement;
  options: { editable: boolean };
  object: any;
  render(force: boolean, options?: RenderOptions): Promise<void>;
  _renderInner(): Promise<void>;
  abstract _updateObject(event: Event, formData: any): Promise<any>;
  _onSubmit(event: JQuery.ClickEvent);
}

declare function duplicate<T>(original: T): T;
declare function mergeObject(
  original: Object,
  other: Object,
  insert?: boolean,
  overwrite?: boolean,
  inplace?: boolean,
  enforceTypes?: boolean,
  _d?: number,
): Object;
declare function expandObject(original: Object): any;

declare const PlaceablesLayer = any;
declare const Note = any;
declare const NoteConfig = any;

declare class Babele {
  public static get(): any;
}
