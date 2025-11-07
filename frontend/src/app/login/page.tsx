"use client";

import React from "react";
import { useLoginForm } from "./hooks/useLoginForm";
import { DemoCredentialsCard, LoginHeader, LoginFormCard } from "./components";

interface LoginPageProps {
  onLoginSuccess?: (data: { username: string; password: string; rememberMe: boolean }) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const {
    formData,
    showPassword,
    isPending,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit,
    handleForgotPassword,
    handleSignUp,
    fillDemoCredentials,
    togglePasswordVisibility,
  } = useLoginForm(onLoginSuccess);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginHeader />

        <DemoCredentialsCard onFillDemo={fillDemoCredentials} />

        <LoginFormCard
          formData={formData}
          showPassword={showPassword}
          isPending={isPending}
          onInputChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
          onTogglePassword={togglePasswordVisibility}
          onSubmit={handleSubmit}
          onForgotPassword={handleForgotPassword}
          onSignUp={handleSignUp}
        />
      </div>
    </div>
  );
}