"use client";
import AuthPageLayout from "@/components/common/AuthPageLayout";
import AuthField from "@/components/common/form/AuthField";
import AuthPasswordField from "@/components/common/form/AuthPasswordField";
import GoogleIcon from "@/icons/GoogleIcon";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    const [error, setError] = useState('');
    async function handleFormSubmit(event) {
        event.preventDefault();
        setLoginInProgress(true);
        setError('');
        const response = await signIn('credentials', { email, password, redirect: false });
        if (response === null || response === void 0 ? void 0 : response.ok) {
            router.push('/');
        }
        else {
            setError("The email or password you entered is incorrect.");
        }
        setLoginInProgress(false);
    }
    return (<AuthPageLayout title="Welcome Back" subtitle="Sign in to order your favorite pizzas" footerText="Don't have an account?" footerLinkText="Sign Up" footerLinkHref="/register">
      <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
        <AuthField label="Email address" type="email" value={email} onChange={setEmail} placeholder="Enter your email" disabled={loginInProgress} required autoComplete="email"/>
        <AuthPasswordField value={password} onChange={setPassword} disabled={loginInProgress}/>
        {error && (<div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2">
            {error}
          </div>)}
        <button type="submit" disabled={loginInProgress} className="auth-submit-btn w-full rounded-lg bg-primary text-dark font-bold py-2.5 text-sm mt-1 disabled:opacity-60">
          {loginInProgress ? 'Logging in...' : 'Login'}
        </button>

        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 h-px bg-gray-700"/>
          <span className="text-gray-500 text-xs uppercase">or</span>
          <div className="flex-1 h-px bg-gray-700"/>
        </div>

        <button type="button" disabled={loginInProgress} onClick={() => signIn('google', { callbackUrl: '/' })} className="w-full flex items-center justify-center gap-2 rounded-lg bg-white text-dark font-semibold py-2.5 text-sm border border-gray-300 hover:bg-gray-100 disabled:opacity-60">
          <GoogleIcon className="w-5"/>
          Continue with Google
        </button>
      </form>
    </AuthPageLayout>);
};
export default LoginPage;
