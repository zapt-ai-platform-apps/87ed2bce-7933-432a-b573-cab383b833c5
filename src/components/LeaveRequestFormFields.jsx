function LeaveRequestFormFields(props) {
  return (
    <form onSubmit={props.handleSubmit} class="space-y-4">
      <div>
        <label class="block mb-1">Start Date</label>
        <input
          type="date"
          value={props.startDate()}
          onInput={(e) => props.setStartDate(e.target.value)}
          class="w-full p-2 border border-gray-300 rounded box-border"
          required
        />
      </div>
      <div>
        <label class="block mb-1">End Date</label>
        <input
          type="date"
          value={props.endDate()}
          onInput={(e) => props.setEndDate(e.target.value)}
          class="w-full p-2 border border-gray-300 rounded box-border"
          required
        />
      </div>
      <div>
        <label class="block mb-1">Leave Type</label>
        <select
          value={props.type()}
          onChange={(e) => props.setType(e.target.value)}
          class="w-full p-2 border border-gray-300 rounded box-border"
        >
          <option value="Annual">Annual</option>
          <option value="Sick">Sick</option>
          <option value="Maternity">Maternity</option>
        </select>
      </div>
      <div>
        <label class="block mb-1">Comment</label>
        <textarea
          value={props.comment()}
          onInput={(e) => props.setComment(e.target.value)}
          class="w-full p-2 border border-gray-300 rounded box-border"
        ></textarea>
      </div>
      <button
        type="submit"
        class={`bg-purple-600 text-white px-4 py-2 rounded cursor-pointer ${
          props.loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={props.loading()}
      >
        {props.loading() ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}

export default LeaveRequestFormFields;