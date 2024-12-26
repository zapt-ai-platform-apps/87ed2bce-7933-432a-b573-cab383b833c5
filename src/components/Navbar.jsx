import { A } from '@solidjs/router';
import { supabase } from '../supabaseClient';

function Navbar(props) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav class="bg-purple-600 text-white p-4 flex justify-between items-center">
      <div>
        <A href="/dashboard" class="text-2xl font-bold">Team Leave Calendar</A>
      </div>
      <div class="flex space-x-4">
        <A href="/calendar" class="hover:text-gray-300 cursor-pointer">Calendar</A>
        {!props.isManager && <A href="/request-leave" class="hover:text-gray-300 cursor-pointer">Request Leave</A>}
        <button onClick={handleSignOut} class="hover:text-gray-300 cursor-pointer">Sign Out</button>
      </div>
    </nav>
  );
}

export default Navbar;