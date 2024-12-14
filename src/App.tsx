import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataSyncProvider } from './contexts/DataSyncContext';
import { UserSettingsProvider } from './contexts/UserSettingsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeContainer } from './components/ThemeContainer';
import { Layout } from './components/Layout';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { MealsPage } from './pages/MealsPage';
import { CalendarPage } from './pages/CalendarPage';
import { HealthPage } from './pages/HealthPage';
import { HabitsPage } from './pages/HabitsPage';
import { SettingsPage } from './pages/SettingsPage';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/auth" />;
};

function App() {
  return (
    <AuthProvider>
      <UserSettingsProvider>
        <DataSyncProvider>
          <ThemeProvider>
            <Router>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route
                  path="/*"
                  element={
                    <PrivateRoute>
                      <ThemeContainer>
                        <Layout>
                          <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/tasks" element={<TasksPage />} />
                            <Route path="/meals" element={<MealsPage />} />
                            <Route path="/calendar" element={<CalendarPage />} />
                            <Route path="/health" element={<HealthPage />} />
                            <Route path="/habits" element={<HabitsPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                          </Routes>
                        </Layout>
                      </ThemeContainer>
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Router>
          </ThemeProvider>
        </DataSyncProvider>
      </UserSettingsProvider>
    </AuthProvider>
  );
}

export default App;