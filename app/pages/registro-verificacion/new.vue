<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const { roleCode, user } = useAuth();
const isCoordinator = computed(() => roleCode.value === "coordinator");

const { createApplication, uploadApplicationDocument } = useApplications();
const toast = useToast();
const router = useRouter();

// El coordinador solo pertenece a una sucursal: las solicitudes que registra
// siempre son de esa sucursal, no puede elegir otra.
const coordinatorRole = computed(
  () => user.value?.roles?.find((r) => r.code === "coordinator") ?? null,
);
const coordinatorBranchId = computed(
  () => coordinatorRole.value?.branch_id ?? null,
);
const coordinatorBranchName = computed(
  () => coordinatorRole.value?.branch_name ?? null,
);

const schema = z.object({
  branch_id: z.number({ error: "Tu usuario no tiene una sucursal asignada" }),
  first_name: z
    .string()
    .min(2, "El nombre es obligatorio y debe tener al menos 2 letras"),
  middle_name: z.string().optional(),
  last_name: z
    .string()
    .min(
      2,
      "El apellido paterno es obligatorio y debe tener al menos 2 letras",
    ),
  second_last_name: z
    .string()
    .min(
      2,
      "El apellido materno es obligatorio y debe tener al menos 2 letras",
    ),
  gender: z.string().min(1, "El género es obligatorio"),
  birth_date: z
    .string()
    .min(1, "La fecha de nacimiento es obligatoria")
    .refine((value) => {
      if (!value) return false;
      const birth = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age >= 18;
    }, "El solicitante debe ser mayor de 18 años"),
  curp: z
    .string()
    .min(1, "La CURP es obligatoria")
    .length(18, "La CURP debe tener exactamente 18 caracteres")
    .refine(
      (value) => isValidCurp(value),
      "CURP inválida (18 caracteres, formato oficial)",
    ),
  rfc: z
    .string()
    .min(1, "El RFC es obligatorio")
    .length(13, "El RFC debe tener exactamente 13 caracteres (Persona Física)")
    .refine((value) => isValidRfc(value), "RFC con formato inválido"),
  home_phone: z
    .string()
    .min(1, "El otro teléfono de contacto es obligatorio")
    .length(10, "Debe tener exactamente 10 dígitos, sin espacios ni letras"),
  mobile_phone: z
    .string()
    .min(1, "El teléfono móvil es obligatorio")
    .length(10, "Debe tener exactamente 10 dígitos, sin espacios ni letras"),
  email: z
    .string()
    .min(1, "El correo electrónico es obligatorio")
    .email("Correo electrónico inválido"),
  street: z.string().min(1, "La calle es obligatoria"),
  external_number: z
    .string()
    .min(1, "El número exterior es obligatorio")
    .refine((value) => /^\d+$/.test(value), "Solo se permiten dígitos, sin letras ni espacios"),
  neighborhood: z.string().min(1, "La colonia es obligatoria"),
  city: z.string().min(1, "La ciudad es obligatoria"),
  state: z.string().min(1, "El estado es obligatorio"),
  postal_code: z
    .string()
    .min(1, "El código postal es obligatorio")
    .length(5, "Debe tener exactamente 5 dígitos, sin letras"),
  notes: z.string().optional(),
  street_references: z.string().optional(),
  requested_credit_limit: z
    .number({ error: "Captura el límite de crédito solicitado" })
    .min(1000, "El límite de crédito solicitado debe ser de al menos $1,000"),
  // Datos adicionales para la distribuidora
  occupation_type: z.string().min(1, "Selecciona la ocupación"),
  occupation_monthly_income: z
    .number({ error: "Captura la ganancia al mes" })
    .min(0, "La ganancia no puede ser negativa"),
  occupation_place: z.string().min(1, "El lugar de ocupación es obligatorio"),
  occupation_position: z.string().min(1, "El puesto o grado es obligatorio"),
  occupation_phone: z
    .string()
    .min(1, "El teléfono del trabajo o escuela es obligatorio")
    .length(10, "Debe tener exactamente 10 dígitos, sin espacios ni letras"),
  occupation_years: z
    .number({ error: "Especifica la antigüedad" })
    .min(0, "La antigüedad no puede ser negativa"),
  housing_ownership_type: z
    .string()
    .min(1, "Selecciona la tenencia de vivienda"),
  // Solo el valor numerico: la unidad (m2) es fija, ver housingDimensionUnit.
  housing_dimensions: z
    .string()
    .min(1, "Las dimensiones son obligatorias")
    .refine((value) => /^\d+$/.test(value), "Solo se permiten números, sin letras ni espacios"),
  housing_years: z
    .number({ error: "Especifica los años de vivienda" })
    .min(0, "Los años no pueden ser negativos"),
  work_reference_name: z
    .string()
    .min(1, "La referencia laboral es obligatoria"),
  work_reference_phone: z
    .string()
    .min(1, "El teléfono de referencia es obligatorio")
    .length(10, "Debe tener exactamente 10 dígitos, sin espacios ni letras"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  branch_id: coordinatorBranchId.value ?? undefined,
  first_name: "",
  middle_name: "",
  last_name: "",
  second_last_name: "",
  gender: undefined,
  birth_date: "",
  curp: "",
  rfc: "",
  home_phone: "",
  mobile_phone: "",
  email: "",
  street: "",
  external_number: "",
  neighborhood: "",
  city: "",
  state: "",
  postal_code: "",
  notes: "",
  street_references: "",
  requested_credit_limit: undefined,
  occupation_type: undefined,
  occupation_place: "",
  occupation_position: "",
  occupation_phone: "",
  occupation_years: undefined,
  occupation_monthly_income: undefined,
  housing_ownership_type: undefined,
  housing_dimensions: "",
  housing_years: undefined,
  work_reference_name: "",
  work_reference_phone: "",
});

// Familiares y cónyuge del solicitante
interface FamilyMember {
  name: string;
  relationship: string;
  phone: string;
  age: number | undefined;
}

const familyMembers = ref<FamilyMember[]>([
  { name: "", relationship: "", phone: "", age: undefined },
]);

function addFamilyMember() {
  familyMembers.value.push({
    name: "",
    relationship: "",
    phone: "",
    age: undefined,
  });
}

function removeFamilyMember(index: number) {
  familyMembers.value.splice(index, 1);
}

// Vehículos del solicitante (si tiene)
interface Vehicle {
  brand: string;
  model: string;
  year: string;
  plates: string;
}

const vehicles = ref<Vehicle[]>([]);

function addVehicle() {
  vehicles.value.push({ brand: "", model: "", year: "", plates: "" });
}

function removeVehicle(index: number) {
  vehicles.value.splice(index, 1);
}

// Filtra en vivo lo que se escribe en campos que deben ser solo numericos,
// para que nunca se llegue a mandar una letra o espacio, no solo rechazarlo
// despues al validar (mismo patron que components/staff/MemberModal.vue).
function onlyDigits(value: string, maxLength: number): string {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

// La unidad de las dimensiones de la vivienda es fija (siempre metros
// cuadrados) -- se muestra en un select deshabilitado solo para que quede
// claro en que unidad se esta capturando, no para que se pueda cambiar.
const housingDimensionUnit = "m2";
const housingDimensionUnitItems = [{ label: "Metros cuadrados (m²)", value: "m2" }];

// Edad del solicitante derivada de su fecha de nacimiento (unica fuente de
// verdad; no se duplica en un campo aparte). Se usa para topar la antiguedad
// laboral y los años viviendo en el domicilio -- ver justo abajo.
const applicantAge = computed<number | null>(() => {
  if (!state.birth_date) return null;
  const birth = new Date(state.birth_date);
  if (Number.isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
});

// No se puede tener antiguedad laboral antes de ser mayor de edad.
const maxOccupationYears = computed<number | null>(() =>
  applicantAge.value !== null ? Math.max(0, applicantAge.value - 18) : null,
);
const occupationYearsExceeded = computed(
  () =>
    maxOccupationYears.value !== null &&
    (state.occupation_years ?? 0) > maxOccupationYears.value,
);

// No se puede vivir en un domicilio mas años de los que se tiene de vida.
const maxHousingYears = computed<number | null>(() => applicantAge.value);
const housingYearsExceeded = computed(
  () =>
    maxHousingYears.value !== null &&
    (state.housing_years ?? 0) > maxHousingYears.value,
);

// Un vehiculo no puede ser de un modelo mas de 2 años a futuro.
const maxVehicleYear = new Date().getFullYear() + 2;
function vehicleYearExceeded(year: string): boolean {
  return /^\d{4}$/.test(year) && Number(year) > maxVehicleYear;
}

// Bloquea el envio si alguna de las reglas cruzadas (que dependen de la
// fecha de nacimiento y no se pueden expresar en el schema de zod por
// campo) sigue violada -- se revisa antes de mandar al backend, igual que
// ya se hacia con los documentos obligatorios.
function hasExtraValidationErrors(): boolean {
  return (
    occupationYearsExceeded.value ||
    housingYearsExceeded.value ||
    vehicles.value.some((v) => v.year && vehicleYearExceeded(v.year))
  );
}

// La fotografía de fachada la toma el verificador durante la visita de campo
// (ver components/verificador/VerifyModal.vue), no se captura en el alta.
const idFrontPath = ref<string | null>(null);
const idBackPath = ref<string | null>(null);
const proofOfAddressPath = ref<string | null>(null);

const submitting = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true;

  if (hasExtraValidationErrors()) {
    currentStep.value = 3;
    toast.add({
      title: "Datos fuera de rango",
      description:
        "Revisa la antigüedad, los años viviendo en el domicilio o el año del vehículo: alguno no es congruente con la fecha de nacimiento capturada.",
      color: "error",
    });
    submitting.value = false;
    return;
  }

  if (!idFrontPath.value || !idBackPath.value || !proofOfAddressPath.value) {
    currentStep.value = 5;
    toast.add({
      title: "Faltan documentos obligatorios",
      description:
        "Por favor, sube todos los documentos requeridos (INE frontal, INE reverso y comprobante de domicilio).",
      color: "error",
    });
    submitting.value = false;
    return;
  }

  const data = event.data;

  try {
    const application = await createApplication({
      branch_id: data.branch_id,
      person: {
        first_name: data.first_name,
        middle_name: data.middle_name || undefined,
        last_name: data.last_name,
        second_last_name: data.second_last_name || undefined,
        gender: (data.gender as "M" | "F" | "OTHER" | undefined) || undefined,
        birth_date: data.birth_date || undefined,
        curp: data.curp || undefined,
        rfc: data.rfc || undefined,
        home_phone: data.home_phone || undefined,
        mobile_phone: data.mobile_phone || undefined,
        email: data.email || undefined,
        street: data.street || undefined,
        external_number: data.external_number || undefined,
        neighborhood: data.neighborhood || undefined,
        city: data.city || undefined,
        state: data.state || undefined,
        postal_code: data.postal_code || undefined,
        notes: data.notes || undefined,
        street_references: data.street_references || undefined,
      },
      family_data: {
        members: familyMembers.value
          .filter((m) => m.name || m.relationship || m.phone || m.age)
          .map((m) => ({
            name: m.name || null,
            relationship: m.relationship || null,
            phone: m.phone || null,
            age: m.age ?? null,
          })),
        occupation: {
          type: data.occupation_type || null,
          place_name: data.occupation_place || null,
          position: data.occupation_position || null,
          phone: data.occupation_phone || null,
          years: data.occupation_years ?? null,
          monthly_income: data.occupation_monthly_income ?? null,
        },
        housing: {
          ownership_type: data.housing_ownership_type || null,
          // La unidad es fija (m2); se reconstruye aqui porque el backend
          // sigue guardando dimensions como un string libre.
          dimensions: data.housing_dimensions ? `${data.housing_dimensions} m2` : null,
          years_at_address: data.housing_years ?? null,
          work_reference: {
            name: data.work_reference_name || null,
            phone: data.work_reference_phone || null,
          },
        },
      },
      vehicles: vehicles.value
        .filter((v) => v.brand || v.model || v.year || v.plates)
        .map((v) => ({
          brand: v.brand || null,
          model: v.model || null,
          year: v.year || null,
          plates: v.plates || null,
        })),
      requested_credit_limit: data.requested_credit_limit ?? null,
      id_front_path: idFrontPath.value,
      id_back_path: idBackPath.value,
      proof_of_address_path: proofOfAddressPath.value,
    });

    toast.add({
      title: "Solicitud registrada",
      description: `La solicitud #${application.id} fue enviada a revisión.`,
      color: "success",
    });

    await router.push("/registro-verificacion/coordinador/list");
  } catch (e: any) {
    console.error(e);
    const apiErrors = e?.data?.errors;
    if ((e?.status === 422 || e?.statusCode === 422) && apiErrors) {
      const formattedErrors = Object.entries(apiErrors).map(([field, messages]) => {
        const cleanedField = field.startsWith("person.") ? field.substring(7) : field;
        return {
          name: cleanedField,
          message: (messages as string[])[0] || "Dato inválido",
        };
      });
      formRef.value?.setErrors(formattedErrors);

      if (formattedErrors.length > 0 && formattedErrors[0]) {
        const firstErrorField = formattedErrors[0].name;
        const step = getStepForFieldName(firstErrorField);
        if (step) {
          currentStep.value = step;
        }
      }
    }

    toast.add({
      title: "Error",
      description: extractApiErrorMessage(
        e,
        "No se pudo registrar la solicitud. Verifica los datos e intenta de nuevo.",
      ),
      color: "error",
    });
  } finally {
    submitting.value = false;
  }
}

const currentStep = ref(1);

const steps = [
  { number: 1, label: "Datos Personales", icon: "i-lucide-user" },
  { number: 2, label: "Domicilio y Familiares", icon: "i-lucide-home" },
  {
    number: 3,
    label: "Ocupación, Vivienda y Vehículos",
    icon: "i-lucide-briefcase",
  },
  { number: 4, label: "Límite Solicitado", icon: "i-lucide-dollar-sign" },
  { number: 5, label: "Documentos", icon: "i-lucide-file-text" },
];

function getStepForFieldName(name: string): number {
  const step1Fields = [
    "first_name",
    "last_name",
    "gender",
    "birth_date",
    "curp",
    "rfc",
    "home_phone",
    "mobile_phone",
    "email",
  ];
  const step2Fields = [
    "street",
    "external_number",
    "neighborhood",
    "city",
    "state",
    "postal_code",
  ];
  const step3Fields = [
    "occupation_type",
    "occupation_place",
    "occupation_position",
    "occupation_phone",
    "occupation_years",
    "occupation_monthly_income",
    "housing_ownership_type",
    "housing_years",
    "housing_dimensions",
    "work_reference_name",
    "work_reference_phone",
  ];
  const step4Fields = ["requested_credit_limit"];

  if (step1Fields.includes(name)) return 1;
  if (step2Fields.includes(name)) return 2;
  if (step3Fields.includes(name)) return 3;
  if (step4Fields.includes(name)) return 4;
  return 5;
}

const formRef = ref<any>(null);

function getFieldsForStep(step: number): string[] {
  if (step === 1) {
    return [
      "first_name",
      "last_name",
      "second_last_name",
      "gender",
      "birth_date",
      "curp",
      "rfc",
      "home_phone",
      "mobile_phone",
      "email",
    ];
  }
  if (step === 2) {
    return [
      "street",
      "external_number",
      "neighborhood",
      "city",
      "state",
      "postal_code",
      "street_references",
    ];
  }
  if (step === 3) {
    return [
      "occupation_type",
      "occupation_place",
      "occupation_position",
      "occupation_phone",
      "occupation_years",
      "occupation_monthly_income",
      "housing_ownership_type",
      "housing_years",
      "housing_dimensions",
      "work_reference_name",
      "work_reference_phone",
    ];
  }
  if (step === 4) {
    return ["requested_credit_limit"];
  }
  return [];
}

function validateStep(step: number): { success: boolean; errors: { name: string; message: string }[] } {
  const fields = getFieldsForStep(step);
  if (fields.length === 0) return { success: true, errors: [] };

  // Creamos un sub-schema eligiendo solo las llaves de este paso
  const pickObject = fields.reduce((acc, field) => {
    acc[field] = true;
    return acc;
  }, {} as any);

  // Usamos schema.pick para validar únicamente este grupo de campos
  const stepSchema = schema.pick(pickObject);
  const result = stepSchema.safeParse(state);

  const formattedErrors = result.success
    ? []
    : result.error.issues.map((err) => ({
        name: String(err.path[0]),
        message: err.message,
      }));

  // Reglas cruzadas con la edad (no expresables en el schema de zod por
  // campo): se agregan aqui para que tambien bloqueen el avance del paso 3,
  // no solo el envio final.
  if (step === 3) {
    if (occupationYearsExceeded.value) {
      formattedErrors.push({
        name: "occupation_years",
        message: `No puede ser mayor a ${maxOccupationYears.value} años: es la edad que lleva siendo mayor de edad el solicitante.`,
      });
    }
    if (housingYearsExceeded.value) {
      formattedErrors.push({
        name: "housing_years",
        message: `No puede ser mayor a la edad del solicitante (${maxHousingYears.value} años).`,
      });
    }
  }

  return { success: formattedErrors.length === 0, errors: formattedErrors };
}

async function validateStepAndAdvance(): Promise<boolean> {
  const validation = validateStep(currentStep.value);

  if (validation.success) {
    if (formRef.value) {
      formRef.value.setErrors([]);
    }
    currentStep.value++;
    return true;
  } else {
    if (formRef.value) {
      formRef.value.setErrors(validation.errors);
    }
    toast.add({
      title: "Campos requeridos pendientes",
      description:
        "Por favor, completa todos los campos obligatorios de esta sección antes de continuar.",
      color: "error",
    });
    return false;
  }
}

async function goToStep(stepNumber: number) {
  if (stepNumber <= currentStep.value) {
    if (formRef.value) {
      formRef.value.setErrors([]);
    }
    currentStep.value = stepNumber;
    return;
  }

  while (currentStep.value < stepNumber) {
    const success = await validateStepAndAdvance();
    if (!success) break;
  }
}

function onFormError(event: any) {
  const errors = event.errors || [];
  if (errors.length > 0) {
    const firstErrorName = errors[0].name;
    const step = getStepForFieldName(firstErrorName);
    if (step) {
      currentStep.value = step;
    }
    toast.add({
      title: "Faltan datos obligatorios",
      description:
        "Por favor, revisa los campos marcados en rojo en las pestañas del formulario.",
      color: "error",
    });
  }
}
</script>

<template>
  <UDashboardPanel id="register-distributors-new">
    <template #header>
      <UDashboardNavbar title="Alta de Distribuidor">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="!isCoordinator" class="p-6">
        <UAlert
          color="warning"
          variant="subtle"
          icon="i-lucide-lock"
          title="Acceso restringido"
          description="Solo el rol Coordinador puede registrar nuevas solicitudes de distribuidora."
        />
      </div>

      <div v-else-if="!coordinatorBranchId" class="p-6">
        <UAlert
          color="warning"
          variant="subtle"
          icon="i-lucide-triangle-alert"
          title="Sin sucursal asignada"
          description="Tu usuario coordinador no tiene una sucursal asignada. Contacta a un gerente para que te asigne una antes de registrar solicitudes."
        />
      </div>

      <UForm
        v-else
        ref="formRef"
        id="new-application"
        :schema="schema"
        :state="state"
        class="p-6 space-y-6 w-full"
        @submit="onSubmit"
        @error="onFormError"
      >
        <!-- Stepper Component -->
        <div
          class="mb-8 border border-default bg-elevated/40 rounded-xl p-4 sm:p-5"
        >
          <!-- Desktop Stepper -->
          <div class="hidden md:flex items-center justify-between gap-2">
            <div
              v-for="step in steps"
              :key="step.number"
              class="flex items-center flex-1 last:flex-initial cursor-pointer"
              @click="goToStep(step.number)"
            >
              <div class="flex items-center gap-3">
                <span
                  class="size-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300"
                  :class="
                    currentStep === step.number
                      ? 'bg-primary text-white ring-4 ring-primary/20 scale-110 shadow-sm'
                      : currentStep > step.number
                        ? 'bg-success text-white'
                        : 'bg-muted text-dimmed'
                  "
                >
                  <UIcon
                    v-if="currentStep > step.number"
                    name="i-lucide-check"
                    class="size-4"
                  />
                  <UIcon v-else :name="step.icon" class="size-4" />
                </span>
                <div class="flex flex-col text-left">
                  <span
                    class="text-[10px] text-muted font-semibold uppercase tracking-wider"
                    >Paso {{ step.number }}</span
                  >
                  <span
                    class="text-xs font-semibold transition-colors"
                    :class="
                      currentStep === step.number
                        ? 'text-highlighted font-semibold'
                        : 'text-dimmed'
                    "
                  >
                    {{ step.label }}
                  </span>
                </div>
              </div>
              <div
                v-if="step.number < steps.length"
                class="h-0.5 flex-1 mx-4 rounded-full transition-all duration-500"
                :class="currentStep > step.number ? 'bg-success' : 'bg-muted'"
              />
            </div>
          </div>

          <!-- Mobile Stepper -->
          <div class="md:hidden flex items-center justify-between">
            <div class="flex flex-col">
              <span
                class="text-[10px] text-muted font-semibold uppercase tracking-wider"
              >
                Paso {{ currentStep }} de {{ steps.length }}
              </span>
              <span class="text-sm font-bold text-highlighted">
                {{ steps[currentStep - 1]?.label }}
              </span>
            </div>
            <div class="flex gap-1">
              <span
                v-for="n in steps.length"
                :key="n"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="n === currentStep ? 'w-6 bg-primary' : 'w-2 bg-muted'"
              />
            </div>
          </div>
        </div>

        <!-- Paso 1: Datos Personales -->
        <div v-show="currentStep === 1" class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">Sucursal</h3>
            </template>

            <div class="flex items-center gap-2 text-sm">
              <UIcon name="i-lucide-building-2" class="size-4 text-dimmed" />
              <span class="font-medium">{{
                coordinatorBranchName ?? `Sucursal #${coordinatorBranchId}`
              }}</span>
              <UBadge color="neutral" variant="subtle" size="sm">
                Tu sucursal asignada
              </UBadge>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">
                Datos Personales del Solicitante
              </h3>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Nombre(s)" name="first_name" required>
                <UInput v-model="state.first_name" class="w-full" />
              </UFormField>
              <UFormField label="Segundo nombre" name="middle_name">
                <UInput v-model="state.middle_name" class="w-full" />
              </UFormField>
              <UFormField label="Apellido paterno" name="last_name" required>
                <UInput v-model="state.last_name" class="w-full" />
              </UFormField>
              <UFormField label="Apellido materno" name="second_last_name" required>
                <UInput v-model="state.second_last_name" class="w-full" />
              </UFormField>
              <UFormField label="Género" name="gender" required>
                <USelect
                  v-model="state.gender"
                  :items="[
                    { label: 'Masculino', value: 'M' },
                    { label: 'Femenino', value: 'F' },
                    { label: 'Otro', value: 'OTHER' },
                  ]"
                  placeholder="Selecciona..."
                  class="w-full"
                />
              </UFormField>
              <UFormField
                label="Fecha de nacimiento"
                name="birth_date"
                required
              >
                <UInput v-model="state.birth_date" type="date" class="w-full" />
              </UFormField>
              <UFormField label="CURP" name="curp" required>
                <UInput v-model="state.curp" class="w-full" maxlength="18" />
              </UFormField>
              <UFormField label="RFC" name="rfc" required>
                <UInput v-model="state.rfc" class="w-full" maxlength="13" />
              </UFormField>
              <UFormField label="Teléfono móvil" name="mobile_phone" required>
                <UInput
                  :model-value="state.mobile_phone"
                  class="w-full"
                  inputmode="numeric"
                  maxlength="10"
                  placeholder="10 dígitos, sin espacios"
                  @update:model-value="(value) => (state.mobile_phone = onlyDigits(String(value ?? ''), 10))"
                />
              </UFormField>
              <UFormField label="Otro teléfono de contacto" name="home_phone" required>
                <UInput
                  :model-value="state.home_phone"
                  class="w-full"
                  inputmode="numeric"
                  maxlength="10"
                  placeholder="10 dígitos, sin espacios"
                  @update:model-value="(value) => (state.home_phone = onlyDigits(String(value ?? ''), 10))"
                />
              </UFormField>
              <UFormField label="Correo electrónico" name="email" required>
                <UInput v-model="state.email" type="email" class="w-full" />
              </UFormField>
            </div>
          </UCard>
        </div>

        <!-- Paso 2: Domicilio y Familiares -->
        <div v-show="currentStep === 2" class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">Domicilio</h3>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Calle" name="street" required>
                <UInput v-model="state.street" class="w-full" />
              </UFormField>
              <UFormField
                label="Número exterior"
                name="external_number"
                required
              >
                <UInput
                  :model-value="state.external_number"
                  class="w-full"
                  inputmode="numeric"
                  maxlength="30"
                  placeholder="Sin letras ni espacios"
                  @update:model-value="(value) => (state.external_number = onlyDigits(String(value ?? ''), 30))"
                />
              </UFormField>
              <UFormField label="Estado" name="state" required>
                <UInput v-model="state.state" class="w-full" />
              </UFormField>
              <UFormField label="Ciudad" name="city" required>
                <UInput v-model="state.city" class="w-full" />
              </UFormField>
              <UFormField label="Colonia" name="neighborhood" required>
                <UInput v-model="state.neighborhood" class="w-full" />
              </UFormField>
              <UFormField label="Código postal" name="postal_code" required>
                <UInput
                  :model-value="state.postal_code"
                  class="w-full"
                  inputmode="numeric"
                  maxlength="5"
                  placeholder="5 dígitos"
                  @update:model-value="(value) => (state.postal_code = onlyDigits(String(value ?? ''), 5))"
                />
              </UFormField>
              <UFormField label="Referencias del domicilio" name="street_references" class="md:col-span-2">
                <UTextarea
                  v-model="state.street_references"
                  class="w-full"
                  :rows="3"
                  placeholder="Entre qué calles se encuentra, color de fachada, características particulares, etc."
                />
              </UFormField>
            </div>
          </UCard>
 
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-base">Familiares y Cónyuge</h3>
                <UButton
                  label="Agregar familiar"
                  icon="i-lucide-plus"
                  size="xs"
                  variant="subtle"
                  @click="addFamilyMember"
                />
              </div>
            </template>
 
            <div class="space-y-3">
              <div
                v-for="(member, index) in familyMembers"
                :key="index"
                class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
              >
                <UFormField label="Nombre" class="md:col-span-2">
                  <UInput v-model="member.name" class="w-full" />
                </UFormField>
                <UFormField label="Parentesco">
                  <USelect
                    v-model="member.relationship"
                    :items="[
                      { label: 'Esposo(a) / Cónyuge', value: 'Esposo(a)' },
                      { label: 'Padre / Madre', value: 'Padre/Madre' },
                      { label: 'Hijo(a)', value: 'Hijo(a)' },
                      { label: 'Hermano(a)', value: 'Hermano(a)' },
                      { label: 'Otro', value: 'Otro' }
                    ]"
                    placeholder="Selecciona..."
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Teléfono">
                  <UInput
                    :model-value="member.phone"
                    class="w-full"
                    inputmode="numeric"
                    maxlength="10"
                    placeholder="10 dígitos"
                    @update:model-value="(value) => (member.phone = onlyDigits(String(value ?? ''), 10))"
                  />
                </UFormField>
                <div class="flex items-end gap-2">
                  <UFormField label="Edad" class="flex-1">
                    <UInputNumber
                      v-model="member.age"
                      class="w-full"
                      :min="0"
                    />
                  </UFormField>
                  <UButton
                    icon="i-lucide-trash"
                    color="error"
                    variant="ghost"
                    :disabled="familyMembers.length === 1"
                    @click="removeFamilyMember(index)"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Paso 3: Ocupación, Vivienda y Vehículos -->
        <div v-show="currentStep === 3" class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">
                Datos Adicionales para la Distribuidora
              </h3>
            </template>

            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-semibold text-dimmed mb-3">
                  Ocupación
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <UFormField
                    label="Trabaja o estudia"
                    name="occupation_type"
                    required
                  >
                    <USelect
                      v-model="state.occupation_type"
                      :items="[
                        { label: 'Trabaja', value: 'trabaja' },
                        { label: 'Estudia', value: 'estudia' },
                        { label: 'Otro', value: 'otro' },
                      ]"
                      placeholder="Selecciona..."
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Nombre del trabajo o escuela"
                    name="occupation_place"
                    required
                  >
                    <UInput v-model="state.occupation_place" class="w-full" />
                  </UFormField>
                  <UFormField
                    label="Puesto o grado"
                    name="occupation_position"
                    required
                  >
                    <UInput
                      v-model="state.occupation_position"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Teléfono del trabajo o escuela"
                    name="occupation_phone"
                    required
                  >
                    <UInput
                      :model-value="state.occupation_phone"
                      class="w-full"
                      inputmode="numeric"
                      maxlength="10"
                      placeholder="10 dígitos, sin espacios"
                      @update:model-value="(value) => (state.occupation_phone = onlyDigits(String(value ?? ''), 10))"
                    />
                  </UFormField>
                  <UFormField
                    label="Antigüedad (años)"
                    name="occupation_years"
                    required
                    :hint="maxOccupationYears !== null ? `Máximo ${maxOccupationYears} años` : undefined"
                  >
                    <UInputNumber
                      v-model="state.occupation_years"
                      class="w-full"
                      :min="0"
                      :max="maxOccupationYears ?? undefined"
                    />
                    <p v-if="occupationYearsExceeded" class="text-xs text-error mt-1">
                      No puede ser mayor a {{ maxOccupationYears }} años: es la edad que lleva siendo mayor de
                      edad el solicitante (nació hace {{ applicantAge }} años y la mayoría de edad es a los 18).
                    </p>
                  </UFormField>
                  <UFormField
                    label="Ganancia al mes"
                    name="occupation_monthly_income"
                    required
                  >
                    <UInputNumber
                      v-model="state.occupation_monthly_income"
                      class="w-full"
                      :min="0"
                    />
                  </UFormField>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-sm font-semibold text-dimmed">
                    Vehículos (si tiene)
                  </h4>
                  <UButton
                    label="Agregar vehículo"
                    icon="i-lucide-plus"
                    size="xs"
                    variant="subtle"
                    @click="addVehicle"
                  />
                </div>

                <div v-if="!vehicles.length" class="text-sm text-dimmed">
                  El solicitante no tiene vehículos registrados.
                </div>

                <div v-else class="space-y-3">
                  <div
                    v-for="(vehicle, index) in vehicles"
                    :key="index"
                    class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
                  >
                    <UFormField label="Marca">
                      <UInput v-model="vehicle.brand" class="w-full" />
                    </UFormField>
                    <UFormField label="Modelo">
                      <UInput v-model="vehicle.model" class="w-full" />
                    </UFormField>
                    <UFormField label="Año">
                      <UInput
                        :model-value="vehicle.year"
                        class="w-full"
                        inputmode="numeric"
                        maxlength="4"
                        :placeholder="`Máx. ${maxVehicleYear}`"
                        @update:model-value="(value) => (vehicle.year = onlyDigits(String(value ?? ''), 4))"
                      />
                      <p v-if="vehicleYearExceeded(vehicle.year)" class="text-xs text-error mt-1">
                        No puede ser mayor a {{ maxVehicleYear }}.
                      </p>
                    </UFormField>
                    <UFormField label="Placas">
                      <UInput v-model="vehicle.plates" class="w-full" />
                    </UFormField>
                    <UButton
                      icon="i-lucide-trash"
                      color="error"
                      variant="ghost"
                      @click="removeVehicle(index)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-semibold text-dimmed mb-3">Vivienda</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UFormField
                    label="Tenencia de la vivienda"
                    name="housing_ownership_type"
                    required
                  >
                    <USelect
                      v-model="state.housing_ownership_type"
                      :items="[
                        { label: 'Propia', value: 'propia' },
                        { label: 'Rentada', value: 'rentada' },
                        {
                          label: 'Propia (en proceso de liquidar)',
                          value: 'liquidandola',
                        },
                        { label: 'Infonavit', value: 'infonavit' },
                        {
                          label: 'Crédito bancario',
                          value: 'credito_bancario',
                        },
                      ]"
                      placeholder="Selecciona..."
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Años viviendo en el domicilio"
                    name="housing_years"
                    required
                    :hint="maxHousingYears !== null ? `Máximo ${maxHousingYears} años` : undefined"
                  >
                    <UInputNumber
                      v-model="state.housing_years"
                      class="w-full"
                      :min="0"
                      :max="maxHousingYears ?? undefined"
                    />
                    <p v-if="housingYearsExceeded" class="text-xs text-error mt-1">
                      No puede ser mayor a la edad del solicitante ({{ maxHousingYears }} años): no pudo vivir
                      ahí antes de nacer.
                    </p>
                  </UFormField>
                  <UFormField
                    label="Dimensiones de la vivienda"
                    name="housing_dimensions"
                    required
                    hint="Solo números"
                  >
                    <div class="flex gap-2">
                      <UInput
                        :model-value="state.housing_dimensions"
                        placeholder="Ej. 120"
                        class="w-full"
                        inputmode="numeric"
                        maxlength="6"
                        @update:model-value="(value) => (state.housing_dimensions = onlyDigits(String(value ?? ''), 6))"
                      />
                      <USelect
                        :model-value="housingDimensionUnit"
                        :items="housingDimensionUnitItems"
                        disabled
                        class="w-40 shrink-0 opacity-70"
                      />
                    </div>
                  </UFormField>
                  <div />
                  <UFormField
                    label="Referencia laboral — nombre"
                    name="work_reference_name"
                    required
                  >
                    <UInput
                      v-model="state.work_reference_name"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Referencia laboral — teléfono"
                    name="work_reference_phone"
                    required
                  >
                    <UInput
                      :model-value="state.work_reference_phone"
                      class="w-full"
                      inputmode="numeric"
                      maxlength="10"
                      placeholder="10 dígitos, sin espacios"
                      @update:model-value="(value) => (state.work_reference_phone = onlyDigits(String(value ?? ''), 10))"
                    />
                  </UFormField>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Paso 4: Límite Solicitado -->
        <div v-show="currentStep === 4" class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">Límite Solicitado</h3>
            </template>

            <UFormField
              label="Límite de crédito solicitado"
              name="requested_credit_limit"
              required
            >
              <UInputNumber
                v-model="state.requested_credit_limit"
                class="w-full max-w-sm"
                :min="1000"
                :step="100"
              />
            </UFormField>
          </UCard>
        </div>

        <!-- Paso 5: Documentos -->
        <div v-show="currentStep === 5" class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-base">Documentos Escaneados</h3>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="INE (frontal)" required>
                <ApplicationsEvidencePhotoCapture
                  v-model="idFrontPath"
                  :upload="
                    (file) => uploadApplicationDocument(file, 'id_front')
                  "
                  label="INE (frontal)"
                />
              </UFormField>
              <UFormField label="INE (reverso)" required>
                <ApplicationsEvidencePhotoCapture
                  v-model="idBackPath"
                  :upload="(file) => uploadApplicationDocument(file, 'id_back')"
                  label="INE (reverso)"
                />
              </UFormField>
              <UFormField label="Comprobante de domicilio" required>
                <ApplicationsEvidencePhotoCapture
                  v-model="proofOfAddressPath"
                  :upload="
                    (file) =>
                      uploadApplicationDocument(file, 'proof_of_address')
                  "
                  label="Comprobante de domicilio"
                />
              </UFormField>
            </div>
          </UCard>
        </div>

        <!-- Navigation Buttons -->
        <div
          class="flex justify-between items-center pt-6 border-t border-default mt-6"
        >
          <div>
            <UButton
              v-if="currentStep > 1"
              label="Anterior"
              color="neutral"
              variant="subtle"
              icon="i-lucide-arrow-left"
              @click="currentStep--"
            />
            <UButton
              v-else
              label="Cancelar"
              color="neutral"
              variant="subtle"
              to="/registro-verificacion"
            />
          </div>

          <div class="flex gap-2">
            <UButton
              v-if="currentStep < 5"
              label="Siguiente"
              color="primary"
              variant="solid"
              trailing-icon="i-lucide-arrow-right"
              @click="goToStep(currentStep + 1)"
            />
            <UButton
              v-else
              label="Registrar Solicitud"
              color="primary"
              variant="solid"
              type="submit"
              :loading="submitting"
            />
          </div>
        </div>
      </UForm>
    </template>
  </UDashboardPanel>
</template>
