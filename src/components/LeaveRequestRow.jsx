function LeaveRequestRow(props) {
  return (
    <tr class="hover:bg-gray-100">
      <td class="py-1 border-b text-center">{props.leave.profiles.name}</td>
      <td class="py-1 border-b text-center">{props.leave.start_date}</td>
      <td class="py-1 border-b text-center">{props.leave.end_date}</td>
      <td class="py-1 border-b text-center">{props.leave.type}</td>
      <td class="py-1 border-b text-center">
        <button
          class="bg-green-500 text-white px-2 py-1 rounded mr-2 cursor-pointer"
          onClick={() => props.handleApprove(props.leave.id)}
          disabled={props.loading()}
        >
          Approve
        </button>
        <button
          class="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
          onClick={() => props.handleDeny(props.leave.id)}
          disabled={props.loading()}
        >
          Deny
        </button>
      </td>
    </tr>
  );
}

export default LeaveRequestRow;