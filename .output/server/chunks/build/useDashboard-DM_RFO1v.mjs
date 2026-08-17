import { q as createSharedComposable, aI as useRoute, aJ as useRouter } from '../virtual/entry.mjs';
import { d as defineShortcuts } from './defineShortcuts-zVsILOx1.mjs';
import { ref, watch } from 'vue';

//#region app/composables/useDashboard.ts
var _useDashboard = () => {
	const route = useRoute();
	const router = useRouter();
	const isNotificationsSlideoverOpen = ref(false);
	defineShortcuts({
		"g-h": () => router.push("/"),
		"g-i": () => router.push("/inbox"),
		"g-c": () => router.push("/customers"),
		"g-s": () => router.push("/settings"),
		"n": () => isNotificationsSlideoverOpen.value = !isNotificationsSlideoverOpen.value
	});
	watch(() => route.fullPath, () => {
		isNotificationsSlideoverOpen.value = false;
	});
	return { isNotificationsSlideoverOpen };
};
var useDashboard = createSharedComposable(_useDashboard);

export { useDashboard as u };
//# sourceMappingURL=useDashboard-DM_RFO1v.mjs.map
