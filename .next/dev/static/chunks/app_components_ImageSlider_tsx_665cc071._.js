(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/ImageSlider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageSlider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ImageSlider({ images, intervalMs = 4500 }) {
    _s();
    const safeImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ImageSlider.useMemo[safeImages]": ()=>images.filter({
                "ImageSlider.useMemo[safeImages]": (x)=>x?.src
            }["ImageSlider.useMemo[safeImages]"])
    }["ImageSlider.useMemo[safeImages]"], [
        images
    ]);
    const [idx, setIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLandscape, setIsLandscape] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageSlider.useEffect": ()=>{
            if (safeImages.length <= 1) return;
            const t = setInterval({
                "ImageSlider.useEffect.t": ()=>{
                    setIdx({
                        "ImageSlider.useEffect.t": (v)=>(v + 1) % safeImages.length
                    }["ImageSlider.useEffect.t"]);
                }
            }["ImageSlider.useEffect.t"], intervalMs);
            return ({
                "ImageSlider.useEffect": ()=>clearInterval(t)
            })["ImageSlider.useEffect"];
        }
    }["ImageSlider.useEffect"], [
        intervalMs,
        safeImages.length
    ]);
    if (safeImages.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ring-soft flex aspect-[4/5] w-full items-center justify-center p-4 text-center text-sm text-zinc-600",
            children: [
                "Add your photos to ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mx-1 font-semibold",
                    children: "public/assets/"
                }, void 0, false, {
                    fileName: "[project]/app/components/ImageSlider.tsx",
                    lineNumber: 27,
                    columnNumber: 28
                }, this),
                "and update the list in ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mx-1 font-semibold",
                    children: "app/page.tsx"
                }, void 0, false, {
                    fileName: "[project]/app/components/ImageSlider.tsx",
                    lineNumber: 28,
                    columnNumber: 32
                }, this),
                "."
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/ImageSlider.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this);
    }
    const active = safeImages[Math.min(idx, safeImages.length - 1)];
    const mobileAspectClass = isLandscape === true ? "aspect-[16/11]" : "aspect-[4/5]";
    const imageFitClass = isLandscape === true ? "object-contain p-2" : "object-cover";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: [
                    "relative w-full",
                    mobileAspectClass,
                    "sm:aspect-[16/10]",
                    isLandscape === true ? "bg-white/35" : ""
                ].join(" "),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: active.src,
                        alt: active.alt,
                        fill: true,
                        priority: true,
                        sizes: "(max-width: 640px) 92vw, 720px",
                        onLoadingComplete: (img)=>{
                            setIsLandscape(img.naturalWidth >= img.naturalHeight);
                        },
                        className: imageFitClass
                    }, active.src, false, {
                        fileName: "[project]/app/components/ImageSlider.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ImageSlider.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ImageSlider.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            safeImages.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5",
                children: safeImages.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": `Go to slide ${i + 1}`,
                        onClick: ()=>setIdx(i),
                        className: [
                            "h-1.5 rounded-full transition-all",
                            i === idx ? "w-6 bg-white/90" : "w-2.5 bg-white/55"
                        ].join(" ")
                    }, i, false, {
                        fileName: "[project]/app/components/ImageSlider.tsx",
                        lineNumber: 67,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/ImageSlider.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ImageSlider.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(ImageSlider, "5rKTFI7NjsSmJp75Nx7wcHNsYR8=");
_c = ImageSlider;
var _c;
__turbopack_context__.k.register(_c, "ImageSlider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_ImageSlider_tsx_665cc071._.js.map