import FormLogin from "@/components/Form/FormLogin";
import Link from "next/link";

export default function Login() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12 text-bg-light border pt-4">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link href="/signup">Don't have an account ?</Link>
            </p>

            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
