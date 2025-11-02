"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

type Props = {
  formData: LoginFormData;
  showPassword: boolean;
  isPending: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (checked: boolean) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.MouseEvent) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
};

export default function LoginFormCard({
  formData,
  showPassword,
  isPending,
  onInputChange,
  onCheckboxChange,
  onTogglePassword,
  onSubmit,
  onForgotPassword,
  onSignUp,
}: Props) {
  return (
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
                onChange={onInputChange}
                className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                disabled={isPending}
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
                onChange={onInputChange}
                className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                disabled={isPending}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                onClick={onTogglePassword}
                disabled={isPending}
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
                onCheckedChange={onCheckboxChange}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                disabled={isPending}
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
              onClick={onForgotPassword}
              disabled={isPending}
            >
              Forgot password?
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="button"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            disabled={isPending}
            onClick={onSubmit}
          >
            {isPending ? (
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
              onClick={onSignUp}
              disabled={isPending}
            >
              Sign up here
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
