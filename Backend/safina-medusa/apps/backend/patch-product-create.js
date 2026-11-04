const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../../node_modules/@medusajs/dashboard/dist');
const chunkFile = path.join(targetDir, 'chunk-54LPD2WP.mjs');
const productCreateFile = path.join(targetDir, 'product-create-UNUUOKUG.mjs');

if (!fs.existsSync(chunkFile) || !fs.existsSync(productCreateFile)) {
  console.log('Product create bundle files not found in dashboard dist.');
  process.exit(0);
}

// 1. Patch chunk-54LPD2WP.mjs (Schema, Defaults, Normalize)
let chunkContent = fs.readFileSync(chunkFile, 'utf8');

// Patch normalizeProductFormValues
if (!chunkContent.includes('rug_material ? { material: values.rug_material }')) {
  const normTarget = `variants: normalizeVariants(
      values.variants.filter((variant) => variant.should_create),
      values.regionsCurrencyMap
    )
  };`;
  
  const normReplacement = `variants: normalizeVariants(
      values.variants.filter((variant) => variant.should_create),
      values.regionsCurrencyMap
    ),
    metadata: {
      ...(values.metadata || {}),
      ...(values.rug_material ? { material: values.rug_material } : {}),
      ...(values.rug_shape ? { shape: values.rug_shape } : {}),
      ...(values.rug_pattern ? { pattern: values.rug_pattern } : {}),
      ...(values.rug_colors && values.rug_colors.length ? { colors: values.rug_colors } : {}),
      ...(values.rug_rooms && values.rug_rooms.length ? { rooms: values.rug_rooms } : {})
    }
  };`;

  if (chunkContent.includes(normTarget)) {
    chunkContent = chunkContent.replace(normTarget, normReplacement);
    console.log('Patched normalizeProductFormValues in chunk-54LPD2WP.mjs');
  } else {
    console.warn('Could not find normTarget in chunk-54LPD2WP.mjs');
  }
}

// Patch ProductCreateSchema
if (!chunkContent.includes('rug_material: z.string().optional()')) {
  const schemaTarget = `sales_channels: z.array(
    z.object({
      id: z.string(),
      name: z.string()
    })
  ).optional(),
  origin_country: z.string().optional(),
  material: z.string().optional(),`;

  const schemaReplacement = `sales_channels: z.array(
    z.object({
      id: z.string(),
      name: z.string()
    })
  ).optional(),
  origin_country: z.string().optional(),
  material: z.string().optional(),
  rug_material: z.string().optional(),
  rug_shape: z.string().optional(),
  rug_pattern: z.string().optional(),
  rug_colors: z.array(z.string()).optional(),
  rug_rooms: z.array(z.string()).optional(),`;

  if (chunkContent.includes(schemaTarget)) {
    chunkContent = chunkContent.replace(schemaTarget, schemaReplacement);
    console.log('Patched ProductCreateSchema in chunk-54LPD2WP.mjs');
  } else {
    console.warn('Could not find schemaTarget in chunk-54LPD2WP.mjs');
  }
}

// Patch PRODUCT_CREATE_FORM_DEFAULTS
if (!chunkContent.includes('rug_material: ""')) {
  const defaultsTarget = `weight: "",
  width: ""
};`;

  const defaultsReplacement = `weight: "",
  width: "",
  rug_material: "",
  rug_shape: "",
  rug_pattern: "",
  rug_colors: [],
  rug_rooms: []
};`;

  if (chunkContent.includes(defaultsTarget)) {
    chunkContent = chunkContent.replace(defaultsTarget, defaultsReplacement);
    console.log('Patched PRODUCT_CREATE_FORM_DEFAULTS in chunk-54LPD2WP.mjs');
  } else {
    console.warn('Could not find defaultsTarget in chunk-54LPD2WP.mjs');
  }
}

fs.writeFileSync(chunkFile, chunkContent, 'utf8');

// 2. Patch product-create-UNUUOKUG.mjs
let pcContent = fs.readFileSync(productCreateFile, 'utf8');

// A. Add imports (Select, Label)
if (!pcContent.includes('Select as SelectRug')) {
  pcContent = pcContent.replace(
    'import { Button as Button5, ProgressTabs, toast } from "@medusajs/ui";',
    'import { Button as Button5, ProgressTabs, toast, Select as SelectRug, Label as LabelRug } from "@medusajs/ui";'
  );
  console.log('Patched imports in product-create-UNUUOKUG.mjs');
}

// B. Inject ProductCreateRugAttributesForm component
if (!pcContent.includes('ProductCreateRugAttributesForm')) {
  const formComponentCode = `
var RUG_MATERIALS = ["Wool", "Silk", "Cotton", "Jute", "Synthetic", "Blend"];
var RUG_SHAPES = ["Rectangle", "Round", "Runner", "Square", "Oval"];
var RUG_PATTERNS = ["Tribal", "Geometric", "Floral", "Solid", "Traditional", "Modern"];
var RUG_COLORS = ["Red", "Blue", "Beige", "Multi", "Black", "White", "Green", "Pink", "Brown", "Grey"];
var RUG_ROOMS = ["Bedroom", "Living Room", "Hallway", "Dining Room", "Office", "Outdoor"];

var ProductCreateRugAttributesForm = ({ form }) => {
  const rugMaterial = useWatch4({ control: form.control, name: "rug_material" }) || "";
  const rugShape = useWatch4({ control: form.control, name: "rug_shape" }) || "";
  const rugPattern = useWatch4({ control: form.control, name: "rug_pattern" }) || "";
  const rugColors = useWatch4({ control: form.control, name: "rug_colors" }) || [];
  const rugRooms = useWatch4({ control: form.control, name: "rug_rooms" }) || [];

  const toggleColor = (c) => {
    const cur = form.getValues("rug_colors") || [];
    const next = cur.includes(c) ? cur.filter((i) => i !== c) : [...cur, c];
    form.setValue("rug_colors", next, { shouldDirty: true });
  };

  const toggleRoom = (r) => {
    const cur = form.getValues("rug_rooms") || [];
    const next = cur.includes(r) ? cur.filter((i) => i !== r) : [...cur, r];
    form.setValue("rug_rooms", next, { shouldDirty: true });
  };

  return /* @__PURE__ */ jsx12("div", {
    className: "flex flex-col items-center p-16",
    children: /* @__PURE__ */ jsxs10("div", {
      className: "flex w-full max-w-[720px] flex-col gap-y-8",
      children: [
        /* @__PURE__ */ jsxs10("div", {
          className: "flex flex-col gap-y-1",
          children: [
            /* @__PURE__ */ jsx12(Heading2, { children: "Rug Attributes" }),
            /* @__PURE__ */ jsx12("p", {
              className: "text-ui-fg-subtle text-sm",
              children: "Specify rug specifications such as material, shape, pattern, colors, and rooms for catalog filtering."
            })
          ]
        }),
        /* @__PURE__ */ jsxs10("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-6",
          children: [
            /* @__PURE__ */ jsxs10("div", {
              className: "flex flex-col gap-y-2",
              children: [
                /* @__PURE__ */ jsx12(LabelRug, { size: "small", weight: "plus", children: "Material" }),
                /* @__PURE__ */ jsxs10(SelectRug, {
                  value: rugMaterial,
                  onValueChange: (v) => form.setValue("rug_material", v === "__none__" ? "" : v, { shouldDirty: true }),
                  children: [
                    /* @__PURE__ */ jsx12(SelectRug.Trigger, {
                      children: /* @__PURE__ */ jsx12(SelectRug.Value, { placeholder: "Select material" })
                    }),
                    /* @__PURE__ */ jsxs10(SelectRug.Content, {
                      children: [
                        /* @__PURE__ */ jsx12(SelectRug.Item, { value: "__none__", children: "None" }, "none"),
                        ...RUG_MATERIALS.map((m) =>
                          /* @__PURE__ */ jsx12(SelectRug.Item, { value: m, children: m }, m)
                        )
                      ]
                    })
                  ]
                })
              ]
            }),
            /* @__PURE__ */ jsxs10("div", {
              className: "flex flex-col gap-y-2",
              children: [
                /* @__PURE__ */ jsx12(LabelRug, { size: "small", weight: "plus", children: "Shape" }),
                /* @__PURE__ */ jsxs10(SelectRug, {
                  value: rugShape,
                  onValueChange: (v) => form.setValue("rug_shape", v === "__none__" ? "" : v, { shouldDirty: true }),
                  children: [
                    /* @__PURE__ */ jsx12(SelectRug.Trigger, {
                      children: /* @__PURE__ */ jsx12(SelectRug.Value, { placeholder: "Select shape" })
                    }),
                    /* @__PURE__ */ jsxs10(SelectRug.Content, {
                      children: [
                        /* @__PURE__ */ jsx12(SelectRug.Item, { value: "__none__", children: "None" }, "none"),
                        ...RUG_SHAPES.map((s) =>
                          /* @__PURE__ */ jsx12(SelectRug.Item, { value: s, children: s }, s)
                        )
                      ]
                    })
                  ]
                })
              ]
            }),
            /* @__PURE__ */ jsxs10("div", {
              className: "flex flex-col gap-y-2",
              children: [
                /* @__PURE__ */ jsx12(LabelRug, { size: "small", weight: "plus", children: "Pattern" }),
                /* @__PURE__ */ jsxs10(SelectRug, {
                  value: rugPattern,
                  onValueChange: (v) => form.setValue("rug_pattern", v === "__none__" ? "" : v, { shouldDirty: true }),
                  children: [
                    /* @__PURE__ */ jsx12(SelectRug.Trigger, {
                      children: /* @__PURE__ */ jsx12(SelectRug.Value, { placeholder: "Select pattern" })
                    }),
                    /* @__PURE__ */ jsxs10(SelectRug.Content, {
                      children: [
                        /* @__PURE__ */ jsx12(SelectRug.Item, { value: "__none__", children: "None" }, "none"),
                        ...RUG_PATTERNS.map((p) =>
                          /* @__PURE__ */ jsx12(SelectRug.Item, { value: p, children: p }, p)
                        )
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),
        /* @__PURE__ */ jsx12(Divider, {}),
        /* @__PURE__ */ jsxs10("div", {
          className: "flex flex-col gap-y-3",
          children: [
            /* @__PURE__ */ jsxs10("div", {
              children: [
                /* @__PURE__ */ jsx12(LabelRug, { size: "small", weight: "plus", children: "Colors" }),
                /* @__PURE__ */ jsx12("p", {
                  className: "text-ui-fg-subtle text-xs mt-0.5",
                  children: "Select all colors that apply to this rug."
                })
              ]
            }),
            /* @__PURE__ */ jsx12("div", {
              className: "flex flex-wrap gap-2",
              children: RUG_COLORS.map((c) => {
                const isSelected = rugColors.includes(c);
                return /* @__PURE__ */ jsx12("button", {
                  key: c,
                  type: "button",
                  onClick: () => toggleColor(c),
                  className: "px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer " + (
                    isSelected
                      ? "bg-ui-button-inverted text-ui-fg-on-inverted border-transparent shadow-sm"
                      : "bg-ui-bg-field border-ui-border-base text-ui-fg-subtle hover:bg-ui-bg-field-hover hover:text-ui-fg-base"
                  ),
                  children: c
                }, c);
              })
            })
          ]
        }),
        /* @__PURE__ */ jsx12(Divider, {}),
        /* @__PURE__ */ jsxs10("div", {
          className: "flex flex-col gap-y-3",
          children: [
            /* @__PURE__ */ jsxs10("div", {
              children: [
                /* @__PURE__ */ jsx12(LabelRug, { size: "small", weight: "plus", children: "Rooms" }),
                /* @__PURE__ */ jsx12("p", {
                  className: "text-ui-fg-subtle text-xs mt-0.5",
                  children: "Select suitable rooms for this rug."
                })
              ]
            }),
            /* @__PURE__ */ jsx12("div", {
              className: "flex flex-wrap gap-2",
              children: RUG_ROOMS.map((r) => {
                const isSelected = rugRooms.includes(r);
                return /* @__PURE__ */ jsx12("button", {
                  key: r,
                  type: "button",
                  onClick: () => toggleRoom(r),
                  className: "px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer " + (
                    isSelected
                      ? "bg-ui-button-inverted text-ui-fg-on-inverted border-transparent shadow-sm"
                      : "bg-ui-bg-field border-ui-border-base text-ui-fg-subtle hover:bg-ui-bg-field-hover hover:text-ui-fg-base"
                  ),
                  children: r
                }, r);
              })
            })
          ]
        })
      ]
    })
  });
};
`;

  pcContent = pcContent.replace(
    'var SAVE_DRAFT_BUTTON = "save-draft-button";',
    'var SAVE_DRAFT_BUTTON = "save-draft-button";\n' + formComponentCode
  );
  console.log('Patched ProductCreateRugAttributesForm component into product-create-UNUUOKUG.mjs');
}

// C. Patch tabState in ProductCreateForm
if (!pcContent.includes('["rug-attributes"]: "not-started"')) {
  pcContent = pcContent.replace(
    '["inventory" /* INVENTORY */]: "not-started"',
    '["inventory" /* INVENTORY */]: "not-started",\n    ["rug-attributes"]: "not-started"'
  );
  console.log('Patched tabState in product-create-UNUUOKUG.mjs');
}

// D. Patch onNext
if (!pcContent.includes('setTab("rug-attributes")')) {
  pcContent = pcContent.replace(
    `if (currentTab === "variants" /* VARIANTS */) {
      setTab("inventory" /* INVENTORY */);
    }`,
    `if (currentTab === "variants" /* VARIANTS */) {
      if (showInventoryTab) {
        setTab("inventory" /* INVENTORY */);
      } else {
        setTab("rug-attributes");
      }
    }
    if (currentTab === "inventory" /* INVENTORY */) {
      setTab("rug-attributes");
    }`
  );
  console.log('Patched onNext in product-create-UNUUOKUG.mjs');
}

// E. Patch useEffect2 tab state tracking
if (!pcContent.includes('currentState["rug-attributes"] = "in-progress"')) {
  pcContent = pcContent.replace(
    `currentState["inventory" /* INVENTORY */] = "in-progress";
    }
    setTabState({ ...currentState });`,
    `currentState["inventory" /* INVENTORY */] = "in-progress";
    }
    if (tab === "rug-attributes") {
      currentState["details" /* DETAILS */] = "completed";
      currentState["organize" /* ORGANIZE */] = "completed";
      currentState["variants" /* VARIANTS */] = "completed";
      if (showInventoryTab) {
        currentState["inventory" /* INVENTORY */] = "completed";
      }
      currentState["rug-attributes"] = "in-progress";
    }
    setTabState({ ...currentState });`
  );
  console.log('Patched useEffect2 in product-create-UNUUOKUG.mjs');
}

// F. Patch KeyboundForm Enter check
if (pcContent.includes('if (tab !== "variants" /* VARIANTS */) {')) {
  pcContent = pcContent.replace(
    'if (tab !== "variants" /* VARIANTS */) {',
    'if (tab !== "rug-attributes") {'
  );
  console.log('Patched KeyboundForm in product-create-UNUUOKUG.mjs');
}

// G. Patch ProgressTabs.Trigger
if (!pcContent.includes('value: "rug-attributes"')) {
  pcContent = pcContent.replace(
    `children: t("products.create.tabs.inventory")
                  }
                )
              ] }) }) }),`,
    `children: t("products.create.tabs.inventory")
                  }
                ),
                /* @__PURE__ */ jsx12(
                  ProgressTabs.Trigger,
                  {
                    status: tabState["rug-attributes"],
                    value: "rug-attributes",
                    className: "max-w-[200px] truncate",
                    children: "Rug Attributes"
                  }
                )
              ] }) }) }),`
  );
  console.log('Patched ProgressTabs.Trigger in product-create-UNUUOKUG.mjs');
}

// H. Patch ProgressTabs.Content
if (!pcContent.includes('ProductCreateRugAttributesForm, { form }')) {
  pcContent = pcContent.replace(
    `children: /* @__PURE__ */ jsx12(ProductCreateInventoryKitForm, { form })
                  }
                )
              ] })`,
    `children: /* @__PURE__ */ jsx12(ProductCreateInventoryKitForm, { form })
                  }
                ),
                /* @__PURE__ */ jsx12(
                  ProgressTabs.Content,
                  {
                    className: "size-full overflow-y-auto",
                    value: "rug-attributes",
                    children: /* @__PURE__ */ jsx12(ProductCreateRugAttributesForm, { form })
                  }
                )
              ] })`
  );
  console.log('Patched ProgressTabs.Content in product-create-UNUUOKUG.mjs');
}

// I. Patch PrimaryButton
if (pcContent.includes('if (tab === "variants" /* VARIANTS */ && !showInventoryTab || tab === "inventory" /* INVENTORY */ && showInventoryTab) {')) {
  pcContent = pcContent.replace(
    'if (tab === "variants" /* VARIANTS */ && !showInventoryTab || tab === "inventory" /* INVENTORY */ && showInventoryTab) {',
    'if (tab === "rug-attributes") {'
  );
  console.log('Patched PrimaryButton in product-create-UNUUOKUG.mjs');
}

fs.writeFileSync(productCreateFile, pcContent, 'utf8');
console.log('Successfully applied all Rug Attributes creation patches!');
