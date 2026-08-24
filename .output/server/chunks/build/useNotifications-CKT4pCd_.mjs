import { al as useAuth, $ as $fetch$2, k as _sfc_main$2, j as _sfc_main$2$1, J as formatTimeAgo, aM as useRuntimeConfig } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Slideover-CgE0rYyF.mjs';
import { defineComponent, useModel, mergeProps, withCtx, createVNode, unref, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';

//#region app/components/verificador/NotificationsSlideover.vue?vue&type=script&setup=true&lang.ts
var NotificationsSlideover_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "NotificationsSlideover",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		notifications: {},
		loading: { type: Boolean }
	}, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["read"], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const open = useModel(__props, "open");
		const emit = __emit;
		const NOTIFICATION_META = { application_assigned_to_verifier: {
			title: "Nueva solicitud asignada",
			icon: "i-lucide-clipboard-list",
			color: "primary"
		} };
		function metaFor(notification) {
			const base = NOTIFICATION_META[notification.data.type] ?? {
				title: "Notificación",
				icon: "i-lucide-bell",
				color: "neutral"
			};
			if (notification.data.type === "application_verified_by_verifier") return notification.data.result === "RECHAZADA" ? {
				title: "Solicitud rechazada",
				icon: "i-lucide-circle-x",
				color: "error"
			} : {
				title: "Solicitud verificada",
				icon: "i-lucide-circle-check",
				color: "success"
			};
			return base;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_USlideover = _sfc_main;
			const _component_UChip = _sfc_main$2;
			const _component_UIcon = _sfc_main$2$1;
			_push(ssrRenderComponent(_component_USlideover, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: "Notificaciones"
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (__props.loading) _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> Cargando notificaciones... </div>`);
						else if (!__props.notifications.length) _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> No tienes notificaciones pendientes. </div>`);
						else _push(`<!---->`);
						_push(`<!--[-->`);
						ssrRenderList(__props.notifications, (notification) => {
							_push(`<button type="button" class="w-full text-left px-3 py-2.5 rounded-md hover:bg-elevated/50 flex items-center gap-3 relative -mx-3 first:-mt-3 last:-mb-3"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UChip, {
								color: "error",
								show: !notification.read_at,
								inset: ""
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_UIcon, {
										name: metaFor(notification).icon,
										class: `size-5 shrink-0 text-${metaFor(notification).color}`
									}, null, _parent, _scopeId));
									else return [createVNode(_component_UIcon, {
										name: metaFor(notification).icon,
										class: `size-5 shrink-0 text-${metaFor(notification).color}`
									}, null, 8, ["name", "class"])];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`<div class="text-sm flex-1"${_scopeId}><p class="flex items-center justify-between"${_scopeId}><span class="text-highlighted font-medium"${_scopeId}>${ssrInterpolate(metaFor(notification).title)}</span><time${ssrRenderAttr("datetime", notification.created_at)} class="text-muted text-xs"${_scopeId}>${ssrInterpolate(unref(formatTimeAgo)(new Date(notification.created_at)))}</time></p><p class="text-dimmed"${_scopeId}>${ssrInterpolate(notification.data.message)}</p></div></button>`);
						});
						_push(`<!--]-->`);
					} else return [__props.loading ? (openBlock(), createBlock("div", {
						key: 0,
						class: "text-sm text-center py-8 text-dimmed"
					}, " Cargando notificaciones... ")) : !__props.notifications.length ? (openBlock(), createBlock("div", {
						key: 1,
						class: "text-sm text-center py-8 text-dimmed"
					}, " No tienes notificaciones pendientes. ")) : createCommentVNode("", true), (openBlock(true), createBlock(Fragment, null, renderList(__props.notifications, (notification) => {
						return openBlock(), createBlock("button", {
							key: notification.id,
							type: "button",
							class: "w-full text-left px-3 py-2.5 rounded-md hover:bg-elevated/50 flex items-center gap-3 relative -mx-3 first:-mt-3 last:-mb-3",
							onClick: ($event) => emit("read", notification.id)
						}, [createVNode(_component_UChip, {
							color: "error",
							show: !notification.read_at,
							inset: ""
						}, {
							default: withCtx(() => [createVNode(_component_UIcon, {
								name: metaFor(notification).icon,
								class: `size-5 shrink-0 text-${metaFor(notification).color}`
							}, null, 8, ["name", "class"])]),
							_: 2
						}, 1032, ["show"]), createVNode("div", { class: "text-sm flex-1" }, [createVNode("p", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-highlighted font-medium" }, toDisplayString(metaFor(notification).title), 1), createVNode("time", {
							datetime: notification.created_at,
							class: "text-muted text-xs",
							textContent: toDisplayString(unref(formatTimeAgo)(new Date(notification.created_at)))
						}, null, 8, ["datetime", "textContent"])]), createVNode("p", { class: "text-dimmed" }, toDisplayString(notification.data.message), 1)])], 8, ["onClick"]);
					}), 128))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/verificador/NotificationsSlideover.vue
var _sfc_setup = NotificationsSlideover_vue_vue_type_script_setup_true_lang_default.setup;
NotificationsSlideover_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/verificador/NotificationsSlideover.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var NotificationsSlideover_default = Object.assign(NotificationsSlideover_vue_vue_type_script_setup_true_lang_default, { __name: "VerificadorNotificationsSlideover" });
//#endregion
//#region app/composables/useNotifications.ts
function useNotifications() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	function authHeaders() {
		return { Authorization: `Bearer ${token.value}` };
	}
	async function listNotifications(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/notifications`, {
			headers: authHeaders(),
			query: params
		})).data.data;
	}
	async function markNotificationAsRead(id) {
		return (await $fetch$2(`${config.public.apiBase}/notifications/${id}/read`, {
			method: "PATCH",
			headers: authHeaders()
		})).data;
	}
	return {
		listNotifications,
		markNotificationAsRead
	};
}

export { NotificationsSlideover_default as N, useNotifications as u };
//# sourceMappingURL=useNotifications-CKT4pCd_.mjs.map
