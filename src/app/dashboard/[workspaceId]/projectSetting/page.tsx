"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, AlertTriangle } from "lucide-react"

export default function ProjectSettings() {
  const [projectName, setProjectName] = useState("")
  const [projectId] = useState("proj_abc123def456")

  const handleCopy = () => {
    navigator.clipboard.writeText(projectId)
  }

  const handleUpdate = () => {
    // Handle update logic
    console.log("Updating project with name:", projectName)
  }

  const handleDeleteProject = () => {
    // Handle delete logic
    console.log("Deleting project")
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold text-white mb-8">Project Setting</h1>

      {/* General Setting Section */}
      <div className="mb-12">
        <h2 className="text-lg font-medium text-white mb-6">General Setting</h2>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Description */}
            <div>
              <h3 className="text-white font-medium mb-3">General Setting</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Project Name and Project ID uniquely identify this project when using Encora services.
              </p>
            </div>

            {/* Right side - Form */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="project-name" className="text-slate-300 text-sm mb-2 block">
                  Project name
                </Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-slate-500"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <Label htmlFor="project-id" className="text-slate-300 text-sm mb-2 block">
                  Description
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="project-id"
                    value={projectId}
                    readOnly
                    className="bg-slate-900 border-slate-600 text-white flex-1"
                  />
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-3"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdate} className="bg-teal-600 hover:bg-teal-700 text-white">
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Project Section */}
      <div>
        <h2 className="text-lg font-medium text-white mb-6">Delete Project</h2>

        <div className="bg-red-950/20 border border-red-800/30 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Warning */}
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-medium mb-3">Delete Project</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  This action will remove both the project and its database. Ensure you have a backup to retain your
                  data.
                </p>
              </div>
            </div>

            {/* Right side - Delete Button */}
            <div className="flex justify-end items-start">
              <Button
                onClick={handleDeleteProject}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Delete Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
