"use client"

import { AlertConfirmation } from "./AlertConfirmation"
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { Sheet, SheetContent } from "./ui/sheet"

export function SideSheet({
    children,
}: {
    children: React.ReactNode,
}) {
    const [showExitConfirmation, setShowExitConfirmation] = useState(false)
    const router = useRouter()

    const closeSheet = () => {
        router.back()
    }

    const handleOpenChange = () => {
        const isUserFormModified = localStorage.getItem("userFormModified")
        if (isUserFormModified && JSON.parse(isUserFormModified)) {
            setShowExitConfirmation(true)
        } else {
            router.back()
        }
    }

    return (
        <Sheet  open={true} onOpenChange={handleOpenChange}>
                <SheetContent className="overflow-y-hidden">
                    <AlertConfirmation
                        open={showExitConfirmation}
                        setOpen={setShowExitConfirmation}
                        confirmationAction={closeSheet}
                        message="You haven't saved your changes. Please confirm you want to exit without saving."
                    />
                    {children}
                </SheetContent>
        </Sheet>
    )
}