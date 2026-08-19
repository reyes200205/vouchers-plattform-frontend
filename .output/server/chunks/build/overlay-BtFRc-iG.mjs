//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/utils/overlay.js
function pointerDownOutside(e, options = {}) {
	const originalEvent = e.detail.originalEvent;
	const target = originalEvent.target;
	if (!target?.isConnected) {
		e.preventDefault();
		return;
	}
	if (options.scrollable) {
		if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) e.preventDefault();
	}
}

export { pointerDownOutside as p };
//# sourceMappingURL=overlay-BtFRc-iG.mjs.map
