declare module "podcast-api" {
  interface Foo {
    search: boolean;
    justListen: () => Promise<Episode>;
  }

  export function Client(initializer: { apiKey: string | null }): Foo;
}
