import { ref, nextTick } from 'vue';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function useComposing(onEnd) {
	const isComposing = ref(false);
	function handleCompositionStart() {
		isComposing.value = true;
	}
	function handleCompositionEnd(event) {
		nextTick(() => {
			isComposing.value = false;
			onEnd?.(event);
		});
	}
	return {
		isComposing,
		handleCompositionStart,
		handleCompositionEnd
	};
}

export { useComposing as u };
//# sourceMappingURL=useComposing-D1bdBmsI.mjs.map
