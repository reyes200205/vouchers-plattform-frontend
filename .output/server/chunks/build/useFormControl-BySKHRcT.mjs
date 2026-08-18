import { ae as unrefElement } from '../virtual/entry.mjs';
import { computed, toValue } from 'vue';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFormControl.js
function useFormControl(el) {
	return computed(() => toValue(el) ? Boolean(unrefElement(el)?.closest("form")) : true);
}

export { useFormControl as u };
//# sourceMappingURL=useFormControl-BySKHRcT.mjs.map
