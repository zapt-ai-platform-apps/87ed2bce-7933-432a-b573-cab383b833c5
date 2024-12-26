import { For } from 'solid-js';

function LeaveRequestsTable(props) {
  const leaveRequests = props.leaveRequests;
  return (
    <div>
      <h2 class="text-xl font-semibold mb-2">Your Leave Requests</h2>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 border-b">Start Date</th>
            <th class="py-2 border-b">End Date</th>
            <th class="py-2 border-b">Type</th>
            <th class="py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          <For each={leaveRequests()}>
            {(leave) => (
              <tr class="hover:bg-gray-100">
                <td class="py-1 border-b text-center">{leave.start_date}</td>
                <td class="py-1 border-b text-center">{leave.end_date}</td>
                <td class="py-1 border-b text-center">{leave.type}</td>
                <td class="py-1 border-b text-center">{leave.status}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequestsTable;