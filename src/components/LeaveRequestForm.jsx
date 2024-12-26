import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';
import LeaveRequestFormFields from './LeaveRequestFormFields';

function LeaveRequestForm() {
  const [startDate, setStartDate] = createSignal('');
  const [endDate, setEndDate] = createSignal('');
  const [type, setType] = createSignal('Annual');
  const [comment, setComment] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = supabase.auth.user();

    const { error } = await supabase.from('leaves').insert({
      employee_id: user.id,
      start_date: startDate(),
      end_date: endDate(),
      type: type(),
      comment: comment(),
      status: 'pending',
    });

    if (error) {
      console.error('Error submitting leave request:', error);
    } else {
      alert('Leave request submitted successfully!');
      setStartDate('');
      setEndDate('');
      setType('Annual');
      setComment('');
    }
    setLoading(false);
  };

  return (
    <div class="p-8 h-full">
      <h1 class="text-2xl font-bold mb-4 text-purple-600">Request Leave</h1>
      <LeaveRequestFormFields
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        type={type}
        setType={setType}
        comment={comment}
        setComment={setComment}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default LeaveRequestForm;