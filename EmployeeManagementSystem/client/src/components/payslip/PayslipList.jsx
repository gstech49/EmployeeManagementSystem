import { Download } from 'lucide-react'
import { format } from 'date-fns'


const PayslipList = ({payslip, isAdmin}) => {
  return (
      <div className='card overflow-hidden'>          
          <div className='overflow-x-auto'>
            <table className='table-modern'>
              <thead className='text-xs text-slate-700 uppercase bg-slate-50'>
                <tr>
                  {isAdmin && <th scope='col' className='px-6 py-4'>Employee</th>}
                  <th>Period</th>
                  <th>Basic Salary</th>
                  <th>Net Salary</th>
                  <th className='text-center'>Actions</th>               
                </tr>
              </thead>
              <tbody>
                {payslip.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 5 : 4} className='py-12 text-center text-slate-400'>No payslips found.</td>
                  </tr>
                ) : (
                  payslip.map((payslips) => {
                    return (
                      <tr key={payslips._id || payslips.id}>
                        {isAdmin && (
                          <td className='text-slate-900'>{payslips.employee?.firstName} {payslips.employee?.lastName}</td>
                        )}
                        
                        <td className='text-slate-500'>
                          {format(new Date(payslips.year, payslips.month-1),"MMMM yyyy")}
                        </td>
                        <td className='text-slate-500'>
                          ${payslips.basicSalary?.toLocaleString()}
                        </td>
                          <td className='text-slate-800'>
                          ${payslips.netSalary?.toLocaleString()}
                        </td>
                        <td className='text-center'>
                          <button onClick={()=> window.open(`/print/payslip/${payslips._id || payslips.id}`)} className='inline-flex items-center px-3 py-1.5 text-xs font-medium rounded 
                          text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors ring-1 ring-blue-600/10'>
                            <Download className='w-3 h-3 mr-1.5'/> Download
                          </button>
                        </td>
                       
                    
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

export default PayslipList