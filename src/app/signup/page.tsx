import FormSignup from "@/components/Form/FormSignup";
import Link from "next/link";

export default function Signup() {
    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12 text-bg-light border pt-4 mt-3">
                        <h1 className="text-center">Sign up</h1>
                        <p className="text-center">
                            <Link href="/login">Have an account?</Link>
                        </p>

                        <FormSignup />
                    </div>
                </div>
            </div>
        </div>
    );
}
