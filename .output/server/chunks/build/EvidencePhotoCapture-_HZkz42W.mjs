import { aP as useToast, f as _sfc_main, j as _sfc_main$2 } from '../virtual/entry.mjs';
import { _ as _sfc_main$1 } from './Badge-BBG1L7MO.mjs';
import { _ as _sfc_main$3 } from './Alert-CSACBiI_.mjs';
import { defineComponent, useModel, ref, useTemplateRef, mergeProps, unref, withCtx, createTextVNode, mergeModels, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';

//#region app/components/applications/EvidencePhotoCapture.vue?vue&type=script&setup=true&lang.ts
var EvidencePhotoCapture_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "EvidencePhotoCapture",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		label: {},
		upload: { type: Function }
	}, {
		"modelValue": { default: null },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props, { expose: __expose }) {
		const props = __props;
		const path = useModel(__props, "modelValue");
		const toast = useToast();
		const previewUrl = ref(null);
		const uploading = ref(false);
		const cameraActive = ref(false);
		const cameraError = ref(null);
		const videoEl = useTemplateRef("videoEl");
		const fileInputEl = useTemplateRef("fileInputEl");
		let mediaStream = null;
		function stopCamera() {
			mediaStream?.getTracks().forEach((track) => track.stop());
			mediaStream = null;
			cameraActive.value = false;
			if (videoEl.value) videoEl.value.srcObject = null;
		}
		async function openCamera() {
			cameraError.value = null;
			if (!(void 0).isSecureContext || !(void 0).mediaDevices?.getUserMedia) {
				cameraError.value = "Este sitio no está en un contexto seguro (HTTPS o localhost), así que el navegador bloquea el acceso a la cámara sin siquiera pedir permiso. Abre la app por HTTPS o desde localhost para poder tomar la foto.";
				return;
			}
			try {
				mediaStream = await (void 0).mediaDevices.getUserMedia({
					video: { facingMode: "environment" },
					audio: false
				});
				cameraActive.value = true;
				await nextTick();
				if (videoEl.value) {
					videoEl.value.srcObject = mediaStream;
					await videoEl.value.play();
				}
			} catch (e) {
				console.error(e);
				cameraActive.value = false;
				const name = e instanceof DOMException ? e.name : null;
				if (name === "NotAllowedError") cameraError.value = "El navegador ya tiene bloqueado el permiso de cámara para este sitio (no te va a volver a preguntar). Entra a la configuración del sitio en tu navegador, permite \"Cámara\" manualmente y recarga la página.";
				else if (name === "NotFoundError" || name === "OverconstrainedError") cameraError.value = "No se encontró ninguna cámara disponible en este dispositivo.";
				else if (name === "NotReadableError") cameraError.value = "La cámara ya está siendo usada por otra aplicación o pestaña. Ciérrala e intenta de nuevo.";
				else cameraError.value = "No se pudo acceder a la cámara. Revisa los permisos del navegador e intenta de nuevo.";
			}
		}
		async function uploadPhoto(file) {
			if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
			previewUrl.value = URL.createObjectURL(file);
			path.value = null;
			uploading.value = true;
			try {
				const result = await props.upload(file);
				path.value = result.path;
			} catch (e) {
				console.error(e);
				toast.add({
					title: "Error",
					description: `No se pudo subir "${props.label}". Intenta de nuevo.`,
					color: "error"
				});
				if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
				previewUrl.value = null;
			} finally {
				uploading.value = false;
			}
		}
		function capturePhoto() {
			if (!videoEl.value) return;
			const video = videoEl.value;
			const canvas = (void 0).createElement("canvas");
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			stopCamera();
			canvas.toBlob((blob) => {
				if (!blob) return;
				uploadPhoto(new File([blob], `evidence-${Date.now()}.jpg`, { type: "image/jpeg" }));
			}, "image/jpeg", .9);
		}
		function triggerFileInput() {
			fileInputEl.value?.click();
		}
		function reset() {
			stopCamera();
			cameraError.value = null;
			if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
			previewUrl.value = null;
			path.value = null;
			uploading.value = false;
		}
		__expose({ reset });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_UBadge = _sfc_main$1;
			const _component_UAlert = _sfc_main$3;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><input type="file" accept="image/*" class="hidden">`);
			if (unref(cameraActive)) {
				_push(`<div class="space-y-2"><video autoplay playsinline muted class="w-full max-w-xs rounded-lg border border-default bg-black aspect-video object-cover"></video><div class="flex gap-2">`);
				_push(ssrRenderComponent(_component_UButton, {
					label: "Capturar",
					icon: "i-lucide-camera",
					color: "primary",
					variant: "solid",
					onClick: capturePhoto
				}, null, _parent));
				_push(ssrRenderComponent(_component_UButton, {
					label: "Cancelar",
					color: "neutral",
					variant: "subtle",
					onClick: stopCamera
				}, null, _parent));
				_push(`</div></div>`);
			} else {
				_push(`<!--[-->`);
				if (unref(previewUrl)) {
					_push(`<div class="relative w-full max-w-xs overflow-hidden rounded-lg border border-default"><img${ssrRenderAttr("src", unref(previewUrl))}${ssrRenderAttr("alt", `Vista previa: ${__props.label}`)} class="w-full h-40 object-cover">`);
					if (unref(uploading)) {
						_push(`<div class="absolute inset-0 flex items-center justify-center bg-black/40">`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-loader-circle",
							class: "size-6 text-white animate-spin"
						}, null, _parent));
						_push(`</div>`);
					} else if (path.value) _push(ssrRenderComponent(_component_UBadge, {
						color: "success",
						variant: "solid",
						size: "sm",
						class: "absolute bottom-2 right-2"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` Subida `);
							else return [createTextVNode(" Subida ")];
						}),
						_: 1
					}, _parent));
					else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
				if (unref(cameraError)) _push(ssrRenderComponent(_component_UAlert, {
					color: "error",
					variant: "subtle",
					icon: "i-lucide-triangle-alert",
					description: unref(cameraError)
				}, null, _parent));
				else _push(`<!---->`);
				_push(`<div class="flex gap-2">`);
				_push(ssrRenderComponent(_component_UButton, {
					label: unref(previewUrl) ? "Volver a tomar" : "Tomar foto",
					icon: "i-lucide-camera",
					color: "neutral",
					variant: "subtle",
					loading: unref(uploading),
					onClick: openCamera
				}, null, _parent));
				_push(ssrRenderComponent(_component_UButton, {
					label: unref(previewUrl) ? "Subir otra" : "Subir foto",
					icon: "i-lucide-upload",
					color: "neutral",
					variant: "subtle",
					loading: unref(uploading),
					onClick: triggerFileInput
				}, null, _parent));
				_push(`</div><!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/components/applications/EvidencePhotoCapture.vue
var _sfc_setup = EvidencePhotoCapture_vue_vue_type_script_setup_true_lang_default.setup;
EvidencePhotoCapture_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/applications/EvidencePhotoCapture.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var EvidencePhotoCapture_default = Object.assign(EvidencePhotoCapture_vue_vue_type_script_setup_true_lang_default, { __name: "ApplicationsEvidencePhotoCapture" });

export { EvidencePhotoCapture_default as E };
//# sourceMappingURL=EvidencePhotoCapture-_HZkz42W.mjs.map
