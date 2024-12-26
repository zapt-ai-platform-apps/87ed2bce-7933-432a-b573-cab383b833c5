function LeaveBalance(props) {
  const leaveBalance = props.leaveBalance;
  return (
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Leave Balance</h2>
      <p>You have <strong>{leaveBalance()}</strong> days of leave remaining.</p>
    </div>
  );
}

export default LeaveBalance;