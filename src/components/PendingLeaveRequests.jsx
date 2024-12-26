import { For } from 'solid-js';
import LeaveRequestRow from './LeaveRequestRow';

function PendingLeaveRequests(props) {
  return (
    <div>
      <h2 class="text-xl font-semibold mb-2">Pending Leave Requests</h2>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 border-b">Employee</th>
            <th class="py-2 border-b">Start Date</th>
            <th class="py-2 border-b">End Date</th>
            <th class="py-2 border-b">Type</th>
            <th class="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.pendingRequests()}>
            {(leave) => (
              <LeaveRequestRow
                leave={leave}
                handleApprove={props.handleApprove}
                handleDeny={props.handleDeny}
                loading={props.loading}
              />
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}

export default PendingLeaveRequests;