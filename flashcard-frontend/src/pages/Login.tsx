import { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '@/utils/loginschema';
import { BASE_URL } from '@/utils/url';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user.name);
        navigate('/admin/dashboard'); 
      } else {
        setError('Unexpected response status.');
        console.error('Unexpected response status:', response.status);
      }
    } 
    catch (error: any) {
      setError(error.response && error.response.data.error);
      console.log(error.response && error.response.data.error)
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-white bg-[#191919]">
      <Card className="w-full max-w-md border border-black">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center w-full">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="bg-white text-black placeholder:text-muted-foreground"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="bg-white text-black placeholder:text-muted-foreground"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
          {/* Test credentials in the bottom left corner */}
          <div className="text-left text-sm text-gray-500 mt-2">
            Test User: johndoe@example.com<br />
            Test Password: password123
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
