import Header from "@/components/header";
import React from "react";

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="sticky top-0 z-50 w-full">
                <Header />
            </div>
            {children}
        </>
    );
}
