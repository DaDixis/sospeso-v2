/// <reference types="astro/client" />

declare module "*.astro" {
	const AstroComponent: (props: any) => any;
	export default AstroComponent;
}
