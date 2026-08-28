"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export function initPreline(times = 0) {
    setTimeout(() => {
        try {
            window.HSStaticMethods.autoInit();
        }
        catch (error) {
            if (times <= 10) {
                initPreline(times + 1);
            }
            else {
                throw error;
            }
        }
    }, 100 * (times + 1));
}
const AUTH_PATHS = ['/login', '/register'];
export default function PrelineScript() {
    const path = usePathname();
    const isAuthPage = AUTH_PATHS.includes(path !== null && path !== void 0 ? path : '');
    useEffect(() => {
        if (isAuthPage)
            return;
        import("preline/preline");
    }, [isAuthPage]);
    useEffect(() => {
        if (isAuthPage)
            return;
        initPreline();
    }, [path, isAuthPage]);
    return null;
}
