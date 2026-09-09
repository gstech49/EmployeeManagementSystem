import { Loader } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { dummyAttendanceData } from "../assets/assets"
import AttendanceStats from "../components/attendance/AttendanceStats"
import CheckInButton from "../components/attendance/CheckInButton"
import AttendanceHistory from "../components/attendance/AttendanceHistory"

const Attendance = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const fetchData = useCallback(async () => {
    try {
      setHistory(dummyAttendanceData)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching attendance data:', error)
      setLoading(false)
    }
  })

    useEffect(() => {
      fetchData()
    }, [fetchData])

    if(loading) {
      return <Loader />
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayRecords = history.find((r) => {
      new Date(r.date).toDateString() === today.toDateString()
    })
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">Track your work hours and daily attendance</p>
      </div>
     {isDeleted ? (<div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
        <p className="text-rose-600">You can no longer clock in or out because the Attendance record has been deleted.</p>
      </div>) : (
        <div className="mb-8">
          <CheckInButton todayRecord={todayRecords} onAction={fetchData} />
        </div>
      ) }
      <AttendanceStats history={history} />
      <AttendanceHistory history={history} />
    </div>
  )
}

export default Attendance