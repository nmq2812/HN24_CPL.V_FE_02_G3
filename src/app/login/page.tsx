"use client";
import { useState } from "react";
import { loginAPI } from "@/apis/user";
import Button from "@/components/Button/Button";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { user, login } = useAuth();
  const router = useRouter();

  console.log(user);
  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault(); // Ngăn chặn hành động submit mặc định của form

    const formData = new FormData(event.currentTarget);
    const credentials: LoginCredentials = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    setLoading(true);
    setError(null);

    try {
      const res = await loginAPI(credentials);
      login(res.data.user);
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.errors);
        setError(
          "Login failed: " + JSON.stringify(err.response?.data?.errors) ||
            "Unknown error"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="">Have an account?</a>
            </p>

            <ul className="error-messages"></ul>

            <form onSubmit={handleLogin}>
              <fieldset className="form-group">
                <input
                  name="email"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  name="password"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              {error && <p className="error">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="btn btn-lg btn-primary pull-xs-right"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
