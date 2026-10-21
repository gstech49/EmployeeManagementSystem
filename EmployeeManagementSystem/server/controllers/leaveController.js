

//Create leave

import Employee from "../models/Employee";
import LeaveApplication from "../models/LeaveApplication";

//POST /api/leaves
export const createLeave = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({ userId: session.userId });
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        if(employee.isDeleted){
            return res.status(403).json({ error: "Your account is deactivated, you cannot apply for leave." });
        }
        const { leaveType, startDate, endDate, reason } = req.body;
        if(!startDate || !endDate || !leaveType || !reason){
            return res.status(400).json({ error: "All fields are required" });
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(startDate) <= today || new Date(endDate) < today) {
            return res.status(400).json({ error: "Leave dates must be in the future" });
        }
        if (new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({ error: "End date cannot be before start date" });
        }
        const leaveApplication = await LeaveApplication.create({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason,
            status: "Pending"
        });
        res.json({success: true, data: leaveApplication });
    } catch (error) {
        return res.status(500).json({ error: "Failed to create leave application" });
    }
};

//Get leaves
//GET /api/leaves
export const getLeaves = async (req, res) => {
    try {
        const session = req.session;
        const isAdmin = session.role === "ADMIN";
        if(!isAdmin){
            const status = req.query.status;
            const where = status ? { status } : {};
            const leaves = (await LeaveApplication.find(where).populate('employeeId')).Sort({createdAt: -1});
            const data = leaves.map((l)=>{
                const obj = l.toObject();
                return{
                    ...obj,
                    id: obj._id.toString(),
                    employee: obj.employeeId,
                    employeeId: obj.employeeId?._id?.toString()
                }
            })
            return res.json({data});
        }else{
            const employee = await Employee.findOne({ userId: session.userId }).lean();
            if (!employee) {
                return res.status(404).json({ error: "Employee not found" });
            }
            const leaves = await LeaveApplication.find({ employeeId: employee._id }).sort({ createdAt: -1 });
            return res.json({ 
                data: leaves,
                employee: {
                   ...employee,
                   id: employee._id.toString()
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch leave applications" });
    }
};

//Update leave status
//PUT /api/leaves/:id
export const updateLeaveStatus = async (req, res) => {
    try{
        const {status} = req.body
        if(!["APPROVED", "REJECTED", "PENDING"].includes(status)){
            return res.status(400).json({error: "Invalid Status"})
        }
        const leave = await LeaveApplication.findByIdAndUpdate(req.paprams.id, {status}, {returnDocument: "after"})
        return res.json({success: true, data: leave})
    }catch(error){
         return res.status(500).json({ error: "Failed" });
    }
}