import { GraduationCap, Plus, Sparkles, Trash } from 'lucide-react';
import React from 'react'

const ProjectForm = ({ data, onChange }) => {
    const addProject = () => {
        const newProject = {
            name: '',
            type: '',
            description: '',
        }

        onChange([...data, newProject]);
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updatedProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Project</h3>
                    <p className='text-sm text-gray-500'>Add your project</p>
                </div>

                <button className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700
                rounded-lg hover:bg-green-200 transition-colors' onClick={addProject}>
                    <Plus className='size-4' />
                    Add Education
                </button>
            </div>

            <div className='spacce-y-4'>
                {data.map((project, index) => (
                    <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3 mt-6'>
                        <div className='flex justify-between items-start'>
                            <h4>Project #{index + 1}</h4>
                            <button onClick={() => removeProject(index)} className='text-red-500
                                hover:text-red-700 transition-colors'><Trash className='size-4' /></button>
                        </div>

                        <div className='grid gap-3'>
                            <input type="text" value={project.name || ""} placeholder='Project Name'
                                onChange={(e) => updatedProject(index, 'name', e.target.value)}
                                className='px-3 py-2 text-sm rounded-lg' />

                            <input type="text" value={project.type || ""} placeholder="Project type"
                                onChange={(e) => updatedProject(index, 'type', e.target.value)}
                                className='px-3 py-2 text-sm rounded-lg' />
                        </div>

                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <label className='text-sm font-medium text-gray-700'>Project Decription</label>
                                <button className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100
                                    text-purple-700 rounded hover:bg-purple-200 transition-colors
                                    disabled:opasiti-50'><Sparkles className='w-3 h-3' />Enhance with AI</button>
                            </div>

                            <textarea className='w-full text-sm px-3 py-2 rounded-lg resize-none' rows={4}
                                value={project.description || ""} placeholder='Describe your Project ...'
                                onChange={(e) => updatedProject(index, "description", e.target.value)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectForm