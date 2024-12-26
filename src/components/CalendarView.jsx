import { createSignal, onMount, For, Show } from 'solid-js';
import { supabase } from '../supabaseClient';
import { format, startOfMonth, endOfMonth } from 'date-fns';

function CalendarView() {
  const [leaves, setLeaves] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [currentMonth, setCurrentMonth] = createSignal(new Date());

  const fetchLeaves = async () => {
    setLoading(true);

    const start = format(startOfMonth(currentMonth()), 'yyyy-MM-dd');
    const end = format(endOfMonth(currentMonth()), 'yyyy-MM-dd');

    let { data: leavesData, error } = await supabase
      .from('leaves')
      .select('*, profiles (name)')
      .or(
        `and(start_date.lte.${end},end_date.gte.${start})`
      );

    if (error) {
      console.error('Error fetching leaves:', error);
    } else {
      setLeaves(leavesData);
    }

    setLoading(false);
  };

  onMount(fetchLeaves);

  return (
    <div class="p-8 h-full">
      <h1 class="text-2xl font-bold mb-4 text-purple-600">Team Calendar</h1>
      <Show when={loading()}>
        <p>Loading...</p>
      </Show>
      <Show when={!loading()}>
        <div>
          <For each={leaves()}>
            {(leave) => (
              <div class="p-4 bg-white rounded shadow mb-2 hover:bg-gray-100 cursor-pointer">
                <p>
                  <strong>{leave.profiles.name}</strong> is on leave from {leave.start_date} to {leave.end_date}
                </p>
                <p>Type: {leave.type}</p>
                <p>Status: {leave.status}</p>
                <p>Comment: {leave.comment}</p>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

export default CalendarView;