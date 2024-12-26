import { createSignal, onMount, Show } from 'solid-js';
import { supabase } from '../supabaseClient';
import PendingLeaveRequests from './PendingLeaveRequests';

function ManagerDashboard() {
  const [pendingRequests, setPendingRequests] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  const fetchPendingRequests = async () => {
    setLoading(true);

    let { data: leaves, error } = await supabase
      .from('leaves')
      .select('*, profiles (name)')
      .eq('status', 'pending');

    if (error) {
      console.error('Error fetching pending requests:', error);
    } else {
      setPendingRequests(leaves);
    }

    setLoading(false);
  };

  const handleApprove = async (leaveId) => {
    const { error } = await supabase
      .from('leaves')
      .update({ status: 'approved' })
      .eq('id', leaveId);

    if (error) {
      console.error('Error approving leave:', error);
    } else {
      fetchPendingRequests();
    }
  };

  const handleDeny = async (leaveId) => {
    const { error } = await supabase
      .from('leaves')
      .update({ status: 'denied' })
      .eq('id', leaveId);

    if (error) {
      console.error('Error denying leave:', error);
    } else {
      fetchPendingRequests();
    }
  };

  onMount(fetchPendingRequests);

  return (
    <div class="p-8 h-full">
      <h1 class="text-2xl font-bold mb-4 text-purple-600">Manager Dashboard</h1>
      <Show when={loading()}>
        <p>Loading...</p>
      </Show>
      <Show when={!loading()}>
        <PendingLeaveRequests
          pendingRequests={pendingRequests}
          loading={loading}
          handleApprove={handleApprove}
          handleDeny={handleDeny}
        />
      </Show>
    </div>
  );
}

export default ManagerDashboard;