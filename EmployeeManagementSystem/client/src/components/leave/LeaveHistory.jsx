import { useState } from 'react'
import { getDayTypeDisplay, getWorkingHoursDisplay } from '../../assets/assets'
import {format} from 'date-fns'
import {Loader2, Check, X} from 'lucide-react'

const LeaveHistory = ({leave, isAdmin, onUpdate}) => {
  const [processing, setProcessing] = useState(null)
  const handleUpdateStatus = async (id, status) => {
    setProcessing(id)
    try {
      await onUpdate(id, status)
    } finally {
      setProcessing(null)
    }
  }

  return (
    <div className='card overflow-hidden'>          
          <div className='overflow-x-auto'>
            <table className='table-modern'>
              <thead className='text-xs text-slate-700 uppercase bg-slate-50'>
                <tr>
                  {isAdmin && <th scope='col' className='px-6 py-4'>Employee</th>}
                  <th>Type</th>
                  <th>Dates</th>
                  <th>Reason</th>
                  <th>Status</th>
                  {isAdmin && <th className='text-center'>Actions</th>}                
                </tr>
              </thead>
              <tbody>
                {leave.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 4} className='py-12 text-center text-slate-400'>No leave applications found.</td>
                  </tr>
                ) : (
                  leave.map((leaves) => {
                    return (
                      <tr key={leaves._id || leaves.id}>
                        {isAdmin && (
                          <td className='text-slate-900'>{leaves.employee?.firstName} {leaves.employee?.lastName}</td>
                        )}
                        
                        <td>
                          <span className='badge bg-slate-100 text-slate-600'>{leaves.type}</span>
                        </td>
                        <td className='text-xs text-slate-500'>
                          {format(new Date(leaves.startDate), 'MMM dd, yyyy')} - {format(new Date(leaves.endDate), 'MMM dd, yyyy')}
                        </td>
                        <td className='max-w-xs truncate text-slate-500'  title={leaves.reason}>
                          {leaves.reason}
                        </td>
                        <td>
                          <span className={`badge ${
                            leaves.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                            leaves.status === 'REJECTED' ? 'bg-rose-50 text-rose-600' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {leaves.status}
                          </span>
                        </td>
                        {isAdmin && (
                           <td>
                            {leaves.status === 'PENDING' && (
                              <div className='flex justify-center gap-2'>
                                  <button disabled={!!processing} className='p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors' onClick={() => handleUpdateStatus(leaves._id || leaves.id, 'APPROVED')}>
                                    {processing === (leaves._id || leaves.id) ? <Loader2 className='w-4 h-4 animate-spin'/> : 
                                    <Check className='w-4 h-4'/>}
                                  </button>
                                  <button className='p-1.5 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors' onClick={() => handleUpdateStatus(leaves._id || leaves.id, 'REJECTED')} disabled={!!processing}>
                                    {processing === (leaves._id || leaves.id) ? <Loader2 className='w-4 h-4 animate-spin'/> : 
                                    <X className='w-4 h-4'/>}
                                  </button>
                              </div>)}
                           </td>
                        )}
                 </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default LeaveHistory