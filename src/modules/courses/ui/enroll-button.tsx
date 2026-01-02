"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enrollUser } from "@/lib/actions/user-course";

interface EnrollButtonProps {
    courseType: string;
    isEnrolled: boolean;
    resumeLink: string;
}

export const EnrollButton = ({
    courseType,
    isEnrolled,
    resumeLink,
}: EnrollButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleEnroll = () => {
        startTransition(async () => {
            try {
                const result = await enrollUser(courseType);
                if (result.success) {
                    // Toast or simple success handling could go here
                    // The server action revalidates the path, so the UI should update automatically
                    router.refresh(); // Force refresh to be sure
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error("Failed to enroll:", error);
            }
        });
    };

    if (isEnrolled) {
        return (
            <Link
                href={resumeLink}
                className="block w-full text-center px-4 py-3 mt-4 rounded-lg bg-emerald-500 text-white font-medium text-sm hover:bg-emerald-600 transition-colors"
            >
                Resume Learning
            </Link>
        );
    }

    return (
        <button
            onClick={handleEnroll}
            disabled={isPending}
            className="block w-full text-center px-4 py-3 mt-4 rounded-lg bg-slate-100 text-slate-900 font-medium text-sm hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isPending ? "Enrolling..." : "Enroll Now"}
        </button>
    );
};
