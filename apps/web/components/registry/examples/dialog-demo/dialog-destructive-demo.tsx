"use client"

import { Button } from "@/registry/ui/button"
import {
  Dialog,
  DialogAction,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog"
import { AlertTriangle, Trash2 } from "lucide-react"
import { useState } from "react"

export default function DestructiveDialogDemo() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [itemDeleted, setItemDeleted] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setItemDeleted(true)
    }, 1500)
  }

  return (
    <div>
      {itemDeleted ? (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
          <p className="text-green-700 font-medium">
            Item successfully deleted
          </p>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-1.5" /> Delete Project
            </Button>
          </DialogTrigger>
          <DialogContent appearance={"destructive"}>
            <DialogHeader>
              <DialogTitle className="text-destructive">
                Delete Permanent Project
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                This will permanently delete the project "Marketing Campaign
                2024" and all associated data. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-red-50 dark:bg-red-950/50 p-4 rounded-lg mb-4">
              <div className="flex items-center">
                <AlertTriangle className="text-red-500 mr-3 flex-shrink-0" />
                <p className="text-destructive text-sm">
                  Warning: Deleting this project will remove all tasks,
                  documents, and analytics permanently.
                </p>
              </div>
            </div>
            <DialogFooter>
              <DialogAction
                variant="destructive"
                disabled={isDeleting}
                onClick={handleDelete}
                className="w-full"
              >
                {isDeleting ? "Deleting..." : "Permanently Delete Project"}
              </DialogAction>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
