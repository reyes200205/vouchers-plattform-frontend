import { u as defineNuxtRouteMiddleware, aM as useRuntimeConfig, al as useAuth, A as APPROVAL_RESTRICTED_ROLES, a1 as navigateTo } from '../virtual/entry.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:path';
import 'unhead/plugins';
import 'unhead/utils';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'nostics';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'devalue';
import '@iconify/utils/lib/css/icon';
import 'tailwindcss/colors';

//#region app/middleware/approvals-inbox-channel.ts
var approvals_inbox_channel_default = defineNuxtRouteMiddleware(() => {
	if (useRuntimeConfig().public.channel === "vpn") return;
	const { roleCode } = useAuth();
	if (APPROVAL_RESTRICTED_ROLES.includes(roleCode.value ?? "")) return navigateTo("/general");
});

export { approvals_inbox_channel_default as default };
//# sourceMappingURL=approvals-inbox-channel-C38yzOSA.mjs.map
