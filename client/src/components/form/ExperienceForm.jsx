import { Briefcase, Loader2, Plus, Sparkles, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../configs/api';

const ExperienceForm = ({ data, onChange }) => {
    const { token } = useSelector(state => state.auth);
    const [geteratingIndex, setGeneratingIndex] = useState(-1);
    const [isGenerating, setIsGenerating] = useState(false);

    const addExperience = () => {
        const newExperience = {
            company: '',
            position: '',
            start_date: '',
            end_date: '',
            description: '',
            is_current: false
        };

        onChange([...data, newExperience]);
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updatedExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    }

    const generateDescription = async (index) => {
        setGeneratingIndex(index)
        const experience = data[index];
        const prompt = `enhance my professional summary ${experience.description} for the position of ${experience.position} at ${experience.company}`
        setIsGenerating(true);
        try {
            const { data } = await api.post('/api/ai/enhance-job-desc', { userContent: prompt }, { headers: { Authorization: token } })
            console.log(data)
            updatedExperience(index, "description", data.enhancedJobDesc)
        } catch (error) {
            console.error(error);
        } finally {
            setGeneratingIndex(-1);
            setIsGenerating(false);
        }
    }
    
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Experience</h3>
                    <p className='text-sm text-gray-500'>Add your job experience</p>
                </div>

                <button className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700
                rounded-lg hover:bg-green-200 transition-colors' onClick={addExperience}>
                    <Plus className='size-4' />
                    Add Experience
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No work experience added yet.</p>
                    <p className='text-sm'>Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className='spacce-y-4'>
                    {data.map((experience, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3 mt-6'>
                            <div className='flex justify-between items-start'>
                                <h4>Experience #{index + 1}</h4>
                                <button onClick={() => removeExperience(index)} className='text-red-500
                                hover:text-red-700 transition-colors'><Trash className='size-4' /></button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-3'>

                                <input type="text" value={experience.company || ""} placeholder='Company Name'
                                    onChange={(e) => updatedExperience(index, 'company', e.target.value)}
                                    className='px-3 py-2 text-sm rounded-lg' />

                                <input type="text" value={experience.position || ""} placeholder='Job Title'
                                    onChange={(e) => updatedExperience(index, 'position', e.target.value)}
                                    className='px-3 py-2 text-sm rounded-lg' />

                                <input type="month" value={experience.start_date || ""}
                                    onChange={(e) => updatedExperience(index, 'start_date', e.target.value)}
                                    className='px-3 py-2 text-sm rounded-lg' />

                                <input type="month" value={experience.end_date || ""} disabled={experience.is_current}
                                    onChange={(e) => updatedExperience(index, 'end_date', e.target.value)}
                                    className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100' />
                            </div>

                            <label className='flex items-center gap-2'>
                                <input type="checkbox" checked={experience.is_current || false}
                                    onChange={(e) => updatedExperience(index, 'is_current', e.target.checked ? true : false)}
                                    className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                                <span className='text-sm text-gray-700'>Currently working here</span>
                            </label>

                            <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <label className='text-sm font-medium text-gray-700'>Job Decription</label>
                                    <button className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100
                                    text-purple-700 rounded hover:bg-purple-200 transition-colors
                                    disabled:opasiti-50'
                                    onClick={() => {generateDescription(index)}}
                                    disabled={isGenerating || geteratingIndex == index || !experience.description 
                                        || !experience.position || !experience.company}>
                                        {isGenerating ? (<Loader2 className='size-4 animate-spin' />) : (<Sparkles className='size-4' />)}
                                        {isGenerating ? "Generating..." : "AI Enhance"}
                                    </button>
                                </div>

                                <textarea className='w-full text-sm px-3 py-2 rounded-lg resize-none' rows={4}
                                    value={experience.description || ""} placeholder='Describe your key responsibilities and achievements ...'
                                    onChange={(e) => updatedExperience(index, "description", e.target.value)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExperienceForm