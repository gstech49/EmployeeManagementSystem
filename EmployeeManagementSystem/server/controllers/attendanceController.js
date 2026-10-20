

import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// Clock in/out for employee
//POST /api/attendance
export const clockInOut = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({ userId: session.userId });
        if(!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        if(employee.isDeleted) {
            return res.status(403).json({ error: 'Your account is deactivated. You cannot clock in or out.' });
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of the day
        const existingRecord = await Attendance.findOne({
             employeeId: employee._id, 
             date: today
        });
        const now = new Date();
        if (!existingRecord) {
            // No attendance record for today, create one and clock in
           const isLate = now.getHours() >= 9 && now.getMinutes() > 0;
            const newAttendance = await Attendance.create({
                employeeId: employee._id,
                date: today,
                checkIn: now,
                status: isLate ? 'LATE' : 'PRESENT'
            });
            return res.json({ success: true, type: 'CLOCK_IN', data: newAttendance, message: 'Clocked in successfully' });
        }else if (!existingRecord.checkOut) {
           const checkInTime = new Date(existingRecord.checkIn).getTime()
              const diffMs = now.getTime() - checkInTime;
              const diffHrs = diffMs / (1000 * 60 * 60);
              existingRecord.checkOut = now;
              //Compute working hours and day type
              const workingHours = parseFloat(diffHrs.toFixed(2));
              let dayType = "Half Day";
              if (workingHours >= 8) {
                  dayType = "Full Day";
              }else if (workingHours >= 6) {
                  dayType = "Three Quarter Day";
              }else if (workingHours >= 4) {
                  dayType = "Half Day";
              }else dayType = "Short Day";
                existingRecord.workingHours = workingHours;
                existingRecord.dayType = dayType;
                await existingRecord.save();
                return res.json({ success: true, type: 'CLOCK_OUT', data: existingRecord, message: 'Clocked out successfully' });
        }else {
            return res.status(400).json({ error: 'You have already clocked out for today' });
        }
        
    } catch (error) {
        console.error('Attendance Error:', error);
        return res.status(500).json({ error: 'Operation Failed' });
    }
};

//Get attendance for employee
//GET /api/attendance
export const getAttendance = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({ userId: session.userId });
        if(!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        const limit = parseInt(req.query.limit || 30); // Default limit to 10 if not provided
        const history = await Attendance.find({ employeeId: employee._id })
            .sort({ date: -1 })
            .limit(limit);
        return res.json({data: history, employee: {isDeleted: employee.isDeleted}});
    }
     
    catch (error) {
        console.error('Attendance Error:', error);
        return res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
};

