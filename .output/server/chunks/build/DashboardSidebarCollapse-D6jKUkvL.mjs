import { ap as useComponentProps, ay as useForwardProps, a7 as reactiveOmit, aB as useLocale, aj as useAppConfig, ag as tv, f as _sfc_main$1 } from '../virtual/entry.mjs';
import { l as useDashboard } from './DashboardSidebarToggle-BSz-SOza.mjs';
import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-sidebar-collapse.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_sidebar_collapse_default = {
	"base": "hidden lg:flex",
	"variants": { "side": {
		"left": "",
		"right": ""
	} }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebarCollapse.vue
var _sfc_main = {
	__name: "UDashboardSidebarCollapse",
	__ssrInlineRender: true,
	props: {
		color: {
			type: null,
			required: false,
			default: "neutral"
		},
		variant: {
			type: null,
			required: false,
			default: "ghost"
		},
		side: {
			type: String,
			required: false,
			default: "left"
		},
		ui: {
			type: Object,
			required: false
		},
		label: {
			type: String,
			required: false
		},
		activeColor: {
			type: null,
			required: false
		},
		activeVariant: {
			type: null,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		square: {
			type: Boolean,
			required: false
		},
		block: {
			type: Boolean,
			required: false
		},
		loadingAuto: {
			type: Boolean,
			required: false
		},
		onClick: {
			type: [Function, Array],
			required: false
		},
		class: {
			type: null,
			required: false
		},
		icon: {
			type: null,
			required: false
		},
		avatar: {
			type: Object,
			required: false
		},
		leading: {
			type: Boolean,
			required: false
		},
		leadingIcon: {
			type: null,
			required: false
		},
		trailing: {
			type: Boolean,
			required: false
		},
		trailingIcon: {
			type: null,
			required: false
		},
		loading: {
			type: Boolean,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		type: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		exactActiveClass: {
			type: String,
			required: false
		},
		viewTransition: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = useComponentProps("dashboardSidebarCollapse", __props);
		const buttonProps = useForwardProps(reactiveOmit(props, "icon", "side", "class"));
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const { sidebarCollapsed, collapseSidebar } = useDashboard({
			sidebarCollapsed: ref(false),
			collapseSidebar: () => {}
		});
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_sidebar_collapse_default,
			...appConfig.ui?.dashboardSidebarCollapse || {}
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, mergeProps({
				...unref(buttonProps),
				"icon": unref(props).icon || (unref(sidebarCollapsed) ? unref(appConfig).ui.icons.panelOpen : unref(appConfig).ui.icons.panelClose),
				"aria-label": unref(sidebarCollapsed) ? unref(t)("dashboardSidebarCollapse.expand") : unref(t)("dashboardSidebarCollapse.collapse"),
				..._ctx.$attrs
			}, {
				class: ui.value({
					class: [unref(props).ui?.base, unref(props).class],
					side: unref(props).side
				}),
				onClick: ($event) => unref(collapseSidebar)?.(!unref(sidebarCollapsed))
			}, _attrs), null, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebarCollapse.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=DashboardSidebarCollapse-D6jKUkvL.mjs.map
