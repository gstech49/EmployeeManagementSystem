import { CalendarDays, FileText, Loader2, Send, X } from 'lucide-react'
import React, { useState } from 'react'

const ApplyLeaveModal = ({open, onClose, onSuccess}) => {
    const [loading, setLoading] = useState(false)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const minDate = today.toISOString().split('T')[0]
    const handleSubmit = async (e) => {
        e.preventDefault()
    }
    if(!open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4
     bg-black/40 backdrop-blur-sm' onClose={onClose}>
        <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in' 
        onClick={(e) => e.stopPropagation()}>
           {/*------------------------------Header---------------------------*/}
            <div className='flex items-center justify-between p-6 pb-0'>
                <div>
                    <h2 className='text-lg font-semibold text-slate-800'>Apply for Leave</h2>
                    <p className='text-sm text-slate-400 mt-0.5'>Submit your leave request for approval</p>
                </div>
                <button className='p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors' 
                        onClick={onClose}>
                    <X className='w-5 h-5'/>
                </button>
            </div>
            {/*-------------Form----------*/}
            <form onSubmit={handleSubmit} className='p-6 space-y-5'>
                {/*----------Leave Type----------*/}
                <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-2'>
                        <FileText className='w-4 h-4 text-slate-400'/>
                        <span className='text-sm font-medium text-slate-700'>Leave Type</span>
                    </label>
                    <select name='type' required className='border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                        <option>Annual Leave</option>
                        <option>Sick Leave</option>
                        <option>Personal Leave</option>
                    </select>
                </div>

                {/*-----------Duration----------*/}
                <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-2'>
                        <CalendarDays className='w-4 h-4 text-slate-400'/>
                        <span className='text-sm font-medium text-slate-700'>Duration</span>
                    </label>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <span className='text-sm font-medium text-slate-700'>From</span>
                            <input type='date' name='startDate' required min={minDate} className='border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                        </div>
                        <div>
                            <span className='text-sm font-medium text-slate-700'>To</span>
                            <input type='date' name='endDate' required min={minDate} className='border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                        </div>
                    </div>
                </div>

                {/*------------Reason------------*/}
                <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-2'>
                        <FileText className='w-4 h-4 text-slate-400'/>
                        <span className='text-sm font-medium text-slate-700'>Reason</span>
                    </label>
                    <textarea name='reason' required placeholder='Enter the reason for your leave request...' className='border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500' rows='3'/>
                </div>

                {/*------------Buttons----------*/}
                <div className='flex justify-end gap-3 pt-4 border-t border-slate-200'>
                    <button 
                        type='button' 
                        onClick={onClose} 
                        className='px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors'
                    >
                        Cancel
                    </button>
                    <button 
                        type='submit' 
                        disabled={loading} 
                        className='flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
                    >
                        {loading ? <Loader2 className='w-4 h-4 animate-spin'/> : <Send className='w-4 h-4'/>}
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>

            </form>
        </div>
    </div>
  )
}

export default ApplyLeaveModal