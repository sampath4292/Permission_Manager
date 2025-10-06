const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["gatepass", "attendance", "event"],
      required: true,
    },
    details: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvalFlow: { type: [String], default: [] },
    currentApprover: { type: String },
    history: [
      {
        approverRole: String,
        approverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        action: String,
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// helper: initialize flow based on type
RequestSchema.methods.initFlow = function () {
  const flows = {
    gatepass: ["advisor", "warden", "security"],
    attendance: ["advisor", "hod"],
    event: ["advisor", "faculty", "hod"],
  };
  this.approvalFlow = flows[this.type] || [];
  this.currentApprover = this.approvalFlow.length ? this.approvalFlow[0] : null;
};

// helper: advance to next approver or set approved
RequestSchema.methods.advance = function () {
  if (!this.approvalFlow || this.approvalFlow.length === 0) {
    this.status = "approved";
    this.currentApprover = null;
    return;
  }
  const idx = this.approvalFlow.indexOf(this.currentApprover);
  if (idx === -1 || idx === this.approvalFlow.length - 1) {
    this.status = "approved";
    this.currentApprover = null;
  } else {
    this.currentApprover = this.approvalFlow[idx + 1];
  }
};

module.exports = mongoose.model("Request", RequestSchema);
