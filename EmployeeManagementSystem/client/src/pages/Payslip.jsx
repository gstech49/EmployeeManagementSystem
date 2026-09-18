import { useCallback, useEffect, useState } from "react"
import {dummyEmployeeData, dummyPayslipData} from "../assets/assets"
import {Loader} from "lucide-react"
import PayslipList from "../components/payslip/PayslipList"
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm"

const Payslip = () => {
  const [payslip, setPayslip] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const isAdmin = true
  const fetchPayslip = useCallback(async()=>{
    setPayslip(dummyPayslipData)
    setTimeout(()=>{
      setLoading(false)
    },1000)
  },[])

  useEffect(()=>{
    fetchPayslip()
  },[fetchPayslip])

  useEffect(()=>{
    if(isAdmin) setEmployees(dummyEmployeeData)
  },[isAdmin])

  if(loading) return <Loader/>

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">{isAdmin ? "Generate and manage employee payslips" : "Your payslip history"}</p>
        </div>
        {isAdmin && <GeneratePayslipForm employees={employees} onSuccess={fetchPayslip}/>}
      </div>
      <PayslipList payslip={payslip} isAdmin={isAdmin}/>
    </div>
  )
}

export default Payslip