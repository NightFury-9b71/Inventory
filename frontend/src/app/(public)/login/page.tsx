"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api";
import { Toaster, toast } from "sonner";

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface LoginPageProps {
  onLoginSuccess?: (data: LoginFormData) => void;
}


const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    rememberMe: false
  });

  // React Query mutation for login
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Welcome back!", {
        description: "You have successfully signed in to your account.",
      });
      
      onLoginSuccess?.(formData);
      
      setTimeout(() => router.push("/"),1000);
      
    },
    onError: (error: Error) => {
      toast.error("Login failed", {
        description: error.message || "Please check your credentials and try again."
      });
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    loginMutation.mutate(formData);
  };

  const handleForgotPassword = () => {
    toast.info("Password reset link sent!", {
      description: "Check your username for password reset instructions."
    });
  };

  const handleSignUp = () => {
    toast.info("Redirecting to sign up...");
  };

  const fillDemoCredentials = () => {
    setFormData(prev => ({
      ...prev,
      username: "admin",
      password: "admin123"
    }));
    toast.success("Demo credentials filled!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
            <Building className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Demo Credentials */}
        <Card className="mb-6 bg-amber-50 border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer" onClick={fillDemoCredentials}>
          <CardContent className="p-4">
            <p className="text-sm text-amber-800 font-medium mb-2">🚀 Demo Credentials (Click to fill):</p>
            <p className="text-xs text-amber-700">username: admin</p>
            <p className="text-xs text-amber-700">Password: admin123</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          
          <div>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={loginMutation.isPending}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={loginMutation.isPending}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loginMutation.isPending}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={handleCheckboxChange}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    disabled={loginMutation.isPending}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="px-0 font-medium text-blue-600 hover:text-blue-500"
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loginMutation.isPending}
                >
                  Forgot password?
                </Button>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="button"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                disabled={loginMutation.isPending}
                onClick={handleSubmit}
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="px-0 font-medium text-blue-600 hover:text-blue-500"
                  type="button"
                  onClick={handleSignUp}
                  disabled={loginMutation.isPending}
                >
                  Sign up here
                </Button>
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Login component wrapped with providers
const LoginPageWithProviders: React.FC<LoginPageProps> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginPage {...props} />
      <Toaster 
        position="top-right" 
        richColors 
      />
    </QueryClientProvider>
  );
};

export default LoginPageWithProviders;