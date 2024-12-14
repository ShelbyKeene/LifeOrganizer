import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';
import { MotivationalQuote } from '../components/auth/MotivationalQuote';
import { AnimatedIcons } from '../components/auth/AnimatedIcons';
import { GlassCard } from '../components/GlassCard';
import { PageHeader } from '../components/Typography';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 py-12">
      <AnimatedIcons />
      
      <div className="w-full max-w-md relative z-10">
        <PageHeader className="text-center mb-8">Life Organizer</PageHeader>
        <MotivationalQuote />
        
        <GlassCard>
          <div className="space-y-6">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isLogin ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !isLogin ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                Sign Up
              </button>
            </div>

            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};