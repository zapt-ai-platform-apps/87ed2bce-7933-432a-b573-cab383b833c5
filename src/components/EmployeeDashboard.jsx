import { createSignal, onMount, Show } from 'solid-js';
import { supabase } from '../supabaseClient';
import LeaveBalance from './LeaveBalance';
import LeaveRequestsTable from './LeaveRequestsTable';

function EmployeeDashboard() {
  const [leaveRequests, setLeaveRequests] = createSignal([]);
  const [leaveBalance, setLeaveBalance] = createSignal(0);
  const [loading, setLoading] = createSignal(true);

  const fetchLeaveData = async () => {
    setLoading(true);
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error fetching user:', userError);
      setLoading(false);
      return;
    }

    // Fetch leave requests
    let { data: leaves, error } = await supabase
      .from('leaves')
      .select('*')
      .eq('employee_id', user.id);

    if (error) {
      console.error('Error fetching leave requests:', error);
    } else {
      setLeaveRequests(leaves);
    }

    // Fetch leave balance
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('leave_balance')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching leave balance:', profileError);
    } else {
      setLeaveBalance(profile.leave_balance);
    }

    setLoading(false);
  };

  onMount(fetchLeaveData);

  return (
    <div class="p-8 h-full">
      <h1 class="text-2xl font-bold mb-4 text-purple-600">Employee Dashboard</h1>
      <Show when={loading()}>
        <p>Loading...</p>
      </Show>
      <Show when={!loading()}>
        <LeaveBalance leaveBalance={leaveBalance} />
        <LeaveRequestsTable leaveRequests={leaveRequests} />
      </Show>
    </div>
  );
}

export default EmployeeDashboard;