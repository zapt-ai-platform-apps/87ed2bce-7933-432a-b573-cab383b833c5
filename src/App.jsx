import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { Routes, Route, useNavigate } from '@solidjs/router';
import { supabase } from './supabaseClient';

import EmployeeDashboard from './components/EmployeeDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import LeaveRequestForm from './components/LeaveRequestForm';
import CalendarView from './components/CalendarView';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';

function App() {
  const [user, setUser] = createSignal(null);
  const [isManager, setIsManager] = createSignal(false);
  const navigate = useNavigate();

  const checkUserSignedIn = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (data) {
        setIsManager(data.role === 'manager');
      }

      navigate('/dashboard');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (data) {
          setIsManager(data.role === 'manager');
        }

        navigate('/dashboard');
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  return (
    <div class="min-h-screen bg-gray-100">
      <Show when={user()} fallback={<AuthPage />}>
        <Navbar user={user} isManager={isManager} />
        <Routes>
          <Route
            path="/dashboard"
            element={isManager() ? <ManagerDashboard /> : <EmployeeDashboard />}
          />
          <Route path="/request-leave" element={<LeaveRequestForm />} />
          <Route path="/calendar" element={<CalendarView />} />
        </Routes>
        <footer class="text-center p-4">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline"
          >
            Made on ZAPT
          </a>
        </footer>
      </Show>
    </div>
  );
}

export default App;