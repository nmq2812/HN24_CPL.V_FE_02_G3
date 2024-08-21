import FormLogin from "@/components/Form/FormLogin";

export default function Login() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="">Have an account?</a>
            </p>

            <FormLogin></FormLogin>
          </div>
        </div>
      </div>
    </div>
  );
}
