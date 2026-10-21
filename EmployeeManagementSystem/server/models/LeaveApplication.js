import mongoose from 'mongoose';

const leaveApplicationSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    leaveType: {
        type: String,
        enum: ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Maternity Leave', 'Paternity Leave'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    }
}, { timestamps: true });
const LeaveApplication = mongoose.models.LeaveApplication || mongoose.model('LeaveApplication', leaveApplicationSchema);
export default LeaveApplication;